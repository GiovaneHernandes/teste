import "./Equalizer.css";

/*
 * Barras de equalizador. Puramente decorativo — não lê o áudio, só sinaliza
 * que há som. Fica escondido de leitores de tela: quem usa leitor já recebe
 * o estado do player pelo texto ao lado.
 *
 * `ativo=false` congela as barras em altura baixa, para o indicador não
 * dançar quando a transmissão está em pausa.
 */
export default function Equalizer({
  ativo = true,
  barras = 4,
  className = "",
}) {
  return (
    <span
      className={`tfm-eq ${ativo ? "tfm-eq--ativo" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {Array.from({ length: barras }).map((_, i) => (
        <span key={i} className="tfm-eq-bar" style={{ "--tfm-eq-i": i }} />
      ))}
    </span>
  );
}
