import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApiResource } from "../../hooks/useApiResource";
import {
  pick,
  pickImagem,
  formatDate,
  nomeCategoria,
  mapaCategorias,
  mapearNoticia,
  maisRecentes,
  autorNoticia,
} from "../../utils/format";
import ArticleContent, {
  articleText,
} from "../../components/ArticleContent/ArticleContent";
import Img from "../../components/Img/Img";
import NewsCard from "../../components/NewsCard/NewsCard";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Icon from "../../components/Icon/Icon";
import "./NoticiaDetalhes.css";
export default function NoticiaDetalhes() {
  const { id } = useParams();
  const noticias = useApiResource("noticias"),
    categorias = useApiResource("categorias");
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef(null);
  const catMap = useMemo(
    () => mapaCategorias(categorias.data),
    [categorias.data],
  );
  const raw = useMemo(
    () =>
      noticias.data.find((n) => String(pick(n, ["id", "_id"])) === String(id)),
    [noticias.data, id],
  );
  useEffect(() => {
    setCopyStatus("");
    return () => clearTimeout(timer.current);
  }, [id]);
  if (noticias.loading)
    return (
      <div className="tfm-container tfm-article-state">
        <Loading label="Carregando notícia…" />
      </div>
    );
  if (noticias.error || !raw)
    return (
      <div className="tfm-container tfm-article-state">
        <Link className="tfm-see-all" to="/noticias">
          Voltar para notícias
        </Link>
        <ErrorMessage
          message={noticias.error || "Notícia não encontrada."}
          onRetry={noticias.error ? noticias.refetch : undefined}
        />
      </div>
    );
  const titulo = pick(raw, ["titulo", "nome"], "Sem título");
  const categoria = nomeCategoria(raw, catMap);
  const data = formatDate(
    pick(raw, ["dataPublicacao", "createdAt", "data"], ""),
  );
  const resumo = pick(raw, ["resumo", "descricaoCurta", "subtitulo"], "");
  const conteudo = String(pick(raw, ["conteudo", "texto", "corpo"], resumo));
  const lide = resumo && resumo !== conteudo ? resumo : "";
  const autor = autorNoticia(raw);
  const imagem = pickImagem(raw);
  const palavras = articleText(conteudo)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutos = palavras ? Math.max(1, Math.ceil(palavras / 200)) : null;
  const related = maisRecentes(
    noticias.data
      .filter((n) => String(pick(n, ["id", "_id"])) !== String(id))
      .map((n) => mapearNoticia(n, catMap)),
  ).slice(0, 3);
  const url = window.location.href;
  async function copiar() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("Link copiado.");
      timer.current = setTimeout(() => setCopyStatus(""), 3000);
    } catch {
      setCopyStatus(
        "Não foi possível copiar. Copie o endereço abaixo ou compartilhe pelo WhatsApp ou Facebook.",
      );
    }
  }
  return (
    <>
      <article className="tfm-article tfm-container">
        <nav aria-label="Caminho da notícia" className="tfm-article-breadcrumb">
          <Link to="/">Início</Link>
          <Icon name="right" size={14} />
          <Link to="/noticias">Notícias</Link>
          {categoria && (
            <>
              <Icon name="right" size={14} />
              <span>{categoria}</span>
            </>
          )}
        </nav>
        <header className="tfm-article-header">
          <h1>{titulo}</h1>
          {lide && <p className="tfm-article-summary">{lide}</p>}
          <div className="tfm-article-meta">
            {autor && (
              <span>
                Por <strong>{autor}</strong>
              </span>
            )}
            {data && <span>{data}</span>}
            {minutos && <span>{minutos} min de leitura</span>}
          </div>
        </header>
        {imagem && (
          <figure className="tfm-article-figure">
            <Img
              src={imagem}
              alt={titulo}
              priority
              className="tfm-article-image"
            />
          </figure>
        )}
        <ArticleContent content={conteudo} />
        <div className="tfm-article-share">
          <h2>Compartilhe esta notícia</h2>
          <div className="tfm-article-share-actions">
            <a
              className="tfm-btn"
              href={`https://wa.me/?text=${encodeURIComponent(titulo + " " + url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="tfm-btn"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <button type="button" className="tfm-btn" onClick={copiar}>
              <Icon name="link" size={16} />
              {copyStatus === "Link copiado." ? "Link copiado" : "Copiar link"}
            </button>
          </div>
          <p role="status" className="tfm-meta">
            {copyStatus}
          </p>
          {copyStatus.startsWith("Não") && (
            <input
              className="tfm-copy-url"
              aria-label="Endereço desta notícia"
              value={url}
              readOnly
              onFocus={(e) => e.target.select()}
            />
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section className="tfm-article-related">
          <div className="tfm-container">
            <div className="tfm-section-header">
              <h2 className="tfm-section-title">Continue lendo</h2>
              <Link className="tfm-see-all" to="/noticias">
                Todas as notícias
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="tfm-article-related-grid">
              {related.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
