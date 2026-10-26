import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://2-24-71-73.sslip.io",
  timeout: 12000,
  headers: { Accept: "application/json" },
});

export default api;

// Rotas públicas exatamente como documentadas em rotas_publicas_api_topfm.docx.
// Não adicione endpoints além destes.
export const ROUTES = {
  agora: "/programacao/agora",
  semana: "/programacao/semana",
  noticias: "/noticias/publicas",
  categorias: "/categorias",
  equipe: "/equipe/publicos",
  programas: "/programas/publicos",
};

// A API não expõe GET /noticias/publicas/:id. A página de detalhe carrega a
// lista pública e filtra pelo id no cliente — se um dia essa rota existir,
// basta adicioná-la aqui e trocar o filtro em NoticiaDetalhes.

// Mensagem de erro legível a partir de um erro do axios.
export function descreverErro(err) {
  if (err?.response) {
    const { status } = err.response;
    if (status === 404) return "Recurso não encontrado na API (404).";
    if (status >= 500) return "A API respondeu com erro interno (" + status + ").";
    return "A API respondeu " + status + ".";
  }
  if (err?.code === "ECONNABORTED") return "A API demorou demais para responder.";
  if (err?.code === "ERR_NETWORK") {
    return "Não foi possível falar com a API. Verifique se o servidor está no ar e se o CORS libera a origem do site.";
  }
  return err?.message || "Erro inesperado ao consultar a API.";
}
