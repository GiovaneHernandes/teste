import { Link } from "react-router-dom";
import Img from "../Img/Img";
import "./NewsCard.css";
const ALIAS = {
  featured: "lead",
  overlay: "lead",
  compact: "card",
  default: "card",
};
export default function NewsCard({
  item,
  variant,
  featured = false,
  compact = false,
}) {
  const mode = ALIAS[variant] || variant || (featured ? "lead" : "card");
  const time = item.quando || item.data;
  return (
    <article className={`tfm-news tfm-news--${mode}`}>
      <Link to={`/noticias/${item.id}`} className="tfm-news-link">
        <Img
          src={item.imagem}
          alt=""
          priority={mode === "lead"}
          className="tfm-news-foto"
        />
        <div className="tfm-news-corpo">
          <div className="tfm-news-meta">
            {item.categoria && (
              <span className="tfm-tag">{item.categoria}</span>
            )}
            {time && <span className="tfm-meta">{time}</span>}
          </div>
          <h3 className="tfm-news-titulo">{item.titulo}</h3>
          {item.resumo && mode !== "row" && (
            <p className="tfm-news-resumo tfm-clamp-2">{item.resumo}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
