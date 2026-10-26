export function pick(obj, keys, fallback) {
  if (!obj) return fallback;
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return fallback;
}

const OPCOES_DATA = { day: "2-digit", month: "long", year: "numeric" };

export function formatDate(value) {
  if (!value) return "";

  // "2026-07-20" é interpretado pelo JS como meia-noite em UTC; convertendo
  // para America/Sao_Paulo isso voltava um dia (saía 19 de julho). Datas sem
  // hora são formatadas como data pura, sem conversão de fuso.
  const soData = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (soData) {
    const d = new Date(
      Number(soData[1]),
      Number(soData[2]) - 1,
      Number(soData[3]),
    );
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", OPCOES_DATA);
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    ...OPCOES_DATA,
    timeZone: "America/Sao_Paulo",
  });
}

// Aceita "14:00", "14:00:00" e ISO completo; devolve sempre "HH:MM".
export function formatHora(value) {
  if (!value) return "";
  const s = String(value).trim();
  const hhmm = s.match(/^(\d{1,2}):(\d{2})/);
  if (hhmm) return String(hhmm[1]).padStart(2, "0") + ":" + hhmm[2];
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
  }
  return s;
}

export function todayIndexSP() {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
  });
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[fmt.format(new Date())] ?? 0;
}

// Converte o dia da semana vindo da API para o índice 0..6 usado no front
// (0 = Domingo, igual ao array DIAS_SEMANA em config/radio.js).
// Aceita número (0), string numérica ("1"), nome ("Segunda-feira", "SEGUNDA",
// "seg") e enum em inglês ("MONDAY"). Devolve null quando não dá para decidir.
const DIAS_INDEX = {
  domingo: 0,
  dom: 0,
  sunday: 0,
  sun: 0,
  segunda: 1,
  "segunda-feira": 1,
  segundafeira: 1,
  seg: 1,
  monday: 1,
  mon: 1,
  terca: 2,
  "terca-feira": 2,
  tercafeira: 2,
  ter: 2,
  tuesday: 2,
  tue: 2,
  quarta: 3,
  "quarta-feira": 3,
  quartafeira: 3,
  qua: 3,
  wednesday: 3,
  wed: 3,
  quinta: 4,
  "quinta-feira": 4,
  quintafeira: 4,
  qui: 4,
  thursday: 4,
  thu: 4,
  sexta: 5,
  "sexta-feira": 5,
  sextafeira: 5,
  sex: 5,
  friday: 5,
  fri: 5,
  sabado: 6,
  sab: 6,
  saturday: 6,
  sat: 6,
};

export function normalizeDia(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return ((Math.trunc(value) % 7) + 7) % 7;
  }
  const raw = String(value).trim();
  if (/^\d+$/.test(raw)) return ((Number(raw) % 7) + 7) % 7;
  const key = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  if (key in DIAS_INDEX) return DIAS_INDEX[key];
  const semSufixo = key.replace(/-feira$/, "");
  if (semSufixo in DIAS_INDEX) return DIAS_INDEX[semSufixo];
  return null;
}

// URL de imagem. Três coisas quebravam antes desta versão:
// 1) o campo às vezes é objeto ({ url }, { secure_url } do Cloudinary) ou lista;
// 2) se a API devolve caminho relativo ("/uploads/foto.jpg"), o navegador
//    pedia para o servidor do Vite e tomava 404 — precisa colar na base da API;
// 3) o nome do campo varia por tabela.
const API_BASE = String(
  import.meta.env?.VITE_API_URL || "http://localhost:3000",
).replace(/\/+$/, "");

const CAMPOS_IMAGEM = [
  "imagem",
  "imagemUrl",
  "imagem_url",
  "imagemCapa",
  "urlImagem",
  "url_imagem",
  "foto",
  "fotoUrl",
  "foto_url",
  "capa",
  "capaUrl",
  "capa_url",
  "thumbnail",
  "thumb",
  "image",
  "imageUrl",
  "image_url",
  "img",
  "imgUrl",
  "banner",
  "midia",
  "arquivo",
  "secure_url",
  "url",
];

function resolverUrl(valor) {
  if (!valor) return "";
  if (Array.isArray(valor)) return resolverUrl(valor[0]);
  if (typeof valor === "object") {
    return resolverUrl(
      valor.secure_url ||
        valor.url ||
        valor.src ||
        valor.path ||
        valor.caminho ||
        valor.location ||
        "",
    );
  }
  const s = String(valor).trim();
  if (!s) return "";
  if (/^(https?:|data:|blob:)/i.test(s)) return s;
  if (s.startsWith("//")) return "https:" + s;
  return API_BASE + "/" + s.replace(/^\/+/, "");
}

const jaAvisado = new Set();

export function pickImagem(obj) {
  if (!obj || typeof obj !== "object") return "";
  for (const campo of CAMPOS_IMAGEM) {
    const url = resolverUrl(obj[campo]);
    if (url) return url;
  }
  // Diagnóstico: mostra uma vez, em dev, quais campos o registro realmente tem.
  if (import.meta.env?.DEV) {
    const assinatura = Object.keys(obj).sort().join(",");
    if (!jaAvisado.has(assinatura)) {
      jaAvisado.add(assinatura);
      console.warn(
        "[img] nenhum campo de imagem reconhecido. Campos disponíveis:",
        Object.keys(obj),
      );
    }
  }
  return "";
}

// Nome da categoria de uma notícia, cobrindo os três formatos possíveis:
// objeto aninhado ({ categoria: { nome } }), string solta, ou apenas o id
// (resolvido pelo mapa vindo de GET /categorias).
export function nomeCategoria(noticia, catMap) {
  const aninhado = pick(noticia?.categoria, ["nome", "titulo"], "");
  if (aninhado) return aninhado;
  if (typeof noticia?.categoria === "string" && noticia.categoria)
    return noticia.categoria;
  const direto = pick(noticia, ["categoriaNome", "categoria_nome"], "");
  if (direto) return direto;
  const id = pick(
    noticia,
    ["categoriaId", "categoria_id", "idCategoria", "id_categoria"],
    null,
  );
  if (id !== null && catMap && catMap.has(String(id)))
    return catMap.get(String(id));
  return "";
}

// Constrói o mapa id -> nome a partir da resposta de GET /categorias.
export function mapaCategorias(lista) {
  const mapa = new Map();
  (lista || []).forEach((c) => {
    const id = pick(c, ["id", "_id"], null);
    const nome = pick(c, ["nome", "titulo"], "");
    if (id !== null && nome) mapa.set(String(id), nome);
  });
  return mapa;
}
/* ---------------------------------------------------------------------------
   Notícias — tempo relativo e mapeamento único
   ---------------------------------------------------------------------------
   Home, Notícias e Matéria mapeavam o mesmo objeto da API cada uma do seu
   jeito. Agora as três usam mapearNoticia().
   --------------------------------------------------------------------------- */

// Data pura ("2026-08-12") é lida como data local: em UTC ela voltaria um dia.
export function carimbo(raw) {
  if (!raw) return { ts: 0, temHora: false };
  const soData = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (soData) {
    const d = new Date(
      Number(soData[1]),
      Number(soData[2]) - 1,
      Number(soData[3]),
    );
    return { ts: Number.isNaN(d.getTime()) ? 0 : d.getTime(), temHora: false };
  }
  const d = new Date(raw);
  return { ts: Number.isNaN(d.getTime()) ? 0 : d.getTime(), temHora: true };
}

const MESES_CURTOS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function diasAtras(ts) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dia = new Date(ts);
  dia.setHours(0, 0, 0, 0);
  return Math.round((hoje.getTime() - dia.getTime()) / 86400000);
}

// "12 out"
export function diaCurto(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.getDate() + " " + MESES_CURTOS[d.getMonth()];
}

// Meta dos cards: "Agora há pouco", "Há 40 min", "Há 2 h", "Ontem",
// "Há 3 dias" e, acima de uma semana, "10 out".
export function quando({ ts, temHora }) {
  if (!ts) return "";
  if (temHora) {
    const min = Math.floor((Date.now() - ts) / 60000);
    if (min >= 0 && min < 5) return "Agora há pouco";
    if (min >= 0 && min < 60) return "Há " + min + " min";
    if (min >= 0 && min < 24 * 60) return "Há " + Math.floor(min / 60) + " h";
  }
  const dias = diasAtras(ts);
  if (dias <= 0) return "Hoje";
  if (dias === 1) return "Ontem";
  if (dias < 7) return "Há " + dias + " dias";
  return diaCurto(ts);
}

// Coluna de horário da linha do tempo: { hora: "14:32", dia: "Hoje" }.
export function marcaTempo({ ts, temHora }) {
  if (!ts) return { hora: "", dia: "" };
  const d = new Date(ts);
  const hora = temHora
    ? String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    : "";
  const dias = diasAtras(ts);
  const dia = dias <= 0 ? "Hoje" : dias === 1 ? "Ontem" : diaCurto(ts);
  return { hora, dia };
}

export function mapearNoticia(n, catMap) {
  const raw = pick(n, ["dataPublicacao", "createdAt", "data"], "");
  const c = carimbo(raw);
  return {
    id: pick(n, ["id", "_id"]),
    titulo: pick(n, ["titulo", "nome"], "Sem título"),
    resumo: pick(n, ["resumo", "descricaoCurta", "subtitulo"], ""),
    categoria: nomeCategoria(n, catMap),
    imagem: pickImagem(n),
    data: formatDate(raw),
    ts: c.ts,
    quando: quando(c),
    ...marcaTempo(c),
  };
}

// Mais recentes primeiro. A API tende a mandar assim, mas a tela não deve
// depender disso.
export function maisRecentes(lista) {
  return [...lista].sort((a, b) => b.ts - a.ts);
}

export function mapearPrograma(p) {
  const dias = pick(p, ["dias", "diasSemana"], "");
  const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const diasLabel = Array.isArray(dias)
    ? dias.map((d) => labels[normalizeDia(d)] || d).join(", ")
    : dias;
  const hi = formatHora(
    pick(p, ["horarioInicio", "horaInicio", "hora_inicio"], ""),
  );
  const hf = formatHora(pick(p, ["horarioFim", "horaFim", "hora_fim"], ""));
  return {
    id: pick(p, ["id", "_id"]),
    titulo: pick(p, ["titulo", "nome"], "Programa"),
    apresentador: pick(p, ["apresentador"], ""),
    descricao: pick(p, ["descricao", "resumo"], ""),
    imagem: pickImagem(p),
    horario: [diasLabel, hi && hf ? `${hi} – ${hf}` : hi]
      .filter(Boolean)
      .join(" · "),
  };
}
export function mapearGrade(lista, diaSelecionado) {
  return (lista || [])
    .map((p) => {
      const programa = p.programa || {};
      const hi = formatHora(
        pick(p, ["horarioInicio", "hora_inicio", "inicio"], ""),
      );
      const hf = formatHora(pick(p, ["horarioFim", "hora_fim", "fim"], ""));
      return {
        id: pick(p, ["id", "_id"]),
        programaId: pick(
          p,
          ["programaId", "programa_id"],
          pick(programa, ["id", "_id"], null),
        ),
        dia: normalizeDia(pick(p, ["diaSemana", "dia_semana", "dia"], null)),
        hi,
        titulo: pick(
          p,
          ["titulo", "nome"],
          pick(programa, ["titulo", "nome"], "Programa"),
        ),
        apresentador: pick(
          p,
          ["apresentador"],
          pick(programa, ["apresentador"], ""),
        ),
        imagem: pickImagem(p) || pickImagem(programa),
        horario: hi && hf ? `${hi} – ${hf}` : hi,
      };
    })
    .filter((p) => p.dia === null || p.dia === diaSelecionado)
    .sort((a, b) => String(a.hi).localeCompare(String(b.hi)));
}
export function autorNoticia(raw) {
  const autor = raw?.autor ?? raw?.colunista ?? raw?.usuario;
  if (typeof autor === "string") return autor;
  return pick(
    autor,
    ["nome", "name"],
    pick(raw, ["autorNome", "nomeAutor", "autor_nome"], ""),
  );
}
