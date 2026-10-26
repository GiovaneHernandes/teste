import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { pick, pickImagem } from "../../utils/format";
import Img from "../Img/Img";
import Icon from "../Icon/Icon";
import "./RadioPlayer.css";
export default function RadioPlayer({ agora }) {
  const {
    playing,
    buffering,
    erro,
    volume,
    setVolume,
    alternar,
    streamConfigurado,
  } = usePlayer();
  const [showVolume, setShowVolume] = useState(false);
  const volumeButton = useRef(null);
  const previousVolume = useRef(0.8);
  const programa = agora?.data;
  const titulo = pick(programa, ["titulo", "nome"], "Top FM Bauru");
  const apresentador = pick(programa, ["apresentador"], "");
  const status = buffering
    ? "Conectando…"
    : playing
      ? "Tocando ao vivo"
      : "Rádio pausada";
  function mute() {
    if (volume > 0) {
      previousVolume.current = volume;
      setVolume(0);
    } else setVolume(previousVolume.current || 0.8);
  }
  return (
    <section
      className="tfm-player"
      aria-label="Player da rádio"
      onKeyDown={(e) => {
        if (e.key === "Escape" && showVolume) {
          setShowVolume(false);
          volumeButton.current?.focus();
        }
      }}
    >
      <div className="tfm-container tfm-player-inner">
        <button
          type="button"
          className="tfm-player-btn"
          aria-label={
            buffering
              ? "Cancelar conexão"
              : playing
                ? "Pausar transmissão"
                : "Ouvir ao vivo"
          }
          onClick={alternar}
          disabled={!streamConfigurado}
        >
          <Icon name={playing || buffering ? "pause" : "play"} size={22} />
        </button>
        <Img
          src={pickImagem(programa)}
          alt=""
          className="tfm-player-thumb"
          semLogo
        />
        <div className="tfm-player-info">
          <Link to="/programacao" className="tfm-player-title">
            {titulo}
          </Link>
          <p className="tfm-player-subtitle">
            {apresentador || "101,3 MHz · Bauru"}
          </p>
        </div>
        <p
          className={`tfm-player-status ${playing ? "is-playing" : ""}`}
          role="status"
        >
          <span aria-hidden="true" />
          {status}
        </p>
        <div className={`tfm-player-volume ${showVolume ? "is-open" : ""}`}>
          <button
            type="button"
            onClick={mute}
            className="tfm-player-mute"
            aria-label={volume === 0 ? "Ativar som" : "Silenciar"}
          >
            <Icon name={volume === 0 ? "mute" : "volume"} size={18} />
          </button>
          <label htmlFor="radio-volume" className="tfm-sr-only">
            Volume da rádio
          </label>
          <input
            id="radio-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-valuetext={`${Math.round(volume * 100)}%`}
          />
        </div>
        <button
          ref={volumeButton}
          type="button"
          className="tfm-player-volume-toggle"
          aria-label={showVolume ? "Fechar volume" : "Ajustar volume"}
          aria-expanded={showVolume}
          aria-controls="radio-volume"
          onClick={() => setShowVolume((v) => !v)}
        >
          <Icon name="volume" />
        </button>
      </div>
      {(erro || !streamConfigurado) && (
        <p className="tfm-container tfm-player-error" role="status">
          {erro || "Transmissão indisponível no momento."}
        </p>
      )}
    </section>
  );
}
