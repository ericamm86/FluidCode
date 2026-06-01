# PRD - FluidCode

## 1. Resumo

O FluidCode e uma aplicacao web fullstack para monitoramento emocional diario. O produto permite que usuarios registrem humor, estresse, energia e anotacoes, acompanhem graficos e historico, e usem a camera do navegador para estimar emocoes em tempo real.

O objetivo principal e ajudar o usuario a perceber padroes emocionais ao longo do tempo por meio de registros simples, indicadores claros e visualizacoes acessiveis.

## 2. Objetivo do Produto

Criar uma experiencia digital simples, responsiva e segura para que usuarios acompanhem sua saude emocional de forma recorrente.

### Objetivos Especificos

- Facilitar o registro diario de estado emocional.
- Exibir tendencias de humor, estresse e energia.
- Permitir consulta rapida ao historico emocional.
- Oferecer leitura facial local como apoio complementar ao registro.
- Funcionar bem em celular, tablet e desktop.

## 3. Problema

Pessoas costumam perceber mudancas de humor, estresse e energia, mas raramente mantem um historico estruturado. Sem registros, fica dificil identificar padroes, momentos de crise, dias de maior desgaste ou sinais de melhora.

## 4. Publico-Alvo

- Pessoas interessadas em autocuidado e autoconhecimento.
- Estudantes e profissionais com rotinas intensas.
- Usuarios que desejam acompanhar estresse, energia e humor ao longo do tempo.
- Pessoas que querem visualizar seu historico emocional de forma simples.

## 5. Proposta de Valor

O FluidCode transforma registros emocionais diarios em indicadores visuais, permitindo que o usuario entenda melhor sua rotina emocional sem precisar de planilhas, diarios complexos ou ferramentas clinicas.

## 6. Escopo do MVP

### Incluido no MVP

- Cadastro de usuario.
- Login e logout.
- Protecao de rotas autenticadas.
- Registro manual de humor, estresse, energia, data e anotacao.
- Dashboard com indicadores principais.
- Graficos de evolucao emocional.
- Historico de registros.
- Leitura facial pela camera.
- Registro da emocao detectada pela camera.
- Layout responsivo.
- Deploy em Vercel.

### Fora do MVP

- Diagnostico medico ou psicologico.
- Chat com profissional.
- Relatorios clinicos.
- Aplicativo mobile nativo.
- Notificacoes push.
- Compartilhamento de registros.
- Multi-idioma.
- Integracao com smartwatch ou sensores externos.

## 7. Personas

### Persona 1: Usuario em Rotina Intensa

Precisa entender como seu estresse e energia variam durante a semana. Quer uma ferramenta rapida para registrar o dia e consultar tendencias.

### Persona 2: Usuario de Autoconhecimento

Quer observar padroes emocionais e escrever anotacoes simples sobre eventos que impactaram seu humor.

### Persona 3: Usuario Curioso Sobre Leitura Facial

Quer comparar sua percepcao emocional com uma estimativa feita pela camera, sem enviar imagens para o servidor.

## 8. Jornadas Principais

### Jornada 1: Criar Conta

1. Usuario acessa o site.
2. Clica em criar conta.
3. Preenche nome, email e senha.
4. Sistema cria usuario.
5. Usuario e autenticado.
6. Usuario entra no Dashboard.

### Jornada 2: Fazer Login

1. Usuario acessa a tela de login.
2. Informa email e senha.
3. Sistema valida credenciais.
4. Usuario entra no Dashboard.

### Jornada 3: Registrar Emocao Manual

1. Usuario acessa o Dashboard.
2. Ajusta humor, estresse e energia.
3. Seleciona a data.
4. Escreve uma anotacao opcional.
5. Salva o registro.
6. Dashboard e historico sao atualizados.

### Jornada 4: Usar Camera Emocional

1. Usuario acessa o Dashboard.
2. Clica em ativar camera.
3. Autoriza o uso da webcam.
4. Sistema detecta expressao facial no navegador.
5. Usuario visualiza emocao estimada e confianca.
6. Usuario salva a emocao detectada.

### Jornada 5: Consultar Historico

1. Usuario acessa Historico.
2. Visualiza registros por data.
3. Compara humor, estresse, energia e anotacoes.

## 9. Requisitos Funcionais

### Autenticacao

- RF-01: O sistema deve permitir cadastro com nome, email e senha.
- RF-02: O sistema deve impedir cadastro com email ja existente.
- RF-03: O sistema deve permitir login com email e senha.
- RF-04: O sistema deve informar erro quando email ou senha forem invalidos.
- RF-05: O sistema deve armazenar token no navegador.
- RF-06: O sistema deve permitir logout.
- RF-07: Rotas privadas devem exigir autenticacao.

### Registro Emocional

- RF-08: O usuario deve registrar humor em escala de 1 a 10.
- RF-09: O usuario deve registrar estresse em escala de 1 a 10.
- RF-10: O usuario deve registrar energia em escala de 1 a 10.
- RF-11: O usuario deve informar a data do registro.
- RF-12: O usuario deve poder adicionar anotacao opcional.
- RF-13: O sistema deve salvar registros associados ao usuario autenticado.
- RF-14: O sistema deve validar campos obrigatorios e intervalos numericos.

### Dashboard

- RF-15: O sistema deve exibir total de registros.
- RF-16: O sistema deve exibir media emocional.
- RF-17: O sistema deve exibir nivel de caos.
- RF-18: O sistema deve exibir media de energia.
- RF-19: O sistema deve exibir grafico semanal.
- RF-20: O sistema deve exibir grafico mensal.
- RF-21: O sistema deve exibir historico emocional em grafico.
- RF-22: O sistema deve exibir crises por horario.
- RF-23: O usuario deve conseguir atualizar os dados do Dashboard.

### Historico

- RF-24: O sistema deve listar registros do usuario autenticado.
- RF-25: Cada registro deve mostrar data, humor, estresse, energia e anotacao.
- RF-26: O usuario nao deve acessar registros de outros usuarios.

### Camera Emocional

- RF-27: O sistema deve carregar modelos de reconhecimento facial.
- RF-28: O usuario deve poder ativar e desligar a camera.
- RF-29: A leitura facial deve ocorrer localmente no navegador.
- RF-30: O sistema deve exibir emocao atual detectada.
- RF-31: O sistema deve exibir percentual de confianca.
- RF-32: O usuario deve poder salvar uma leitura facial como registro emocional.
- RF-33: O sistema deve exibir mensagem quando a camera nao for autorizada.

## 10. Requisitos Nao Funcionais

- RNF-01: A interface deve ser responsiva em telas mobile, tablet e desktop.
- RNF-02: O layout nao deve apresentar overflow horizontal.
- RNF-03: A aplicacao deve funcionar em HTTPS em producao.
- RNF-04: Senhas devem ser armazenadas com hash.
- RNF-05: Autenticacao deve usar JWT.
- RNF-06: A API deve responder em JSON.
- RNF-07: A leitura facial nao deve enviar imagem ou video ao backend.
- RNF-08: O sistema deve exibir erros compreensiveis ao usuario.
- RNF-09: O frontend deve funcionar corretamente em rotas diretas na Vercel.
- RNF-10: O backend deve usar banco persistente em producao.

## 11. Modelo de Dados

### User

- id
- nome
- email
- senha
- createdAt
- updatedAt

### RegistroEmocional

- id
- humor
- estresse
- energia
- anotacao
- data
- userId
- createdAt
- updatedAt

## 12. APIs Principais

### Autenticacao

- `POST /register`: cria usuario.
- `POST /login`: autentica usuario.
- `GET /profile`: retorna perfil autenticado.

### Emocoes

- `POST /emocao`: cria registro emocional.
- `GET /emocoes`: lista registros do usuario.
- `GET /dashboard`: retorna resumo e dados para graficos.

## 13. Criterios de Aceite

- CA-01: Usuario consegue criar conta em producao.
- CA-02: Usuario consegue fazer login em producao.
- CA-03: Usuario consegue sair da conta.
- CA-04: Usuario consegue salvar registro manual.
- CA-05: Dashboard atualiza apos novo registro.
- CA-06: Historico exibe registros salvos.
- CA-07: Usuario nao autenticado e redirecionado para login.
- CA-08: Camera pode ser ativada com permissao do navegador.
- CA-09: Registro por emocao detectada e salvo corretamente.
- CA-10: Rotas `/login`, `/cadastro`, `/historico` e `/` funcionam em producao.
- CA-11: Layout funciona em largura mobile sem quebra visual.

## 14. Metricas de Sucesso

- Taxa de cadastro concluido.
- Taxa de login bem-sucedido.
- Numero medio de registros por usuario por semana.
- Percentual de usuarios que criam pelo menos um registro.
- Percentual de usuarios que retornam apos 7 dias.
- Uso da camera emocional.
- Erros de API por rota.
- Tempo medio ate o primeiro registro.

## 15. Riscos

- Banco remoto indisponivel pode impedir login, cadastro e registros.
- Permissao de camera pode ser negada pelo usuario.
- Modelos de reconhecimento facial dependem de carregamento externo.
- Leitura facial pode gerar interpretacoes imprecisas.
- Usuarios podem interpretar a ferramenta como diagnostico, o que deve ser evitado.

## 16. Consideracoes de Privacidade

- Imagens da camera nao devem ser enviadas ao servidor.
- Senhas devem ser protegidas com hash.
- Registros emocionais pertencem apenas ao usuario autenticado.
- O produto deve deixar claro que nao substitui acompanhamento profissional.

## 17. Roadmap

### Curto Prazo

- Melhorar mensagens de erro.
- Adicionar edicao e exclusao de registros.
- Adicionar filtros por periodo no historico.
- Melhorar acessibilidade dos graficos.

### Medio Prazo

- Relatorio semanal.
- Exportacao CSV/PDF.
- Lembretes de registro.
- Tela de perfil do usuario.

### Longo Prazo

- Insights automaticos.
- Integracoes externas.
- Aplicativo mobile.
- Multi-idioma.

## 18. Stack Tecnica

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Chart.js.
- Backend: Node.js, Express, Prisma, JWT, bcrypt.
- Banco: PostgreSQL.
- Deploy: Vercel.
- Leitura facial: face-api.js e TensorFlow.js.

