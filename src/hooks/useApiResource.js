import { useCallback, useEffect, useState } from "react";
import api, { ROUTES, descreverErro } from "../services/api";

// Aceita array puro ou envelopado ({ data }, { items }, { results }...).
function extrairLista(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  for (const chave of [
    "data",
    "items",
    "results",
    "rows",
    "content",
    "registros",
  ]) {
    if (Array.isArray(payload[chave])) return payload[chave];
  }
  return [];
}

// Busca um recurso público (chave em ROUTES) com loading, erro real e
// cancelamento. Sem fallback para dados fictícios: se a API falhar, a tela
// mostra o erro — é assim que a integração fica depurável.
export function useApiResource(key) {
  const [state, setState] = useState({ loading: true, error: null, data: [] });
  const [tentativa, setTentativa] = useState(0);

  const refetch = useCallback(() => setTentativa((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    api
      .get(ROUTES[key], { signal: controller.signal })
      .then((res) => {
        if (cancelled || controller.signal.aborted) return;
        setState({ loading: false, error: null, data: extrairLista(res.data) });
      })
      .catch((err) => {
        if (cancelled || controller.signal.aborted) return;
        console.error("[API] falha em " + ROUTES[key], err);
        setState({ loading: false, error: descreverErro(err), data: [] });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [key, tentativa]);

  return { ...state, refetch };
}

// GET /programacao/agora pode devolver o programa direto, envelopado, ou nada
// quando não há programa no horário. Normaliza tudo para objeto ou null.
function extrairAgora(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return null;
  const candidato = payload.programa ?? payload.data ?? payload;
  if (!candidato || typeof candidato !== "object" || Array.isArray(candidato))
    return null;
  const temNome = candidato.titulo || candidato.nome;
  return temNome ? candidato : null;
}

// Programa no ar: atualiza sozinho a cada 45s, sem tocar no áudio.
// O `loading` só é verdadeiro na primeira carga — nas atualizações seguintes
// a tela mantém o programa anterior em vez de piscar "Carregando…".
export function useAgora(intervaloMs = 45000) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    function buscarAgora() {
      api
        .get(ROUTES.agora, { signal: controller.signal })
        .then((res) => {
          if (cancelled || controller.signal.aborted) return;
          setState({
            loading: false,
            error: null,
            data: extrairAgora(res.data),
          });
        })
        .catch((err) => {
          if (cancelled || controller.signal.aborted) return;
          const semProgramaNoAr =
            err?.response?.status === 404 || err?.response?.status === 204;
          if (semProgramaNoAr) {
            // Nenhum programa nesse horário não é erro: cai na programação musical.
            setState({ loading: false, error: null, data: null });
            return;
          }
          console.error("[API] falha em " + ROUTES.agora, err);
          setState((s) => ({
            loading: false,
            error: descreverErro(err),
            data: s.data,
          }));
        });
    }

    buscarAgora();
    const intervalo = setInterval(buscarAgora, intervaloMs);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(intervalo);
    };
  }, [intervaloMs]);

  return state;
}
