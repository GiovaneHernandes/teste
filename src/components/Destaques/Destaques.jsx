import NewsCard from "../NewsCard/NewsCard";
import "./Destaques.css";
export default function Destaques({ itens = [] }) {
  const [lead, ...rest] = itens;
  if (!lead) return null;
  const secondary = rest.slice(0, 2),
    briefs = rest.slice(2, 5);
  return (
    <div
      className={`tfm-destaques ${!rest.length ? "is-solo" : ""} ${!briefs.length ? "without-briefs" : ""}`}
    >
      <NewsCard item={lead} variant="lead" />
      {!!secondary.length && (
        <div className="tfm-destaques-secondary">
          {secondary.map((item) => (
            <NewsCard key={item.id} item={item} variant="card" />
          ))}
        </div>
      )}
      {!!briefs.length && (
        <div className="tfm-destaques-briefs">
          <h2 className="tfm-destaques-heading">Mais notícias</h2>
          {briefs.map((item) => (
            <NewsCard key={item.id} item={item} variant="row" />
          ))}
        </div>
      )}
    </div>
  );
}
