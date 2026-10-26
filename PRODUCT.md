# Rádio Top FM

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Leitores das notícias e ouvintes da Rádio Top FM Bauru, em desktop e celular.

## Product Purpose
Facilitar a leitura de notícias, a descoberta de conteúdos e o acesso à transmissão ao vivo.

## Capabilities and Constraints
React e React Router. Rotas /, /noticias, /noticias/:id, /programas, /programacao, /equipe, /quem-somos e /contato, além de 404. Notícias, categorias, equipe e grade consomem os contratos públicos existentes. Detalhe obtido pela lista pública. PlayerProvider permanece fora das rotas; nenhum autoplay. Preservar URLs, contratos, informações institucionais e contatos fornecidos no código.

## Brand Commitments
Nome e logo Top FM, proporções originais. Direção editorial, profissional, organizada; áreas claras de leitura, tipografia principal única, sem exageros. Vermelho #ed2d39, amarelo #fff200, preto e branco documentados em src/index.css. A logo circular original foi recebida em public.zip, inspecionada e integrada sem alterações; suas cores confirmam a direção adotada.

## Evidence on Hand
src, package.json, index.html e public fornecidos pelo usuário e integrados. Package.json preservado; lockfile gerado nesta validação por não ter sido enviado. Não inventar logo, fotografias, autoria, datas ou notícias. Dados artificiais somente em testes isolados identificados, nunca no frontend entregue. Referências Mobbin efetivamente visualizadas registradas no relatório. Build final com React 18 e Vite 5; assets originais conferidos em desktop, tablet e celular.

## Product Principles
1. Notícias chegam antes da chamada institucional.
2. O áudio acompanha a navegação sem iniciar sozinho.
3. Informações editoriais só aparecem quando fornecidas.
4. Estados de erro e recuperação são parte do produto.

## Accessibility & Inclusion
Navegação por teclado, foco visível, contraste AA, alvos de toque e preferência por movimento reduzido.

## Open Decisions
URL atual de rádio é página Streema e não foi substituída; reprodução real ainda não confirmada. Nenhuma publicação externa solicitada; entrega como frontend completo atualizado. Variáveis de ambiente e configuração de hospedagem do usuário não foram fornecidas nem alteradas.
