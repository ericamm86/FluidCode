# PRD - FluidCode

## 1. Resumo

O FluidCode e uma aplicacao web para empresas de piscinas que transforma enderecos, fotos e referencias de imoveis em propostas visuais personalizadas com inteligencia artificial.

A experiencia permite apresentar ao cliente uma landing page exclusiva por token, com imagens realistas do terreno transformado com piscina, simulacoes de atmosfera, video demonstrativo, QR Code de acesso e chamadas para solicitacao de orcamento.

O objetivo principal e reduzir a dificuldade de vender um projeto que o cliente ainda nao consegue visualizar, substituindo orcamentos frios por uma experiencia comercial de alto impacto.

## 2. Objetivo do Produto

Criar uma experiencia digital responsiva e persuasiva para que empresas de piscinas apresentem propostas visuais personalizadas, qualifiquem leads e acelerem o fechamento comercial.

### Objetivos Especificos

- Transformar um endereco ou terreno em uma proposta visual com piscina.
- Exibir imagens geradas por IA com antes e depois do espaco.
- Criar paginas exclusivas por token para cada oportunidade comercial.
- Facilitar acesso por QR Code, link direto ou campanha.
- Capturar interesse do cliente por meio de chamadas para orcamento.
- Apoiar o time comercial com uma narrativa visual clara e convincente.
- Demonstrar possibilidades de upsell, como paisagismo, iluminacao, area gourmet e energia solar.

## 3. Problema

Empresas de piscinas vendem projetos caros antes que o cliente consiga enxergar o resultado final no proprio terreno. O comprador precisa imaginar uma obra complexa olhando para um quintal vazio, fotos genericas ou desenhos tecnicos.

Essa falta de visualizacao aumenta a inseguranca, alonga o ciclo de venda, reduz a urgencia do orcamento e torna a abordagem comercial mais fria.

## 4. Publico-Alvo

- Empresas de venda e instalacao de piscinas.
- Lojas e representantes comerciais do setor de lazer residencial.
- Times de vendas que prospectam por bairro, endereco ou lista de leads.
- Empresas que desejam aumentar ticket medio com upgrades de area externa.
- Clientes finais interessados em visualizar uma piscina no proprio terreno antes de comprar.

## 5. Proposta de Valor

O FluidCode transforma um endereco comum em uma proposta visual personalizada com IA. Em vez de pedir que o cliente imagine a piscina pronta, a empresa mostra o projeto no contexto do proprio imovel, criando desejo, reduzindo objecoes e gerando leads mais qualificados.

## 6. Escopo do MVP

### Incluido no MVP

- Landing page comercial responsiva.
- Rota principal de demonstracao em `/`.
- Rota demonstrativa por token em `/000000`.
- Rota dinamica para propostas em `/token/:token`.
- Hero visual com imagem gerada por IA.
- Secoes de proposta, beneficios, processo comercial e valor para a empresa.
- Simulador atmosferico com modos de manha, fim de tarde e noite com LEDs.
- Galeria de imagens geradas por IA.
- Video demonstrativo integrado.
- Conteudo de pitch comercial para venda da solucao.
- Prompts versionados para geracao de imagens.
- Scripts para gerar assets visuais e videos.
- Deploy preparado para Vercel.

### Fora do MVP

- Backend completo de autenticacao.
- Painel administrativo funcional para gestao de campanhas.
- Geracao automatica de QR Code real por token.
- Persistencia de leads em banco de dados.
- Integracao final com CRM.
- Pagamento online.
- Edicao visual do projeto pelo cliente.
- Calculo tecnico de obra ou engenharia.
- Diagnostico estrutural do terreno.
- Aplicativo mobile nativo.

## 7. Personas

### Persona 1: Gestor Comercial de Piscinas

Precisa aumentar a taxa de conversao e reduzir o tempo entre primeiro contato e pedido de orcamento. Quer uma ferramenta que ajude o time a vender mais visualmente.

### Persona 2: Vendedor Consultivo

Atende clientes que ainda nao conseguem imaginar o resultado da piscina pronta. Precisa mostrar uma proposta clara, bonita e facil de compartilhar.

### Persona 3: Cliente Final

Tem interesse em uma piscina, mas sente inseguranca sobre tamanho, posicao, luz, deck e valorizacao da area externa. Quer visualizar o projeto antes de avancar.

## 8. Jornadas Principais

### Jornada 1: Acessar Proposta por QR Code

1. A empresa envia um folder, anuncio ou mensagem com QR Code.
2. O cliente escaneia o QR Code.
3. O sistema abre a pagina exclusiva da proposta.
4. O cliente visualiza imagens do terreno transformado.
5. O cliente avanca para solicitar orcamento.

### Jornada 2: Ver Simulacao Visual do Terreno

1. O cliente acessa a landing page por token.
2. Visualiza o antes e depois do terreno.
3. Alterna entre estudos de manha, fim de tarde e noite.
4. Entende como piscina, deck, iluminacao e paisagismo valorizam o imovel.

### Jornada 3: Qualificar Lead Comercial

1. O cliente interage com a proposta visual.
2. A pagina apresenta chamada para orcamento.
3. O cliente demonstra interesse em avancar.
4. O time comercial recebe um lead com mais contexto e intencao.

### Jornada 4: Apresentar a Solucao para uma Empresa

1. A empresa acessa a demonstracao FluidCode.
2. Entende o problema comercial da venda sem visualizacao.
3. Visualiza os recursos de IA, token, QR Code e funil.
4. Avalia o potencial de uso em campanhas e prospeccao.

## 9. Requisitos Funcionais

### Paginas e Rotas

- RF-01: O sistema deve exibir a landing page principal em `/`.
- RF-02: O sistema deve exibir uma proposta demonstrativa em `/000000`.
- RF-03: O sistema deve aceitar rotas de proposta no formato `/token/:token`.
- RF-04: Rotas inexistentes devem redirecionar para `/`.

### Experiencia Visual

- RF-05: O sistema deve exibir imagem hero representando uma proposta de piscina com IA.
- RF-06: O sistema deve apresentar beneficios comerciais da solucao.
- RF-07: O sistema deve exibir uma secao de antes e depois.
- RF-08: O sistema deve exibir imagens geradas por IA a partir de assets locais.
- RF-09: O sistema deve exibir video demonstrativo integrado.

### Simulador Atmosferico

- RF-10: O sistema deve permitir alternar entre modos de manha clara, fim de tarde e noite com LEDs.
- RF-11: Cada modo deve exibir imagem antes, imagem depois, titulo e descricao.
- RF-12: A interface deve manter a comparacao visual clara em desktop e mobile.

### Proposta Comercial

- RF-13: O sistema deve explicar como o endereco vira proposta visual.
- RF-14: O sistema deve demonstrar o fluxo de QR Code ate pedido de orcamento.
- RF-15: O sistema deve destacar ganhos de venda visual, lead qualificado e operacao escalavel.
- RF-16: O sistema deve apresentar oportunidades de upsell na area externa.

### Geracao de Assets

- RF-17: O sistema deve manter prompts de geracao de imagens versionados no codigo.
- RF-18: O sistema deve permitir configurar endpoint de geracao de imagem via variavel de ambiente.
- RF-19: O sistema deve disponibilizar scripts para gerar imagens e videos promocionais.

## 10. Requisitos Nao Funcionais

- RNF-01: A interface deve ser responsiva em mobile, tablet e desktop.
- RNF-02: O layout nao deve apresentar overflow horizontal.
- RNF-03: A experiencia deve carregar corretamente em rotas diretas na Vercel.
- RNF-04: Assets visuais devem possuir textos alternativos quando aplicavel.
- RNF-05: O produto deve evitar uso de enderecos reais em imagens geradas para demonstracao.
- RNF-06: Imagens de demonstracao nao devem conter logos, marcas, textos legiveis ou dados pessoais.
- RNF-07: A aplicacao deve funcionar como SPA em React/Vite.
- RNF-08: O conteudo deve comunicar valor comercial sem prometer analise tecnica ou engenharia.
- RNF-09: Scripts de geracao devem usar configuracao de ambiente para endpoint e credenciais.
- RNF-10: O deploy deve ser compativel com Vercel.

## 11. Modelo de Dados Conceitual

### Proposta

- token
- endereco ou referencia do terreno
- status
- imagens geradas
- video demonstrativo
- dados de campanha
- createdAt
- updatedAt

### ImagemGerada

- id
- titulo
- prompt
- qualidade
- tamanho
- asset
- propostaToken
- createdAt

### Lead

- id
- nome
- telefone
- email
- mensagem
- propostaToken
- origem
- createdAt

## 12. Integracoes Principais

### Geracao de Imagem

- Endpoint padrao: `https://litellm.cogmo.com.br`.
- Variavel de ambiente: `VITE_IMAGEGEN_BASE_URL`.
- Modelo configuravel: `VITE_IMAGEGEN_MODEL`.
- Formato esperado: compatibilidade OpenAI/LiteLLM para geracao de imagens.

### Rotas Frontend

- `GET /`: demonstracao principal.
- `GET /000000`: proposta demonstrativa.
- `GET /token/:token`: proposta por token.

### Futuras APIs

- `POST /leads`: registra interesse em orcamento.
- `GET /proposals/:token`: retorna dados de uma proposta.
- `POST /proposals`: cria uma nova proposta.
- `POST /images/generate`: dispara geracao de assets por IA.

## 13. Criterios de Aceite

- CA-01: Usuario consegue acessar a pagina principal em producao.
- CA-02: Usuario consegue acessar `/000000` em producao.
- CA-03: Usuario consegue acessar uma rota `/token/:token` sem erro.
- CA-04: A landing page exibe o conceito FluidCode para venda de piscinas com IA.
- CA-05: O hero visual carrega corretamente.
- CA-06: O simulador atmosferico alterna entre manha, fim de tarde e noite.
- CA-07: Imagens de antes e depois carregam sem quebrar layout.
- CA-08: O video demonstrativo aparece na pagina.
- CA-09: Layout funciona em largura mobile sem quebra visual.
- CA-10: Rotas diretas funcionam corretamente na Vercel.
- CA-11: O README e o PRD descrevem o mesmo produto.

## 14. Metricas de Sucesso

- Taxa de visitantes que clicam em chamada para proposta ou orcamento.
- Taxa de leitura de QR Code por campanha.
- Tempo medio de permanencia na proposta.
- Percentual de usuarios que visualizam a galeria completa.
- Percentual de usuarios que assistem ao video demonstrativo.
- Taxa de conversao de proposta visual para pedido de orcamento.
- Numero de leads qualificados por campanha.
- Reducao do ciclo medio de venda.
- Aumento do ticket medio com upsells.

## 15. Riscos

- Imagens geradas por IA podem criar expectativas acima da viabilidade tecnica real.
- Demonstracoes com terrenos genericos podem nao representar casos especificos do cliente.
- Falta de backend pode limitar captura e acompanhamento real de leads no MVP.
- Geracao de imagens depende de endpoint externo e credenciais validas.
- Uso indevido de fotos ou enderecos reais pode gerar risco de privacidade.
- Video e imagens pesadas podem impactar performance em conexoes lentas.

## 16. Consideracoes de Privacidade

- Demonstracoes devem evitar enderecos reais, nomes de pessoas ou dados pessoais.
- Fotos enviadas por clientes, em versoes futuras, devem ter consentimento explicito.
- Imagens de terrenos reais nao devem ser reutilizadas em campanhas sem autorizacao.
- Leads capturados devem ser tratados conforme regras de privacidade aplicaveis.
- O produto deve deixar claro que as imagens sao propostas visuais e nao laudos tecnicos.

## 17. Roadmap

### Curto Prazo

- Remover ou separar telas legadas nao utilizadas.
- Criar formulario real de captura de lead.
- Gerar QR Code funcional por token.
- Melhorar conteudo do README e documentacao de uso.
- Otimizar peso de imagens e videos.

### Medio Prazo

- Criar painel de campanhas e propostas.
- Persistir leads e tokens em backend.
- Integrar com CRM ou webhook.
- Permitir upload de fotos do terreno pelo cliente.
- Gerar imagens personalizadas por proposta.

### Longo Prazo

- Criar motor de propostas com status comercial.
- Adicionar comparativos de pacotes e upgrades.
- Gerar relatorios por campanha.
- Criar area administrativa para empresas de piscinas.
- Integrar pagamentos, contratos ou assinatura da solucao.

## 18. Stack Tecnica

- Frontend: React, Vite, Tailwind CSS, React Router.
- UI: lucide-react e componentes React.
- Assets: imagens e videos locais em `public/fluidcode`.
- Geracao de imagem: LiteLLM/OpenAI-compatible endpoint.
- Scripts: Node.js para geracao de imagens e videos.
- Deploy: Vercel.

