import Brand from "../Brand/Brand";
import { Link } from "react-router-dom";
import {
  INSTAGRAM_URL,
  WHATSAPP_URL,
  SITE_URL,
  ENDERECO,
  TELEFONES_FIXOS,
  EMAIL_COMERCIAL,
} from "../../config/radio";
import "./Footer.css";

/*
 * Rodapé enxuto. Saíram:
 *   - "Últimas notícias": repetia a home, as miniaturas nunca mostravam foto
 *     e o componente fazia uma segunda chamada a GET /noticias em toda página;
 *   - o link genérico facebook.com e o WhatsApp com número fictício.
 * O botão de WhatsApp volta sozinho quando WHATSAPP_URL for preenchido.
 */
const LINKS = [
  { to: "/", label: "Início" },
  { to: "/noticias", label: "Notícias" },
  { to: "/programas", label: "Programas" },
  { to: "/programacao", label: "Programação" },
  { to: "/equipe", label: "Equipe" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="tfm-footer">
      <div className="tfm-footer-grid">
        <div className="tfm-footer-marca">
          <Link
            to="/"
            className="tfm-footer-brand"
            aria-label="Top FM Bauru, início"
          >
            <Brand footer />
          </Link>

          <p className="tfm-footer-text">
            A rádio que toca os maiores sucessos sertanejos, informação e
            entretenimento direto de Bauru.
          </p>

          <div className="tfm-footer-social">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tfm-footer-social-btn"
            >
              <svg
                width="17"
                height="17"
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
              @topfmbauru
            </a>

            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tfm-footer-social-btn"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.9A8.4 8.4 0 1 1 21 11.6z" />
                  <path d="M8.9 9c.3 2.6 2.4 4.7 5 5l1-1.4 1.8.8" />
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="tfm-footer-heading">Navegação</h3>
          <div className="tfm-footer-links">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <h3 className="tfm-footer-heading">Contato</h3>
          <div className="tfm-footer-contact">
            <span>{ENDERECO}</span>
            <span className="tfm-num">{TELEFONES_FIXOS}</span>
            <a href={`mailto:${EMAIL_COMERCIAL}`}>{EMAIL_COMERCIAL}</a>
          </div>
        </div>
      </div>

      <div className="tfm-footer-bottom">
        <span>© {new Date().getFullYear()} Top FM Bauru — 101,3 MHz</span>
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
          {SITE_URL.replace(/^https?:\/\/(www\.)?/, "")}
        </a>
      </div>
    </footer>
  );
}
