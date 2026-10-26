import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import Brand from "../Brand/Brand";
import Icon from "../Icon/Icon";
import "./Header.css";
const NAV_ITEMS = [
  { to: "/", label: "Início", end: true },
  { to: "/noticias", label: "Notícias" },
  { to: "/programas", label: "Programas" },
  { to: "/programacao", label: "Programação" },
  { to: "/equipe", label: "Equipe" },
  { to: "/quem-somos", label: "Quem somos" },
  { to: "/contato", label: "Contato" },
];
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const { playing, buffering, alternar, streamConfigurado } = usePlayer();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const change = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menuOpen]);
  function onKeyDown(e) {
    if (e.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      buttonRef.current?.focus();
    }
  }
  return (
    <header
      className="tfm-header"
      ref={headerRef}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false);
      }}
    >
      <div className="tfm-container tfm-header-top">
        <Link
          to="/"
          className="tfm-header-brand"
          aria-label="Top FM Bauru, início"
        >
          <Brand />
        </Link>
        <p className="tfm-header-tagline">Você em primeiro lugar.</p>
        <div className="tfm-header-actions">
          <Link
            to="/noticias#busca-noticias"
            className="tfm-header-search"
            aria-label="Buscar notícias"
          >
            <Icon name="search" />
          </Link>
          <button
            className="tfm-btn tfm-btn--primary tfm-header-listen"
            type="button"
            onClick={alternar}
            disabled={!streamConfigurado}
          >
            <Icon name={playing || buffering ? "pause" : "play"} size={18} />
            <span>
              {buffering
                ? "Cancelar conexão"
                : playing
                  ? "Pausar rádio"
                  : "Ouvir ao vivo"}
            </span>
          </button>
          <button
            type="button"
            className="tfm-header-toggle"
            ref={buttonRef}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="tfm-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        id="tfm-navigation"
        className={`tfm-header-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegação principal"
      >
        <div className="tfm-container tfm-header-nav-inner">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
          <span className="tfm-header-location">Bauru e região</span>
        </div>
      </nav>
    </header>
  );
}
