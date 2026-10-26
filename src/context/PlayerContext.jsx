import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RADIO_STREAM_URL } from "../config/radio";

const PlayerContext = createContext(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx)
    throw new Error("usePlayer precisa estar dentro de <PlayerProvider>.");
  return ctx;
}

export const STREAM_CONFIGURADO =
  typeof RADIO_STREAM_URL === "string" &&
  /^https?:\/\//i.test(RADIO_STREAM_URL) &&
  !RADIO_STREAM_URL.includes("COLOCAR_URL");

// Conteúdo misto: página em HTTPS não carrega stream em HTTP — o navegador
// bloqueia antes de qualquer requisição e o <audio> só dispara um erro seco.
// Vale checar aqui para a mensagem dizer o que realmente aconteceu.
function bloqueioDeProtocolo() {
  if (typeof window === "undefined") return null;
  if (window.location.protocol !== "https:") return null;
  if (!/^http:\/\//i.test(RADIO_STREAM_URL)) return null;
  return "O site está em HTTPS e o endereço do stream é HTTP — o navegador bloqueia a transmissão. Peça à emissora o endereço https:// do stream.";
}

const MAX_TENTATIVAS = 4;

// O <audio> vive aqui, fora das rotas, para nunca ser desmontado ao navegar.
// Em rádio ao vivo o src é atribuído no play e liberado no pause: manter o
// stream carregado em pausa faz o áudio voltar atrasado em relação à emissora.
export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [erro, setErro] = useState(null);
  const [volume, setVolume] = useState(0.8);

  // Intenção do ouvinte: continua true enquanto ele não apertar pausa, mesmo
  // que a conexão caia. É o que autoriza a reconexão automática.
  const querTocarRef = useRef(false);
  // Ligado durante o parar(): faz o onError ignorar o erro de "src vazio" que
  // o próprio navegador dispara ao descarregar a mídia.
  const parandoRef = useRef(false);
  const tentativaRef = useRef(0);
  const timerRef = useRef(null);
  const stallTimerRef = useRef(null);
  const actionRef = useRef(0);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const limparTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
  }, []);

  useEffect(() => limparTimer, [limparTimer]);

  const parar = useCallback(() => {
    const audio = audioRef.current;
    querTocarRef.current = false;
    actionRef.current += 1;
    tentativaRef.current = 0;
    limparTimer();
    if (!audio) return;

    parandoRef.current = true;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    // O erro de descarregamento chega no mesmo ciclo; soltar a trava depois
    // dele evita a mensagem falsa de "transmissão caiu" ao pausar.
    setTimeout(() => {
      parandoRef.current = false;
    }, 0);

    setPlaying(false);
    setBuffering(false);
    setErro(null);
  }, [limparTimer]);

  // `retomada` só é true nas reconexões: o parâmetro anti-cache evita que o
  // navegador devolva o trecho já bufferizado em vez de reabrir o stream.
  const iniciar = useCallback(
    async (retomada = false) => {
      const audio = audioRef.current;
      const action = ++actionRef.current;
      if (!audio) return;

      if (!STREAM_CONFIGURADO) {
        querTocarRef.current = false;
        setBuffering(false);
        setErro("URL do stream não configurada em src/config/radio.js.");
        return;
      }

      const bloqueio = bloqueioDeProtocolo();
      if (bloqueio) {
        querTocarRef.current = false;
        setBuffering(false);
        setErro(bloqueio);
        return;
      }

      setErro(null);
      setBuffering(true);
      parandoRef.current = false;

      try {
        audio.src = retomada
          ? RADIO_STREAM_URL +
            (RADIO_STREAM_URL.includes("?") ? "&" : "?") +
            "_=" +
            Date.now()
          : RADIO_STREAM_URL;
        audio.volume = volumeRef.current;
        await audio.play();
        if (action !== actionRef.current || !querTocarRef.current) return;
        // O onPlaying confirma que o áudio saiu de fato; aqui só registramos
        // que o navegador aceitou a chamada.
        setPlaying(true);
      } catch (e) {
        if (
          action !== actionRef.current ||
          !querTocarRef.current ||
          parandoRef.current
        )
          return;
        if (timerRef.current) return;
        limparTimer();
        querTocarRef.current = false;
        console.error("[player] falha ao iniciar o stream", e);
        setBuffering(false);
        setPlaying(false);
        // NotAllowedError = o navegador exige um clique antes de tocar áudio.
        if (e && e.name === "NotAllowedError") {
          setErro(
            "O navegador bloqueou o início automático. Toque no botão para ouvir.",
          );
        } else {
          setErro(
            "Não foi possível iniciar a transmissão. Toque no botão novamente.",
          );
        }
      }
    },
    [limparTimer],
  );

  const tocar = useCallback(() => {
    actionRef.current += 1;
    querTocarRef.current = true;
    tentativaRef.current = 0;
    limparTimer();
    return iniciar(false);
  }, [iniciar, limparTimer]);

  // Stream ao vivo cai: queda de rede, reinício do servidor, troca de bloco.
  // Em vez de deixar o ouvinte no silêncio, tenta voltar sozinho com intervalo
  // crescente (2s, 4s, 6s, 8s) e só então desiste.
  const reconectar = useCallback(() => {
    if (!querTocarRef.current || timerRef.current) return;

    if (tentativaRef.current >= MAX_TENTATIVAS) {
      limparTimer();
      setPlaying(false);
      setBuffering(false);
      querTocarRef.current = false;
      setErro(
        "A transmissão caiu e não voltou. Toque no botão para tentar de novo.",
      );
      return;
    }

    tentativaRef.current += 1;
    setBuffering(true);
    setErro("Reconectando…");
    limparTimer();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      iniciar(true);
    }, tentativaRef.current * 2000);
  }, [iniciar, limparTimer]);

  // Alguns streams param de entregar dados sem emitir error ou ended.
  // Só reconectar após espera prolongada e enquanto houver intenção de ouvir.
  const aguardar = useCallback(() => {
    if (!querTocarRef.current || parandoRef.current) return;
    setBuffering(true);
    if (stallTimerRef.current || timerRef.current) return;
    stallTimerRef.current = setTimeout(() => {
      stallTimerRef.current = null;
      reconectar();
    }, 15000);
  }, [reconectar]);

  const alternar = useCallback(() => {
    if (querTocarRef.current) parar();
    else tocar();
  }, [parar, tocar]);

  const valor = useMemo(
    () => ({
      playing,
      buffering,
      erro,
      volume,
      setVolume,
      tocar,
      parar,
      alternar,
      streamConfigurado: STREAM_CONFIGURADO,
    }),
    [playing, buffering, erro, volume, tocar, parar, alternar],
  );

  return (
    <PlayerContext.Provider value={valor}>
      <audio
        ref={audioRef}
        preload="none"
        onPlaying={() => {
          if (!querTocarRef.current) return;
          limparTimer();
          tentativaRef.current = 0;
          setPlaying(true);
          setBuffering(false);
          setErro(null);
        }}
        onWaiting={aguardar}
        onStalled={aguardar}
        onPause={() => {
          if (!querTocarRef.current) setPlaying(false);
        }}
        onEnded={reconectar}
        onError={() => {
          // Erro disparado pelo próprio parar(): não é falha de transmissão.
          if (parandoRef.current) return;
          if (querTocarRef.current) {
            reconectar();
            return;
          }
          setPlaying(false);
          setBuffering(false);
          setErro("A transmissão caiu ou o endereço do stream está incorreto.");
        }}
      />
      {children}
    </PlayerContext.Provider>
  );
}
