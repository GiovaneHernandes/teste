import Img from "../Img/Img";
import "./TeamCard.css";

export default function TeamCard({ item, light = false }) {
  const instagramUrl = item.instagram
    ? item.instagram.startsWith("http")
      ? item.instagram
      : `https://instagram.com/${item.instagram.replace("@", "")}`
    : null;

  const arroba = item.instagram
    ? "@" +
      item.instagram
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
        .replace(/^@/, "")
        .replace(/\/$/, "")
    : null;

  return (
    <article
      className={`tfm-team-card ${light ? "tfm-team-card--light" : ""}`.trim()}
    >
      <Img src={item.imagem} alt={item.nome} className="tfm-team-card-img" />

      <div className="tfm-team-card-body">
        <h3 className="tfm-team-card-name">{item.nome}</h3>

        {item.cargo && <p className="tfm-team-card-cargo">{item.cargo}</p>}

        {item.descricao && (
          <p className="tfm-team-card-desc">{item.descricao}</p>
        )}

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tfm-team-card-social"
            aria-label={`Instagram de ${item.nome}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.2"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>{arroba}</span>
          </a>
        )}
      </div>
    </article>
  );
}
