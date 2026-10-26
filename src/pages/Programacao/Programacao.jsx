import { useState } from "react";
import { useApiResource } from "../../hooks/useApiResource";
import { pick, todayIndexSP, mapearGrade } from "../../utils/format";
import { DIAS_SEMANA, DIAS_CURTO } from "../../config/radio";
import WeeklySchedule from "../../components/WeeklySchedule/WeeklySchedule";
import ProgramNow from "../../components/ProgramNow/ProgramNow";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Programacao.css";
export default function Programacao({ agora }) {
  const semana = useApiResource("semana"),
    hoje = todayIndexSP();
  const [dia, setDia] = useState(hoje);
  const mapped = mapearGrade(semana.data, dia);
  const today = dia === hoje;
  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Programação</h1>
          <p className="tfm-page-hero-lead">
            Escolha o dia e encontre seus programas favoritos. Horários de
            Brasília.
          </p>
        </div>
      </section>
      <section className="tfm-container tfm-programacao-page">
        <ProgramNow agora={agora} />
        <div
          className="tfm-programacao-days"
          role="group"
          aria-label="Escolher dia da semana"
        >
          {DIAS_CURTO.map((label, i) => (
            <button
              type="button"
              key={label}
              aria-pressed={dia === i}
              aria-label={`${DIAS_SEMANA[i]}${i === hoje ? ", hoje" : ""}`}
              onClick={() => setDia(i)}
              className="tfm-programacao-day-btn"
            >
              <span>{label}</span>
              {i === hoje && <small>Hoje</small>}
            </button>
          ))}
        </div>
        <div className="tfm-section-header">
          <h2 className="tfm-section-title">{DIAS_SEMANA[dia]}</h2>
          {!semana.loading && !semana.error && (
            <p className="tfm-meta" role="status">
              {mapped.length} {mapped.length === 1 ? "programa" : "programas"}
            </p>
          )}
        </div>
        {semana.loading ? (
          <Loading label="Carregando grade…" />
        ) : semana.error ? (
          <ErrorMessage message={semana.error} onRetry={semana.refetch} />
        ) : (
          <WeeklySchedule
            items={mapped}
            onAirId={
              today
                ? pick(agora?.data, ["programaId", "id", "_id"], null)
                : null
            }
            onAirTitulo={
              today ? pick(agora?.data, ["titulo", "nome"], null) : null
            }
          />
        )}
      </section>
    </>
  );
}
