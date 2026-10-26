import { Link } from "react-router-dom";
import { pick, pickImagem, formatHora } from "../../utils/format";
import Img from "../Img/Img";
import Icon from "../Icon/Icon";
import "./ProgramNow.css";
export default function ProgramNow({ agora }) {
  const programa = agora?.data;
  const titulo = pick(programa, ["titulo", "nome"], "");
  const apresentador = pick(programa, ["apresentador"], "");
  const horario = [
    formatHora(
      pick(
        programa,
        ["horarioInicio", "horaInicio", "hora_inicio", "inicio"],
        "",
      ),
    ),
    formatHora(
      pick(programa, ["horarioFim", "horaFim", "hora_fim", "fim"], ""),
    ),
  ]
    .filter(Boolean)
    .join(" – ");
  return (
    <aside className="tfm-program-now" aria-label="Programa no ar">
      {titulo && (
        <Img
          src={pickImagem(programa)}
          alt=""
          className="tfm-program-now-img"
        />
      )}
      <div className="tfm-program-now-body">
        <p className="tfm-program-now-label">
          {agora?.loading
            ? "Carregando programação…"
            : agora?.error
              ? "Programação indisponível"
              : titulo
                ? "No ar agora"
                : "Top FM · 101,3 MHz"}
        </p>
        <h2 className="tfm-program-now-title">
          {agora?.error
            ? "Consulte a grade da rádio"
            : titulo || "Música e informação com você"}
        </h2>
        {!agora?.error && (apresentador || horario) && (
          <p className="tfm-program-now-meta">
            {[apresentador && `Com ${apresentador}`, horario]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
      <Link to="/programacao" className="tfm-see-all">
        Ver programação
        <Icon name="arrow" size={16} />
      </Link>
    </aside>
  );
}
