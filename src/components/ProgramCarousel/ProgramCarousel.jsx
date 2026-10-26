import { useCallback, useEffect, useRef, useState } from "react";
import ProgramCard from "../ProgramCard/ProgramCard";
import "./ProgramCarousel.css";

// Quantos cards cabem por vez. Faixas em JS (e não só em media query) porque
// a lógica precisa do mesmo número para saber onde é o fim da lista.
function visiveisPara(largura) {
  if (largura >= 1400) return 4;
  if (largura >= 1060) return 3;
  if (largura >= 700) return 2;
  return 1;
}

const INTERVALO = 4000;

export default function ProgramCarousel({ items = [], intervalo = INTERVALO }) {
  const [porVez, setPorVez] = useState(() =>
    visiveisPara(typeof window === "undefined" ? 1280 : window.innerWidth),
  );
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  const areaRef = useRef(null);

  const ultimo = Math.max(0, items.length - porVez);

  useEffect(() => {
    const aoRedimensionar = () => setPorVez(visiveisPara(window.innerWidth));
    window.addEventListener("resize", aoRedimensionar);
    return () => window.removeEventListener("resize", aoRedimensionar);
  }, []);

  // Se a tela cresceu e o índice ficou além do fim, recua.
  useEffect(() => {
    setIndice((i) => Math.min(i, ultimo));
  }, [ultimo]);

  const avancar = useCallback(() => {
    setIndice((i) => (i >= ultimo ? 0 : i + 1));
  }, [ultimo]);

  const voltar = useCallback(() => {
    setIndice((i) => (i <= 0 ? ultimo : i - 1));
  }, [ultimo]);

  // Avanço automático: um programa por vez. Para quando o ponteiro está em
  // cima, quando o foco está dentro, e quando o sistema pede menos movimento.
  useEffect(() => {
    if (pausado || manualPause || hidden || reduced || ultimo === 0) return;
    const semMovimento =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) return;

    const t = setInterval(avancar, intervalo);
    return () => clearInterval(t);
  }, [pausado, manualPause, hidden, reduced, ultimo, avancar, intervalo]);

  // Pausa também quando a aba sai de foco — sem isso o carrossel "pula"
  // vários passos de uma vez ao voltar.
  useEffect(() => {
    const aoTrocarVisibilidade = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", aoTrocarVisibilidade);
    return () =>
      document.removeEventListener("visibilitychange", aoTrocarVisibilidade);
  }, []);

  // Arrastar com o dedo (ou com o mouse). Só o eixo X é considerado, e só a
  // partir de 45px — abaixo disso o gesto é ruído de rolagem vertical e o
  // carrossel não deve reagir. Pointer Events cobre toque, mouse e caneta com
  // um único par de handlers.
  const arrasteRef = useRef(null);

  const aoPressionar = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    arrasteRef.current = { x: e.clientX, y: e.clientY };
  };

  const aoSoltar = (e) => {
    const inicio = arrasteRef.current;
    arrasteRef.current = null;
    if (!inicio || ultimo === 0) return;

    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;

    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) avancar();
    else voltar();
  };

  if (!items.length) return null;

  const temControles = items.length > porVez;

  return (
    <div
      className="tfm-carousel"
      ref={areaRef}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() =>
        setPausado(areaRef.current?.contains(document.activeElement))
      }
      onFocusCapture={() => setPausado(true)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Programas da Top FM"
      onBlurCapture={(e) => {
        if (!areaRef.current?.contains(e.relatedTarget)) setPausado(false);
      }}
    >
      <div
        className="tfm-carousel-viewport"
        onPointerDown={aoPressionar}
        onPointerUp={aoSoltar}
        onPointerCancel={() => {
          arrasteRef.current = null;
        }}
      >
        <div
          className="tfm-carousel-track"
          style={{ "--tfm-i": indice, "--tfm-n": porVez }}
          aria-live="off"
        >
          {items.map((item, position) => (
            <div
              className="tfm-carousel-slide"
              key={item.id}
              aria-hidden={position < indice || position >= indice + porVez}
            >
              <ProgramCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {temControles && (
        <div className="tfm-carousel-controles">
          <div className="tfm-carousel-pontos">
            <span className="tfm-meta">
              {indice + 1}–{Math.min(indice + porVez, items.length)} de{" "}
              {items.length}
            </span>
          </div>

          <div className="tfm-carousel-setas">
            {!reduced && (
              <button
                type="button"
                className="tfm-btn"
                onClick={() => setManualPause((v) => !v)}
                aria-pressed={manualPause}
              >
                {manualPause ? "Retomar rotação" : "Pausar rotação"}
              </button>
            )}
            <button
              type="button"
              onClick={voltar}
              aria-label="Programa anterior"
              className="tfm-carousel-seta"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={avancar}
              aria-label="Próximo programa"
              className="tfm-carousel-seta"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
