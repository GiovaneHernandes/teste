import Img from "../Img/Img";
import "./ProgramCard.css";
export default function ProgramCard({ item }) {
  return (
    <article className="tfm-program-card">
      <Img src={item.imagem} alt="" className="tfm-program-card-img" />
      <div className="tfm-program-card-body">
        <h3>{item.titulo}</h3>
        {item.apresentador && (
          <p className="tfm-program-card-apresentador">{item.apresentador}</p>
        )}
        {item.horario && (
          <p className="tfm-program-card-horario tfm-num">{item.horario}</p>
        )}
        {item.descricao && (
          <p className="tfm-program-card-descricao">{item.descricao}</p>
        )}
      </div>
    </article>
  );
}
