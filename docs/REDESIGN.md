# Redesign do portal público da Rádio Top FM

## Diagnóstico e contexto

O primeiro anexo continha somente `src`. Depois, o usuário forneceu `package.json`, `index.html` e `public.zip`; esses arquivos estão integrados nesta entrega. Foram examinados App, estilos globais, Home, Notícias, Matéria, Programas, Programação, Equipe, Quem Somos, Contato e 404; os componentes de navegação, notícia, programação e player; PlayerContext, serviços de API, hooks e utilitários.

A identidade documentada no CSS combinava vermelho `#ed2d39`, amarelo `#fff200`, preto e branco. A logo circular original foi recebida posteriormente e inspecionada: vermelho, amarelo, preto e branco confirmam a direção adotada. O redesenho mantém o arquivo original e suas proporções, usa fundos claros na leitura e concentra o amarelo em ações pontuais. O vermelho original permanece como acento; uma variante mais escura é usada em texto e botões para contraste.

O principal problema editorial era a competição entre a apresentação institucional e as notícias, somada a muitas linguagens de fonte, efeitos e tratamentos de cards. A solução dá maior peso à manchete, reduz o espaço institucional no início da Home e separa claramente notícias principais, secundárias e listagens.

## Fluxo Impeccable

Foi utilizada a versão instalada **4.3.1**: contexto, diagnóstico/critique, shape, implementação de componentes globais e páginas, audit e polish. O briefing detalhado do usuário orientou a direção editorial e a implementação direta. O contexto foi registrado em `PRODUCT.md` e o planejamento em `.impeccable/surfaces/public-site.md`.

O gerador de challengers do fluxo de direção estava indisponível. A seleção foi realizada de modo degradado, com o briefing e as referências Mobbin visualizadas, sem quality boards gerados e sem alegar aprovação de uma composição visual inexistente.

A primeira inspeção visual gerou três ajustes materiais: retirar a sobreposição do player, dar largura adequada aos contatos em tablet/celular e usar uma família de fonte deliberada. O acabamento adotou uma área rolável separada da faixa do player, contato em uma coluna abaixo de 900px e Archivo variável hospedada no próprio projeto. A documentação também identificou um alias de NewsCard que impedia a variante de lista de usar seu próprio estilo; o alias foi removido e essa página foi verificada novamente.

O verdict pass final pontuou os três achados como **resolved**, com disposição **ship restrita a esses três itens**. O revisor inicial não estava mais disponível após a retomada; um novo revisor isolado verificou as capturas e a lista de correções. Isso não é apresentado como aprovação irrestrita do site inteiro.

O detector técnico foi executado uma vez e retornou `[]`. Como o resultado não apresentou um inventário de regras e arquivos examinados, ele não foi tratado como evidência de cobertura técnica completa. As conclusões técnicas se apoiam na inspeção do código, build e testes de navegador registrados separadamente.

## Referências Mobbin efetivamente visualizadas

As cinco telas abaixo foram acessadas visualmente pelo Mobbin. Foram adaptados padrões de hierarquia e interação, não marcas, imagens, textos ou estilos completos desses produtos.

| Referência | Link consultado | Padrão adaptado |
| --- | --- | --- |
| The New York Times — Home web | https://mobbin.com/screens/84de2f35-5ba4-4abc-a212-53815c6a90ed | Navegação editorial, régua fina e diferença clara de peso entre manchete e notas secundárias. |
| Ghost / News Wave — Home web | https://mobbin.com/screens/756cbee5-cff7-4fe2-9b56-0c6d4e5a6baf | Manchete ampla, coluna secundária e bloco compacto de outras notícias. |
| The New York Times — Matéria web | https://mobbin.com/screens/b0f3f79a-14c6-478f-9222-01659b771ac5 | Coluna de leitura contida, título dominante e metadados subordinados. |
| Poolsuite FM — Áudio iOS | https://mobbin.com/screens/ba63a238-8c6e-4ec0-8a24-0ad76f4eb201 | Separação entre informações da faixa/programa e controles de reprodução com alvos claros. A estética retrô não foi reproduzida. |
| South China Morning Post — Matéria iOS | https://mobbin.com/screens/107ffdcc-0051-4cdd-b493-120005515036 | Ordem de leitura e hierarquia de título, resumo, imagem e metadados em uma coluna. A tela consultada tinha uma sobreposição de tutorial, que não foi adaptada. |

## Implementação por área

**Sistema global.** Tokens centralizados em `src/index.css` para cores, tipografia, escalas, espaços, bordas e estados. Archivo é a única família principal, com pesos variáveis e itálico. Ícones SVG seguem o mesmo traço. Foco visível, seleção, estados de carregamento e contraste foram uniformizados. Efeitos decorativos e animações de entrada que ocultavam conteúdo foram retirados.

**Cabeçalho e navegação.** Masthead compacto, logo sem distorção, links ativos e acesso direto ao áudio. O menu mobile é uma expansão no fluxo, fecha por Escape e devolve foco ao botão. Há atalho para pular ao conteúdo e o foco acompanha a navegação entre páginas.

**Home.** A primeira seção é jornalística: uma manchete, duas secundárias e até três notas, conforme o volume disponível. As últimas notícias usam os itens seguintes da lista, sem repetir os destaques. Informações do programa atual e conteúdos complementares aparecem abaixo.

**Notícias.** Busca, filtros por categoria e botão de carregamento preservados. Destaques e listagem usam subconjuntos distintos. Imagem, categoria, data, título e resumo têm hierarquia consistente. Estados de erro, vazio e ausência de resultado oferecem uma saída clara.

**Matéria.** Largura de texto de 68ch, título e resumo destacados, imagem sem texto sobreposto, metadados condicionais e tempo estimado a partir do próprio corpo. Conteúdo HTML é traduzido por uma lista explícita de elementos permitidos; scripts, manipuladores inline e URLs executáveis não são injetados. Links internos mantêm React Router e o áudio; links externos abrem separadamente. Compartilhamento e relacionadas foram mantidos. A cópia apresenta um endereço selecionável quando o navegador nega a área de transferência.

**Programação, programas e equipe.** Grade organizada por dia e horário, com estado ativo acessível. O destaque do programa no ar aparece somente no dia atual. Programas e pessoas têm textos legíveis abaixo das imagens. O carrossel preserva controles, arraste e rotação, com pausa explícita e respeito a movimento reduzido.

**Quem Somos, Contato e 404.** Mesmo sistema visual, conteúdo institucional e destinos de contato preservados. Os campos de contato usam validação nativa. A página 404 oferece retorno ao início e às notícias.

**Player.** `PlayerProvider` permanece acima de `BrowserRouter`. O elemento de áudio é estável durante a navegação. O player ocupa uma linha flex independente do conteúdo, inclusive quando o volume ou uma mensagem de erro aumenta sua altura. Não há autoplay. Foram mantidos play/pause, mute, volume, carregamento e quatro tentativas de reconexão com intervalos crescentes. O volume mais recente é respeitado na retomada; pausa cancela temporizadores; eventos de espera prolongada também podem iniciar a recuperação. Um play rejeitado não exige um clique extra de pausa antes de tentar novamente.

## Contratos e dados

`services/api.js`, `config/radio.js` e `main.jsx` foram comparados byte a byte com o anexo e permanecem iguais. As rotas públicas e endpoints originais foram preservados. Não foi criado endpoint de detalhe: a matéria continua sendo localizada na lista pública.

Nenhum backend, notícia, contato, URL configurada ou dado real foi alterado. Os seis endpoints existentes foram consultados somente para leitura e responderam HTTP 200 durante a análise. Na amostra consultada havia seis notícias e três categorias; programação semanal, programas e equipe estavam vazios. A grade preenchida e grandes volumes de notícias foram testados com fixtures identificadas e isoladas, ausentes da entrega.

## Verificações e limites

Os resultados concretos estão em `VERIFICACAO.json`. A inspeção incluiu desktop, tablet e celular; navegação por teclado; foco e contraste automatizado; títulos longos; imagens ausentes; carregamento, erro e vazio; busca, filtros e paginação; compartilhamento; grade; formulário; e eventos simulados de áudio durante a navegação.

A primeira rodada usou um scaffold temporário, pois os arquivos de raiz não estavam disponíveis. Após o recebimento, o projeto foi instalado e validado com o `package.json` original: React 18.3.1 e Vite 5.4.21. O lockfile foi gerado respeitando as faixas declaradas; não é uma cópia de um lockfile original. Foi acrescentada configuração mínima do plugin React já declarado. O script `npm run build` passou. O package recebido não declara scripts de lint ou teste; as verificações de navegador usaram um harness separado. Chromium em emulação de viewport não representa uma validação em Safari/iOS ou dispositivos físicos. O axe auxilia a detecção, mas não certifica acessibilidade completa nem substitui uso com leitor de tela.

Logo, favicon, ícone de instalação e fotografias institucionais originais foram incluídos. A logo carregou no cabeçalho e no rodapé, e as 17 imagens da página Quem Somos carregaram nas quatro larguras verificadas. Os arquivos de `public` foram comparados byte a byte com o ZIP enviado. A revisão visual independente aprovou a integração dos assets no escopo examinado; a captura do rodapé mostra apenas parte da marca devido à posição de rolagem, enquanto o DOM confirmou carregamento e uso de `object-fit: contain`.

A URL configurada do áudio aponta para uma página do Streema e foi preservada. Não há confirmação de transmissão real: continuidade, volume, erro e recuperação foram testados por eventos de mídia simulados. Não foram enviadas mensagens por e-mail, WhatsApp ou redes sociais durante os testes.

A divergência preexistente entre o fallback da API e o fallback de imagens relativas foi mantida para respeitar a instrução de não trocar URLs configuradas. A configuração de `VITE_API_URL` deve ser a mesma usada no projeto original.

## Origem dos assets

- Logo e imagens institucionais: arquivos originais de `public.zip`, fornecidos pelo usuário, sem alteração de pixels. Origem e hashes em `ASSETS.json`.
- Imagens jornalísticas: continuam vindo da API, sem cópias incorporadas ao frontend.
- Archivo: arquivos WOFF2 normal e itálico do pacote `@fontsource-variable/archivo`, com licença SIL Open Font License incluída em `src/assets/fonts/Archivo-LICENSE.txt`.
- Ícones: SVGs geométricos definidos em `components/Icon/Icon.jsx`.
- Nenhuma fotografia ou logo foi gerada ou redesenhada. Capturas de teste e dados sintéticos não fazem parte do pacote entregue.

## Integração dos arquivos complementares

`package.json` permanece idêntico ao enviado. `index(1).html` foi normalizado para `index.html`, com título, descrição e ícones preservados. O carregamento Google Fonts das famílias antigas foi removido, porque Archivo já é servida localmente, e a cor de interface do navegador foi ajustada para branco. A prioridade de imagem foi escrita como atributo `fetchpriority`, compatível com React 18, eliminando um aviso observado durante a integração.

O pacote agora inclui `src`, `public`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js` e documentação. `node_modules`, `dist`, capturas, fixtures e dados de teste ficam fora da entrega. O build gera `dist` no ambiente de execução do usuário.
