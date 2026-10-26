/* ---------------------------------------------------------------------------
   Stream ao vivo
   ---------------------------------------------------------------------------
   Cole aqui o endereço direto do áudio — o que termina em .mp3, .aac, /stream,
   /live ou /;  NÃO a página do player (socialradio.com.br/..., por exemplo),
   que é HTML e o <audio> não consegue tocar.

   Precisa ser https://. Como o site é servido por HTTPS, um endereço http://
   é bloqueado pelo navegador antes de qualquer requisição; o player avisa na
   tela quando detecta esse caso.

   Como descobrir: abra a página onde a rádio toca, F12 → aba Network → filtro
   "Media", dê play. A requisição que aparecer e ficar crescendo é o stream;
   clique com o botão direito → Copy → Copy link address.

   Centralizada aqui para o player não reiniciar quando outras partes do app
   (ex: dados do programa no ar) atualizam.
   --------------------------------------------------------------------------- */
export const RADIO_STREAM_URL = "https://streema.com/radios/Radio_Tupi_FM_101.3/";

export const CONTATOS_COMERCIAL = [
  { nome: "Amélia", tel: "5514996207325", telFormatado: "(14) 99620-7325" },
  { nome: "Sueli Sanches", tel: "5514996763536", telFormatado: "(14) 99676-3536" },
  { nome: "Wendel Simas", tel: "5514991811657", telFormatado: "(14) 99181-1657" },
  { nome: "Célio Marcos", tel: "5514935008771", telFormatado: "(14) 93500-8771" },
];

export const CONTATO_EVENTOS = {
  nome: "Hubiratan Marques",
  tel: "5514991109288",
  telFormatado: "(14) 99110-9288",
};

export const EMAIL_COMERCIAL = "comercial@topfmbauru.com.br";
export const ENDERECO = "Rua Araújo Leite, 36-63 — Bauru/SP";
export const TELEFONES_FIXOS = "(14) 3222-1155 · (14) 3227-0855";
export const INSTAGRAM_URL = "https://instagram.com/topfmbauru";
export const SITE_URL = "https://www.topfmbauru.com.br";

export const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const DIAS_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// WhatsApp do estúdio. Preencha para o botão aparecer no rodapé — vazio, o
// rodapé mostra só o Instagram (antes havia um número fictício no ar).
export const WHATSAPP_URL = "";

/* ---------------------------------------------------------------------------
   Promoção / campanha da home
   ---------------------------------------------------------------------------
   Conteúdo estático por enquanto. O componente PromoBand aceita as mesmas
   chaves como props, então trocar por dados de API depois é só passar o
   objeto vindo do backend no lugar deste — sem mexer no layout.
   --------------------------------------------------------------------------- */
export const PROMOCAO = {
  etiqueta: "Promoção Top FM",
  titulo: "Ingressos, brindes e experiências exclusivas",
  texto:
    "Toda semana a Top FM sorteia ingressos de shows, kits de parceiros e convites para os bastidores do estúdio. Fique de olho na programação e participe pelo Instagram.",
  cta: "Quero participar",
  href: INSTAGRAM_URL,
  imagem: "/estudio.jpg",
};