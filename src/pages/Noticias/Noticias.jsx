import { useMemo, useState } from "react";
import { useApiResource } from "../../hooks/useApiResource";
import {
  pick,
  mapaCategorias,
  mapearNoticia,
  maisRecentes,
} from "../../utils/format";
import NewsCard from "../../components/NewsCard/NewsCard";
import Destaques from "../../components/Destaques/Destaques";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Icon from "../../components/Icon/Icon";
import "./Noticias.css";
const POR_PAGINA = 8;
const normalizar = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export default function Noticias() {
  const noticias = useApiResource("noticias"),
    categorias = useApiResource("categorias");
  const [busca, setBusca] = useState(""),
    [editoria, setEditoria] = useState("todas"),
    [limite, setLimite] = useState(POR_PAGINA);
  const catMap = useMemo(
    () => mapaCategorias(categorias.data),
    [categorias.data],
  );
  const lista = useMemo(
    () => maisRecentes(noticias.data.map((n) => mapearNoticia(n, catMap))),
    [noticias.data, catMap],
  );
  const editorias = useMemo(
    () => [
      ...new Set(
        [
          ...categorias.data.map((c) => pick(c, ["nome", "titulo"], "")),
          ...lista.map((n) => n.categoria),
        ].filter(Boolean),
      ),
    ],
    [categorias.data, lista],
  );
  const termo = normalizar(busca.trim());
  const filtrando = !!termo || editoria !== "todas";
  const resultados = lista.filter(
    (n) =>
      (!termo || normalizar(`${n.titulo} ${n.resumo}`).includes(termo)) &&
      (editoria === "todas" || n.categoria === editoria),
  );
  const itens = filtrando ? resultados : lista.slice(3);
  const limpar = () => {
    setBusca("");
    setEditoria("todas");
    setLimite(POR_PAGINA);
  };
  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Notícias</h1>
          <p className="tfm-page-hero-lead">
            O que acontece em Bauru e região, e o que toca no mundo sertanejo.
          </p>
        </div>
      </section>
      <div className="tfm-container tfm-nw-filters">
        <div className="tfm-nw-search-row">
          <label className="tfm-nw-busca">
            <Icon name="search" />
            <span className="tfm-sr-only">Buscar notícias</span>
            <input
              id="busca-noticias"
              type="search"
              placeholder="Buscar por assunto ou palavra-chave"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setLimite(POR_PAGINA);
              }}
            />
          </label>
          {filtrando && (
            <button className="tfm-btn" type="button" onClick={limpar}>
              Limpar filtros
            </button>
          )}
        </div>
        <div
          className="tfm-nw-editorias"
          role="group"
          aria-label="Filtrar por editoria"
        >
          {["todas", ...editorias].map((cat) => (
            <button
              key={cat}
              type="button"
              className="tfm-chip"
              aria-pressed={editoria === cat}
              onClick={() => {
                setEditoria(cat);
                setLimite(POR_PAGINA);
              }}
            >
              {cat === "todas" ? "Todas" : cat}
            </button>
          ))}
        </div>
        {categorias.error && (
          <p className="tfm-meta">
            Algumas editorias não puderam ser carregadas. A busca continua
            disponível.{" "}
            <button
              className="tfm-inline-button"
              type="button"
              onClick={categorias.refetch}
            >
              Tentar novamente
            </button>
          </p>
        )}
      </div>
      <div className="tfm-container tfm-nw-content">
        {noticias.loading ? (
          <Loading label="Carregando notícias…" />
        ) : noticias.error ? (
          <ErrorMessage message={noticias.error} onRetry={noticias.refetch} />
        ) : !lista.length ? (
          <ErrorMessage message="Nenhuma notícia publicada no momento." />
        ) : (
          <>
            {!filtrando && (
              <section
                className="tfm-nw-destaques"
                aria-label="Notícias em destaque"
              >
                <h2 className="tfm-sr-only">Em destaque</h2>
                <Destaques itens={lista.slice(0, 3)} />
              </section>
            )}
            {(filtrando || itens.length > 0) && (
              <section
                className="tfm-nw-results"
                aria-labelledby="resultados-title"
              >
                <div className="tfm-section-header">
                  <h2 id="resultados-title" className="tfm-section-title">
                    {filtrando
                      ? editoria === "todas"
                        ? "Resultados da busca"
                        : editoria
                      : "Mais notícias"}
                  </h2>
                  <p className="tfm-meta" role="status">
                    {itens.length} {itens.length === 1 ? "notícia" : "notícias"}
                  </p>
                </div>
                {!itens.length ? (
                  <div className="tfm-nw-vazio">
                    <h3>Nenhuma notícia encontrada</h3>
                    <p>Tente outra palavra ou selecione outra editoria.</p>
                    <button className="tfm-btn" type="button" onClick={limpar}>
                      Ver todas as notícias
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="tfm-nw-lista">
                      {itens.slice(0, limite).map((item) => (
                        <NewsCard key={item.id} item={item} variant="list" />
                      ))}
                    </div>
                    {itens.length > limite && (
                      <div className="tfm-nw-more">
                        <button
                          type="button"
                          className="tfm-btn"
                          onClick={() => setLimite((n) => n + POR_PAGINA)}
                        >
                          Carregar mais notícias
                        </button>
                        <p className="tfm-meta">
                          Mostrando {Math.min(limite, itens.length)} de{" "}
                          {itens.length}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
