# Rádio Top FM — frontend redesenhado

Redesign implementado em React, com notícias em primeiro plano, leitura clara e transmissão persistente durante a navegação. Este pacote inclui o frontend completo: `src`, `public`, `index.html`, `package.json`, lockfile e configuração do Vite.

## Executar

Extraia o ZIP, abra o terminal na pasta que contém `package.json` e execute:

```bash
npm ci
npm run dev
```

Para gerar a versão de produção e conferi-la localmente:

```bash
npm run build
npm run preview
```

O build gera a pasta `dist`. Na hospedagem, as rotas do React Router precisam retornar `index.html` quando não correspondem a um arquivo estático.

Se for aplicar em uma cópia do projeto existente, faça backup e preserve suas variáveis de ambiente, especialmente `VITE_API_URL`. Nenhum `.env` foi inventado ou incorporado ao pacote.

O `package.json` enviado foi preservado byte a byte. Como não veio um lockfile, `package-lock.json` foi gerado na instalação, respeitando as faixas de versão existentes. A configuração adicionada em `vite.config.js` habilita o plugin React já declarado pelo projeto. A fonte Archivo está incluída localmente, com licença; o HTML mantém título, descrição e ícones originais, remove o carregamento redundante das fontes antigas e usa a cor clara do novo layout.

## O que mudou

- Home editorial com manchete principal, secundárias e lista de últimas notícias sem repetir os destaques; programação, programas, promoção e equipe como conteúdo complementar.
- Notícias com busca, categorias, carregamento progressivo, resultados vazios e hierarquia consistente. A busca continua ignorando acentos.
- Matéria com título, resumo, imagem, coluna de leitura de 68ch, formatação segura de HTML, compartilhamento e relacionadas. Autoria e datas aparecem somente quando disponíveis.
- Cabeçalho, menu mobile, rodapé, grade semanal e todas as páginas com o mesmo sistema visual.
- Player compacto em uma faixa própria da tela. Conteúdo e rodapé rolam acima dele, sem sobreposição. Volume acessível no celular e áudio sem autoplay.
- Melhorias de recuperação do player, cancelamento de requisições, imagens ausentes, foco e navegação por teclado.

## Compatibilidade preservada

`src/services/api.js`, `src/config/radio.js` e `src/main.jsx` permanecem idênticos aos arquivos recebidos. Nenhum endpoint ou endereço configurado foi trocado. O detalhe de notícia continua sendo obtido pela lista pública. O `PlayerProvider` permanece fora do roteador e das rotas.

Rotas: `/`, `/noticias`, `/noticias/:id`, `/programas`, `/programacao`, `/equipe`, `/quem-somos`, `/contato` e página 404.

## Assets e integração

- **Logo:** o arquivo original de `public.zip` está incluído em `public/logo.png`, sem alterações. A marca circular, as cores e as proporções foram conferidas no cabeçalho. O fallback textual só aparece se houver falha de carregamento.
- **Imagens institucionais:** `estudio.jpg`, `on-air.jpg`, `cobertura.png` e `bastidores-01.jpg` a `bastidores-14.jpg` estão incluídos. As 17 imagens da página Quem Somos carregaram nos quatro tamanhos examinados. Os outros assets enviados também foram preservados, mesmo quando não usados pelo novo layout.
- **Transmissão:** a URL recebida aponta para uma página do Streema. Foi mantida. A reprodução real não foi confirmada; os testes do player simulam os eventos de mídia. A emissora precisa confirmar o endereço direto do stream para uma validação real.
- **Imagens relativas da API:** o fallback original de `utils/format.js` permanece `http://localhost:3000`, enquanto a API tem outro fallback. Com `VITE_API_URL` definido corretamente, ambos usam a configuração. Essa diferença preexistente não foi alterada para respeitar os endereços recebidos.

## Documentação e validação

- `PRODUCT.md`: contexto e restrições do produto.
- `DESIGN.md`: tokens e regras do sistema visual.
- `.impeccable/design.json`: documentação complementar para o Impeccable.
- `docs/REDESIGN.md`: diagnóstico, decisões, referências Mobbin e limites da entrega.
- `docs/VERIFICACAO.json`: resultados e escopo dos testes executados.
- `docs/ASSETS.json`: origem e integridade dos arquivos originais de `public`.

O build final foi executado neste projeto com o `package.json` enviado: React 18.3.1 e Vite 5.4.21. A validação incluiu 9 rotas em larguras de 320 a 1440px, estados e interações, assets originais e eventos simulados de áudio. As 18 análises automatizadas com axe na rodada de integração não encontraram violações nos cenários examinados. Não há scripts de lint ou teste declarados no `package.json` recebido. Fixtures, notícias artificiais, capturas e dependências de teste não estão no frontend entregue.
