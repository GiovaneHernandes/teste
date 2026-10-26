import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="tfm-notfound">
      <p className="tfm-notfound-code">404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço pode ter mudado ou a página não está mais disponível.</p>
      <div className="tfm-notfound-actions">
        <Link to="/" className="tfm-btn tfm-btn--primary">
          Voltar ao início
        </Link>
        <Link to="/noticias" className="tfm-btn">
          Ler notícias
        </Link>
      </div>
    </section>
  );
}
