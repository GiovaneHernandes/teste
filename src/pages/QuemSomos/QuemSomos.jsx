import Img from "../../components/Img/Img";
import Bastidores from "../../components/Bastidores/Bastidores";
import Reveal from "../../components/Reveal/Reveal";
import "./QuemSomos.css";

export default function QuemSomos() {
  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Quem somos</h1>
          <p className="tfm-page-hero-lead">Você em primeiro lugar.</p>
        </div>
      </section>

      <section className="tfm-quemsomos-page">
        <div className="tfm-quemsomos-inner">
          <Reveal className="tfm-quemsomos-row">
            <div>
              <h2 className="tfm-quemsomos-heading">Nossa história</h2>
              <p className="tfm-quemsomos-text">
                A Top FM Bauru está no ar desde 2004, transmitindo pela
                frequência 101,3 MHz e também pela internet, sempre com foco no
                gênero sertanejo — o estilo musical de maior evidência no país.
                A programação mescla os maiores sucessos atuais com clássicos
                das décadas de 80 e 90 e o sertanejo raiz.
              </p>
            </div>
            {/* Foto — Mídia Kit p.9 */}
            <Img
              src="/estudio.jpg"
              alt="Estúdio da Top FM"
              className="tfm-quemsomos-img"
            />
          </Reveal>

          <Reveal className="tfm-quemsomos-row tfm-quemsomos-row-reverse">
            {/* Foto — Mídia Kit p.9 */}
            <Img
              src="/on-air.jpg"
              alt="Top FM no ar"
              className="tfm-quemsomos-img"
            />
            <div>
              <h2 className="tfm-quemsomos-heading">
                Posicionamento &amp; missão
              </h2>
              <p className="tfm-quemsomos-text">
                Ser a rádio sertaneja que faz a diferença na vida dos ouvintes e
                dos artistas: portas abertas para os maiores nomes do gênero,
                presença constante em eventos e shows da região, e uma
                programação pensada para presentear o público com promoções,
                prêmios e flashes ao vivo direto dos estabelecimentos parceiros.
              </p>
            </div>
          </Reveal>

          {/* ---- Público e alcance ---- */}

          <div className="tfm-quemsomos-sep">
            <h2 className="tfm-quemsomos-sep-titulo">Público &amp; alcance</h2>
            <span className="tfm-dial-rule" aria-hidden="true" />
          </div>

          <Reveal className="tfm-quemsomos-stats">
            <div className="tfm-quemsomos-stat">
              <div className="tfm-quemsomos-stat-value">92</div>
              <div className="tfm-quemsomos-stat-label">Cidades cobertas</div>
            </div>
            <div className="tfm-quemsomos-stat">
              <div className="tfm-quemsomos-stat-value">+2 milhões</div>
              <div className="tfm-quemsomos-stat-label">
                Habitantes alcançados
              </div>
            </div>
            <div className="tfm-quemsomos-stat">
              <div className="tfm-quemsomos-stat-value">64%</div>
              <div className="tfm-quemsomos-stat-label">Audiência feminina</div>
            </div>
            <div className="tfm-quemsomos-stat">
              <div className="tfm-quemsomos-stat-value">+350 mil h</div>
              <div className="tfm-quemsomos-stat-label">
                De conteúdo disponível
              </div>
            </div>
          </Reveal>

          <p className="tfm-quemsomos-footnote">
            Perfil etário da audiência: 17% de 18 a 24 anos · 31% de 25 a 34
            anos · 34% de 35 a 54 anos · 18% outras idades. Fonte: Mídia Kit Top
            FM 2026 / IBGE.
          </p>

          <Reveal className="tfm-quemsomos-mapa">
            <Img
              className="tfm-quemsomos-coverage"
              src="/cobertura.png"
              alt="Mapa da área de cobertura da Top FM Bauru"
            />
            <div className="tfm-quemsomos-mapa-texto">
              <h3>Área de cobertura</h3>
              <p>
                O sinal de 101,3 MHz alcança 92 municípios do centro-oeste
                paulista, de Bauru a Marília, Jaú, Lins, Avaré e Ourinhos,
                chegando ainda a Jacarezinho e Ribeirão Claro, no Paraná.
              </p>
              <span className="tfm-quemsomos-mapa-destaque">
                Mais de 2 milhões de habitantes
              </span>
            </div>
          </Reveal>

          {/* ---- Diferenciais ---- */}

          <div className="tfm-quemsomos-sep">
            <h2 className="tfm-quemsomos-sep-titulo">Diferenciais</h2>
            <span className="tfm-dial-rule" aria-hidden="true" />
          </div>

          <div className="tfm-quemsomos-diferenciais">
            {[
              "Flashes ao vivo direto dos estabelecimentos parceiros",
              "Promoções constantes: camarim, shows e prêmios para os ouvintes",
              "Estúdio aberto aos maiores artistas sertanejos do país",
              "Transmissão simultânea em rádio, internet e redes sociais",
            ].map((texto, i) => (
              <Reveal
                key={texto}
                delay={i * 70}
                className="tfm-quemsomos-diferencial"
              >
                {texto}
              </Reveal>
            ))}
          </div>

          <Bastidores />
        </div>
      </section>
    </>
  );
}
