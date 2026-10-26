import Img from "../Img/Img";
import "./WeeklySchedule.css";
export default function WeeklySchedule({ items = [], onAirId, onAirTitulo }) {
  if (!items.length)
    return (
      <p className="tfm-state">Nenhum programa cadastrado para este dia.</p>
    );
  return (
    <ol className="tfm-schedule">
      {items.map((item, i) => {
        const noAr =
          onAirId != null && item.programaId != null
            ? String(item.programaId) === String(onAirId)
            : !!onAirTitulo && item.titulo === onAirTitulo;
        return (
          <li
            className={`tfm-schedule-row ${noAr ? "is-live" : ""}`}
            key={item.id ?? `${item.titulo}-${item.hi}-${i}`}
          >
            <p className="tfm-schedule-time tfm-num">
              {item.horario || item.hi || "Horário não informado"}
            </p>
            <Img src={item.imagem} alt="" className="tfm-schedule-image" />
            <div className="tfm-schedule-info">
              <h3>{item.titulo}</h3>
              {item.apresentador && <p>Com {item.apresentador}</p>}
            </div>
            {noAr && <span className="tfm-schedule-live">No ar agora</span>}
          </li>
        );
      })}
    </ol>
  );
}
