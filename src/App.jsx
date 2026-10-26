import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import RadioPlayer from "./components/RadioPlayer/RadioPlayer.jsx";
import Home from "./pages/Home/Home.jsx";
import Noticias from "./pages/Noticias/Noticias.jsx";
import NoticiaDetalhes from "./pages/NoticiaDetalhes/NoticiaDetalhes.jsx";
import Programas from "./pages/Programas/Programas.jsx";
import Programacao from "./pages/Programacao/Programacao.jsx";
import Equipe from "./pages/Equipe/Equipe.jsx";
import QuemSomos from "./pages/QuemSomos/QuemSomos.jsx";
import Contato from "./pages/Contato/Contato.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { useAgora } from "./hooks/useApiResource.js";

// Sem isto, navegar entre páginas mantinha o scroll da página anterior.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView();
      el?.focus();
    } else {
      document.getElementById("site-scroll")?.scrollTo(0, 0);
      if (!first.current)
        document.getElementById("conteudo")?.focus({ preventScroll: true });
    }
    first.current = false;
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const agora = useAgora();

  return (
    <div className="tfm-app">
      <a href="#conteudo" className="tfm-skip">
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <div className="tfm-site-scroll" id="site-scroll" tabIndex={-1}>
        <div className="tfm-page">
          <Header />
          <main id="conteudo" tabIndex={-1} className="tfm-main">
            <Routes>
              <Route path="/" element={<Home agora={agora} />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/:id" element={<NoticiaDetalhes />} />
              <Route path="/programas" element={<Programas />} />
              <Route
                path="/programacao"
                element={<Programacao agora={agora} />}
              />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <RadioPlayer agora={agora} />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PlayerProvider>
  );
}
