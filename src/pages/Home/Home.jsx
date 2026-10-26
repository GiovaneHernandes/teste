import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApiResource } from "../../hooks/useApiResource";
import {
  pick,
  pickImagem,
  todayIndexSP,
  mapaCategorias,
  mapearNoticia,
  maisRecentes,
  mapearPrograma,
  mapearGrade,
} from "../../utils/format";
import { DIAS_SEMANA } from "../../config/radio";
import Destaques from "../../components/Destaques/Destaques";
import NewsCard from "../../components/NewsCard/NewsCard";
import ProgramCarousel from "../../components/ProgramCarousel/ProgramCarousel";
import TeamCard from "../../components/TeamCard/TeamCard";
import WeeklySchedule from "../../components/WeeklySchedule/WeeklySchedule";
import ProgramNow from "../../components/ProgramNow/ProgramNow";
import PromoBand from "../../components/PromoBand/PromoBand";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Icon from "../../components/Icon/Icon";
import "./Home.css";
function SectionTitle({ title, to, label }) {
  return (
    <div className="tfm-section-header">
      <h2 className="tfm-section-title">{title}</h2>
      <Link className="tfm-see-all" to={to}>
        {label}
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
function ResourceState({ resource, empty }) {
  return resource.loading ? (
    <Loading />
  ) : resource.error ? (
    <ErrorMessage message={resource.error} onRetry={resource.refetch} />
  ) : !resource.data.length ? (
    <ErrorMessage message={empty} />
  ) : null;
}
export default function Home({ agora }) {
  const noticias = useApiResource("noticias"),
    categorias = useApiResource("categorias"),
    programas = useApiResource("programas"),
    equipe = useApiResource("equipe"),
    semana = useApiResource("semana");
  const catMap = useMemo(
    () => mapaCategorias(categorias.data),
    [categorias.data],
  );
  const news = useMemo(
    () => maisRecentes(noticias.data.map((n) => mapearNoticia(n, catMap))),
    [noticias.data, catMap],
  );
  const today = todayIndexSP();
  const grade = mapearGrade(semana.data, today);
  const team = equipe.data.slice(0, 4).map((m) => ({
    id: pick(m, ["id", "_id"]),
    nome: pick(m, ["nome"], "Membro da equipe"),
    cargo: pick(m, ["cargo", "funcao"], ""),
    imagem: pickImagem(m),
    instagram: pick(m, ["instagram"], ""),
  }));
  return (
    <>
      <section
        className="tfm-home-news tfm-container"
        aria-labelledby="home-title"
      >
        <div className="tfm-home-news-heading">
          <h1 id="home-title">Notícias em destaque</h1>
          <Link className="tfm-see-all" to="/noticias">
            Todas as notícias
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <ResourceState
          resource={noticias}
          empty="Nenhuma notícia publicada no momento."
        />
        {!noticias.loading && !noticias.error && (
          <Destaques itens={news.slice(0, 6)} />
        )}
      </section>
      <div className="tfm-container tfm-home-onair">
        <ProgramNow agora={agora} />
      </div>
      {news.length > 6 && !noticias.loading && !noticias.error && (
        <section className="tfm-container tfm-home-section">
          <SectionTitle
            title="Últimas notícias"
            to="/noticias"
            label="Ver todas"
          />
          <div className="tfm-home-latest">
            {news.slice(6, 10).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
      <section className="tfm-home-schedule tfm-home-section">
        <div className="tfm-container">
          <SectionTitle
            title={`Na rádio hoje · ${DIAS_SEMANA[today]}`}
            to="/programacao"
            label="Ver a semana"
          />
          <ResourceState
            resource={semana}
            empty="Nenhum programa cadastrado para hoje."
          />
          {!semana.loading && !semana.error && semana.data.length > 0 && (
            <WeeklySchedule
              items={grade}
              onAirId={pick(agora?.data, ["programaId", "id", "_id"], null)}
              onAirTitulo={pick(agora?.data, ["titulo", "nome"], null)}
            />
          )}
        </div>
      </section>
      <section className="tfm-container tfm-home-section">
        <SectionTitle
          title="Programas da Top FM"
          to="/programas"
          label="Conhecer todos"
        />
        <ResourceState
          resource={programas}
          empty="Nenhum programa ativo no momento."
        />
        {!programas.loading && !programas.error && (
          <ProgramCarousel items={programas.data.map(mapearPrograma)} />
        )}
      </section>
      <PromoBand />
      <section className="tfm-container tfm-home-section">
        <SectionTitle
          title="Quem faz a Top FM"
          to="/equipe"
          label="Conhecer a equipe"
        />
        <ResourceState
          resource={equipe}
          empty="Nenhum integrante cadastrado no momento."
        />
        {!equipe.loading && !equipe.error && (
          <div className="tfm-home-team-grid">
            {team.map((item) => (
              <TeamCard key={item.id} item={item} light />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
