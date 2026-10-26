---
name: "Rádio Top FM"
description: "Um portal editorial claro, com leitura regional e áudio sempre acessível."
colors:
  tfm-red: "#ed2d39"
  tfm-red-dark: "#bb1925"
  tfm-red-soft: "#fff1f2"
  tfm-gold: "#fff200"
  tfm-white: "#fff"
  tfm-black: "#171719"
  tfm-ink-3: "#29292d"
  tfm-light-bg: "#f5f5f4"
  tfm-light-text: "#202023"
  tfm-light-text-secondary: "#505056"
  tfm-light-text-muted: "#64646c"
  tfm-light-border: "#dddddf"
  tfm-border-strong: "#9c9ca4"
  tfm-on-dark-muted: "#ccccd2"
  tfm-focus: "#005fcc"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.125rem, 1.5rem + 3vw, 3.75rem)"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(27px, 2.4vw, 36px)"
    fontWeight: 720
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 720
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  article:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.4
  metadata:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1.65
  navigation:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.65
rounded:
  tfm-radius-sm: "4px"
  tfm-radius-md: "8px"
  tfm-radius-lg: "12px"
  circle: "50%"
spacing:
  tfm-space-1: "4px"
  tfm-space-2: "8px"
  tfm-space-3: "12px"
  tfm-space-4: "16px"
  tfm-space-5: "24px"
  tfm-space-6: "32px"
  tfm-space-7: "48px"
  tfm-space-8: "64px"
  tfm-gutter: "clamp(20px, 3vw, 40px)"
  tfm-section-y: "clamp(36px, 5vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.tfm-red-dark}"
    textColor: "{colors.tfm-white}"
    typography: "{typography.control}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.tfm-black}"
    textColor: "{colors.tfm-white}"
  button-secondary:
    backgroundColor: "{colors.tfm-white}"
    textColor: "{colors.tfm-light-text}"
    typography: "{typography.control}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "10px 18px"
  button-secondary-hover:
    backgroundColor: "{colors.tfm-light-bg}"
  input-field:
    backgroundColor: "{colors.tfm-white}"
    textColor: "{colors.tfm-light-text}"
    typography: "{typography.body}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "10px 12px"
  input-search:
    textColor: "{colors.tfm-light-text-muted}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "0 16px"
    width: "min(100%, 560px)"
  navigation:
    backgroundColor: "{colors.tfm-white}"
    textColor: "{colors.tfm-light-text}"
    typography: "{typography.navigation}"
  chip:
    backgroundColor: "{colors.tfm-light-bg}"
    textColor: "{colors.tfm-light-text-secondary}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "8px 16px"
  chip-selected:
    backgroundColor: "{colors.tfm-black}"
    textColor: "{colors.tfm-white}"
  news-card-title:
    textColor: "{colors.tfm-light-text}"
    typography: "{typography.card-title}"
  news-card-image:
    rounded: "{rounded.tfm-radius-sm}"
  radio-player:
    backgroundColor: "{colors.tfm-black}"
    textColor: "{colors.tfm-white}"
  player-play:
    backgroundColor: "{colors.tfm-gold}"
    textColor: "{colors.tfm-black}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
  player-play-hover:
    backgroundColor: "{colors.tfm-white}"
  schedule-live:
    backgroundColor: "{colors.tfm-red-soft}"
    textColor: "{colors.tfm-light-text}"
    padding: "20px 16px"
  error-state:
    backgroundColor: "{colors.tfm-light-bg}"
    textColor: "{colors.tfm-light-text-secondary}"
    rounded: "{rounded.tfm-radius-md}"
    padding: "24px"
---

# Design System: Rádio Top FM

## Overview

**Creative North Star: "Mesa editorial"**

Uma mesa editorial clara e organizada: branco para a leitura, grafite para dar peso à informação e vermelho para orientar ações. A hierarquia nasce de títulos, imagens, alinhamentos e réguas finas. O conjunto é profissional e próximo, com densidade de portal e espaço suficiente para distinguir o que importa.

A voz visual usa uma única família tipográfica. O áudio permanece acessível em uma faixa escura própria, com amarelo nos controles; o conteúdo editorial fica visível imediatamente. A identidade usa o nome e o arquivo original da Top FM, sem redesenhar a marca. A logo circular original recebida em `public/logo.png` foi integrada sem alteração; o fallback textual é apenas uma contingência de carregamento, não uma nova assinatura.

**Key Characteristics:**

- Leitura clara sobre branco, com títulos em grafite e divisores discretos.
- Archivo em toda a interface, com contraste de escala e peso.
- Vermelho original nas réguas; vermelho escuro em ações e editorias.
- Faixa de áudio persistente no fluxo flex, separada da área rolável.
- Superfícies planas, fotografias sem texto sobreposto e foco visível.

Este documento registra o código implementado. `src/index.css` e os estilos dos componentes são a fonte de verdade; o frontmatter consolida somente valores usados. Aliases de cor com o mesmo valor não viram novas primitivas. Os passos de espaçamento nomeados no CSS aparecem hoje principalmente como valores literais nos componentes. A composição específica do portal permanece em `.impeccable/surfaces/public-site.md`.

## Colors

A paleta combina papel branco, uma gradação curta de grafites, vermelho de marca e um amarelo associado ao rádio. Os valores normativos estão no frontmatter.

### Primary

- **Vermelho Top FM — `tfm-red`:** réguas do masthead, indicação da navegação ativa e separação superior do player. Mantém a cor original especificada no projeto.
- **Vermelho de ação — `tfm-red-dark`:** botões principais, links, editorias e títulos em hover sobre superfícies claras.
- **Vermelho de transmissão — `tfm-red-soft`:** fundo sutil da linha de programação que está no ar.

### Secondary

- **Amarelo de áudio — `tfm-gold`:** botão de reprodução, volume e estado de reprodução. Também aparece na seleção de texto e no link da faixa promocional escura, como já implementado.

### Neutral

- **Branco editorial — `tfm-white`:** fundo principal, campos e texto sobre superfícies escuras. Consolida também o alias de texto sobre escuro.
- **Grafite profundo — `tfm-black`:** faixa de áudio, faixa promocional, filtros selecionados e hover de ação principal. Consolida o alias usado no fundo do player.
- **Grafite de apoio — `tfm-ink-3`:** fundo de imagens na faixa escura.
- **Papel secundário — `tfm-light-bg`:** footer, campos agrupados, placeholders, estados e seções de apoio.
- **Tinta de leitura — `tfm-light-text`:** texto principal; corresponde ao alias de texto primário do CSS.
- **Tinta secundária — `tfm-light-text-secondary`:** resumos, descrições e apoio textual.
- **Tinta de metadados — `tfm-light-text-muted`:** datas, legendas, placeholders e informações de menor hierarquia.
- **Régua leve — `tfm-light-border`:** separações editoriais, listas e contornos de estrutura.
- **Contorno de controle — `tfm-border-strong`:** campos, botões secundários e outros elementos interativos.
- **Texto secundário sobre grafite — `tfm-on-dark-muted`:** descrição e estado inativo no áudio e na promoção.

### Functional

- **Azul de foco — `tfm-focus`:** anel de foco do teclado e contorno do campo de busca focado. Sua função é acessibilidade, sem disputar a identidade editorial.

**The Action Contrast Rule.** Use o vermelho escuro nas ações e nos textos pequenos sobre branco; preserve o vermelho original nas réguas e sinais de marca.

## Typography

**Display Font:** Archivo, com Arial e sans-serif como fallback.  
**Body Font:** Archivo, com os mesmos fallbacks.

Archivo é hospedada no projeto, em arquivos variáveis normal e itálico, com `font-display: swap`. A interface não possui uma segunda família para rótulos, números ou corpo de matéria. Títulos equilibram as linhas; horários usam números tabulares.

### Hierarchy

- **Display:** títulos de página. O título de matéria usa a mesma escala, com entrelinha mais fechada (1.12); em telas compactas assume o ajuste próprio da matéria (32px).
- **Headline:** manchete principal dos cards. Em telas até o breakpoint compacto do player e da leitura, usa o ajuste observado (29px).
- **Title:** títulos de seção, inclusive a faixa promocional.
- **Card title:** títulos dos cards editoriais regulares. A variante compacta usa título menor (17px), com entrelinha mais aberta (1.35); a lista de notícias usa título maior (23px), reduzido no celular (18px).
- **Body:** texto de interface, com boa abertura entre linhas.
- **Article:** texto de leitura longa, limitado a uma medida editorial (68ch). Em telas compactas passa a (18px), com entrelinha (1.75). Resumos de matéria usam escala fluida própria e ficam abaixo do título.
- **Label:** nome da editoria, com peso forte e vermelho de ação; a caixa das palavras é preservada.
- **Metadata:** datas e informações complementares, com tinta de metadados.
- **Control / navigation:** ações e navegação, com pesos intermediários; os rótulos continuam legíveis sem recorrer a caixa alta ou tracking expandido.

**The One Family Rule.** Construa a hierarquia com escala, peso e espaço dentro da Archivo; preserve a família única em títulos, leitura e controles.

## Layout

O container central tem largura máxima (1280px) e margens laterais fluidas definidas por `tfm-gutter`. Seções reutilizam `tfm-section-y`; a maior parte dos intervalos e preenchimentos segue os passos presentes no frontmatter, com ajustes editoriais locais. Texto institucional costuma limitar a medida (65ch); o corpo de matéria usa a medida própria de leitura. Imagens ficam em blocos separados dos títulos, preservando o texto sobre a superfície clara.

A aplicação ocupa a altura disponível da janela (`100dvh`, com fallback `100vh`) e usa uma coluna flex. A área do site é o item flex que rola; o player é seu irmão, com `flex-shrink: 0`. **O player nunca é um overlay:** sua própria altura reduz o espaço do conteúdo rolável. A faixa aceita erro e expansão do volume sem cobrir a página, respeita a safe area inferior e limita sua altura a metade da janela, com rolagem própria em situações extremas.

O masthead e a navegação fazem parte da área rolável. A navegação horizontal vira menu expansível abaixo do limite de desktop (900px); o painel aberto participa do fluxo. As grades diminuem suas colunas por tipo de conteúdo. Nos destaques, a manchete ocupa mais espaço que as notícias secundárias; no tamanho menor, a manchete passa a uma linha própria, enquanto as duas secundárias continuam lado a lado. Não converter essa escolha de uma superfície em uma regra para todas as grades.

Os pontos responsivos são específicos do componente e estão listados no sidecar. O ajuste mais recorrente para leitura, busca e player acontece em (640px); destaques mudam em (1100px) e (680px), e a grade de equipe usa etapas próprias. O carrossel determina um, dois, três ou quatro itens com os limites de largura de seu código, sem impor essa escala ao restante do site.

Controles principais preservam alvos de toque mínimos (44px). Campos de formulário têm altura mínima maior (48px). O texto aceita quebra em larguras estreitas; tabelas de matérias podem rolar horizontalmente dentro do próprio bloco. A impressão remove os controles de rádio e abre o fluxo da página para impressão contínua.

## Elevation & Depth

O sistema é plano e não usa `box-shadow` nem `text-shadow`. A profundidade vem da alternância entre branco, papel secundário e grafite, das réguas finas e da diferença de escala. Cards editoriais não recebem uma caixa elevada; botões e campos usam contornos legíveis. O foco é um contorno azul externo (3px), com afastamento padrão (4px); a busca envolve o conjunto inteiro com afastamento próprio (3px).

**The Flat Surface Rule.** Diferencie superfícies por cor, borda e espaço; não acrescente sombras a cards, menus ou ao player.

Movimento serve a estados: botões usam a transição curta do sistema; o carrossel usa transição horizontal e rotação pausável. Conteúdo editorial não depende de animação de entrada. A preferência por movimento reduzido remove transições dos controles e do carrossel, desativa a rotação automática e interrompe o giro visual de carregamento. As durações observadas estão no sidecar.

## Shapes

Os cantos são discretos: a escala pequena recorta imagens de notícias e o contorno de foco; a média organiza botões, campos, fotos de programas e retratos; a maior aparece em grupos de formulário, informação de programa e estados vazios. O círculo é reservado a reprodução e indicadores pequenos de estado. Filtros usam cantos médios, sem formato de pílula.

Fotografias editoriais usam proporções horizontais, principalmente (16:10) nos cards e (16:9) em destaques secundários e matérias. A variante compacta usa miniatura (88 × 72px); a lista de notícias reserva uma coluna de imagem (200px), reduzida a uma miniatura quadrada no celular (104px). O conteúdo permanece separado da imagem. Imagens institucionais podem usar (4:3), conforme o conteúdo. O logo original usa `object-fit: contain` e mantém suas proporções; não é recortado como fotografia.

As réguas editoriais e bordas de campos têm espessura (1px). O masthead começa com uma faixa de marca (4px); o player e o estado ativo da navegação usam réguas mais estreitas (3px). Ícones são SVGs de traço simples, com extremidades e junções arredondadas.

## Components

### Buttons

Claros e firmes, com rótulos diretos. O botão principal usa vermelho de ação e texto branco; seu hover usa grafite profundo. O secundário usa branco, contorno de controle e hover em papel secundário. Ambos usam cantos médios e altura mínima de toque. O foco segue o contorno global. Estados desabilitados mantêm o lugar no layout, reduzem opacidade (0.55) e indicam indisponibilidade. Os botões de contato usam um pequeno ajuste horizontal próprio, preservando a mesma linguagem.

### Chips and tags

Filtros de editoria usam fundo de papel secundário, texto secundário e borda inicialmente transparente. O hover torna o contorno visível; `aria-pressed="true"` combina grafite e branco. O texto de editoria dentro de um card é um rótulo simples, sem cápsula. Os dias da programação seguem a mesma lógica de seleção, com nome do dia e legenda quando disponível.

### Cards / Containers

Cards de notícia ficam diretamente no fundo da página. A fotografia vem antes do bloco de texto; editoria e data antecedem o título. O hover do link torna o título vermelho de ação e sublinhado, sem deslocar o card. A manchete amplia a hierarquia; a variante compacta coloca o texto e uma miniatura à direita. A lista de notícias usa imagem à esquerda, título e resumo; no celular reduz a imagem e omite o resumo. Metadados e resumo só ocupam espaço quando existem. Fotos ausentes usam o placeholder já implementado, com ícone SVG, sem fotografia inventada.

Grupos de formulário, programa atual e estado vazio usam papel secundário e os raios documentados. Estados de erro mantêm mensagem legível e recuperação quando existe uma ação disponível. O carregamento usa texto e indicador simples; não esconde a estrutura da interface.

### Inputs / Fields

Campos de contato têm fundo branco, contorno de controle, cantos médios, rótulos visíveis e preenchimento confortável. A área de mensagem permite redimensionamento vertical. O placeholder usa tinta de metadados e o cursor usa vermelho de ação. A busca combina ícone, campo sem borda interna e foco aplicado ao conjunto; ela mantém nome acessível além do placeholder. A implementação não introduz um sistema visual próprio de erro por campo.

### Navigation

A navegação de desktop é uma linha simples entre réguas, com links de altura mínima (52px). O item atual usa texto em vermelho de ação e régua inferior no vermelho original; hover muda a cor. O menu compacto é acionado por botão com estado expandido, fecha ao navegar ou pressionar Escape e devolve o foco ao acionador nesse último caso. Em larguras menores, seu conteúdo passa de duas colunas a uma. O atalho para o conteúdo aparece quando recebe foco.

### Radio player

Uma faixa de grafite sempre acessível, com regra superior vermelha e reprodução circular amarela. O título leva à programação; o subtítulo, estado e volume usam hierarquia secundária. O botão circular passa da dimensão de desktop para a dimensão compacta (44px); nesse tamanho, imagem e texto de estado saem da faixa principal e o botão de volume abre uma segunda linha dentro do próprio player. Escape fecha essa linha e devolve o foco. Erro de transmissão ocupa uma linha de texto própria, sem sobrepor o site. A reprodução não começa automaticamente e permanece ao trocar de rota.

### Schedule and program discovery

A grade de programação é uma lista com réguas, horário tabular, imagem, título e apresentador quando fornecido. O programa atual recebe fundo vermelho suave e indicador textual. No tamanho menor, a imagem é retirada e horário e informação ficam em duas colunas. O carrossel de programas usa controles explícitos, contador e pausa; sua rotação para com foco, ponteiro, aba oculta ou preferência por movimento reduzido.

## Do's and Don'ts

### Do:

- **Do** use Archivo e os papéis tipográficos documentados para construir a hierarquia.
- **Do** mantenha o vermelho original nas réguas e o vermelho escuro nos textos e ações sobre branco.
- **Do** preserve o player como faixa flex irmã da área rolável, deixando sua altura participar do layout.
- **Do** mantenha imagens e texto editorial em blocos separados, com espaço e divisores para organizar a leitura.
- **Do** preserve foco visível, nomes acessíveis, estados de seleção e controles de áudio utilizáveis no celular.
- **Do** mostre apenas os metadados, imagens e informações editoriais que existem na fonte.

### Don't:

- **Don't** transforme o player em uma barra fixa sobre o conteúdo ou compense uma sobreposição com altura presumida.
- **Don't** acrescente sombras, efeito de vidro ou animações de entrada ao sistema editorial plano.
- **Don't** substitua a marca por uma nova versão desenhada, recorte o logo ou invente fotografias para preencher lacunas.
- **Don't** crie uma segunda família tipográfica, filtros em pílula ou novos tons a partir dos tokens declarados sem uso.
- **Don't** use somente cor para comunicar seleção, foco, reprodução ou indisponibilidade.
- **Don't** remova as alternativas de pausa ou ignore a preferência por movimento reduzido.
