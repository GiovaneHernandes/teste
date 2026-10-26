import { useApiResource } from "../../hooks/useApiResource";
import { mapearPrograma } from "../../utils/format";
import ProgramCard from "../../components/ProgramCard/ProgramCard";
import Reveal from "../../components/Reveal/Reveal";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Programas.css";

export default function Programas() {
  const programas = useApiResource("programas");

  const list = programas.data.map(mapearPrograma);

  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Programas</h1>
          <p className="tfm-page-hero-lead">
            Quem comanda cada faixa do dia na 101,3 — do primeiro café à
            madrugada.
          </p>
        </div>
      </section>

      <section className="tfm-programas-page">
        <div className="tfm-programas-inner">
          {programas.loading && <Loading light label="Carregando programas…" />}

          {!programas.loading && programas.error && (
            <ErrorMessage
              light
              message={programas.error}
              onRetry={programas.refetch}
            />
          )}

          {!programas.loading && !programas.error && list.length === 0 && (
            <ErrorMessage light message="Nenhum programa ativo no momento." />
          )}

          {!programas.loading && !programas.error && list.length > 0 && (
            <>
              <div className="tfm-programas-sep">
                <h2 className="tfm-programas-sep-titulo">
                  <span className="tfm-num">{list.length}</span>{" "}
                  {list.length === 1 ? "programa" : "programas"} na Top FM
                </h2>
                <span className="tfm-dial-rule" aria-hidden="true" />
              </div>

              <div className="tfm-programas-grid">
                {list.map((item, i) => (
                  <Reveal key={item.id} delay={Math.min(i, 5) * 60}>
                    <ProgramCard item={item} />
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
