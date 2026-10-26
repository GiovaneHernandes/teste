import { useApiResource } from "../../hooks/useApiResource";
import { pick, pickImagem } from "../../utils/format";
import TeamCard from "../../components/TeamCard/TeamCard";
import Reveal from "../../components/Reveal/Reveal";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Equipe.css";

export default function Equipe() {
  const equipe = useApiResource("equipe");

  const list = (equipe.data || []).map((m) => ({
    id: pick(m, ["id", "_id"]),
    nome: pick(m, ["nome"], "Membro da equipe"),
    cargo: pick(m, ["cargo", "funcao"], ""),
    descricao: pick(m, ["descricao", "bio"], ""),
    imagem: pickImagem(m),
    instagram: pick(m, ["instagram"], ""),
  }));

  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Equipe</h1>
          <p className="tfm-page-hero-lead">
            As vozes, os bastidores e o time comercial que fazem a Top FM sair
            do estúdio todos os dias.
          </p>
        </div>
      </section>

      <section className="tfm-equipe-page">
        <div className="tfm-equipe-inner">
          {equipe.loading && <Loading light label="Carregando equipe…" />}

          {!equipe.loading && equipe.error && (
            <ErrorMessage
              light
              message={equipe.error}
              onRetry={equipe.refetch}
            />
          )}

          {!equipe.loading && !equipe.error && list.length === 0 && (
            <ErrorMessage light message="Nenhum membro ativo cadastrado." />
          )}

          {!equipe.loading && !equipe.error && list.length > 0 && (
            <>
              <div className="tfm-equipe-sep">
                <h2 className="tfm-equipe-sep-titulo">
                  <span className="tfm-num">{list.length}</span>{" "}
                  {list.length === 1 ? "integrante" : "integrantes"}
                </h2>
                <span className="tfm-dial-rule" aria-hidden="true" />
              </div>

              <div className="tfm-equipe-grid">
                {list.map((item, i) => (
                  <Reveal key={item.id} delay={Math.min(i, 5) * 60}>
                    <TeamCard item={item} light />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
