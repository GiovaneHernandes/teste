# Portal público — direção e planejamento
Modo: Read. Briefing explícito do usuário resolve público, direção e escopo; avançar diretamente à implementação solicitada.

## Direction contract
THESIS: notícias regionais no primeiro viewport, com manchete dominante e chamada de rádio subordinada ao conteúdo.
OWN-WORLD: branco e grafite, vermelho existente em ações, amarelo existente em detalhes de áudio; uma família sans-serif, régua editorial e imagens sem sobreposição de texto.
STORY: localizar manchetes, selecionar editoria, ler a matéria, ouvir a rádio durante a navegação e consultar a grade.
FIRST VIEWPORT: masthead compacto com logo original, navegação horizontal, título Notícias em destaque, manchete em metade da área, duas secundárias e lista lateral; no celular, manchete seguida pelas secundárias compactas. Player em faixa flex própria no rodapé da janela, fora da área de rolagem do conteúdo.
FORM: leitura editorial, quarto candidato, seed 3c8ff566. Candidatos fundamentados: jornal regional, caderno de notícias, revista digital, mesa editorial com manchete e pauta lateral, índice por editoria, agenda de rádio, boletim de atualização. O serviço de challengers indisponível; seleção degradada sem quality boards. Direção fixada pelo briefing e pelas cinco telas Mobbin vistas; nenhuma rodada de aprovação adicional.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Shape
- Principal tarefa: ler notícias; secundárias: ouvir, descobrir programas, consultar grade e entrar em contato.
- Home: manchete + duas secundárias + três resumos; últimas sem repetir destaques; grade, programas, promoção e equipe abaixo.
- Notícias: busca e categorias preservadas; três destaques e lista seguinte disjuntos; paginação também nos resultados.
- Matéria: título, resumo, metadados disponíveis, imagem, texto em 68ch, compartilhamento e relacionadas.
- Global: menu acessível; estados legíveis; controles de player e volume em todos os tamanhos; preservar contratos e configurações.

## Limites de evidência
Package.json, index.html e public originais foram fornecidos após a primeira entrega e integrados. Build executado com React 18 e Vite 5 do projeto; lockfile gerado respeitando as faixas recebidas. Logo e imagens originais verificadas em layout, sem alteração dos arquivos. Não inserir dados artificiais no src de entrega. Nenhum raster novo foi gerado. Áudio real permanece sem confirmação; os testes de continuidade e recuperação usam eventos de mídia simulados.
