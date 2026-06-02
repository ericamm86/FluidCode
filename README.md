# FluidCode

FluidCode cria propostas visuais com IA para empresas de piscinas, transformando enderecos e fotos de terrenos em paginas comerciais personalizadas para acelerar orcamentos e vendas.

A experiencia combina landing page por token, imagens geradas por IA, QR Code e captura de contato para trocar orcamentos frios por apresentacoes visuais de alto impacto.

## Deploy

Producao:

```txt
https://fluidcode-projeto-atualizado.vercel.app
```

## Entregaveis

- Proposta comercial responsiva em React.
- Demo acessivel em `/` e `/000000`.
- Galeria com imagens de referencia da solucao.
- Configurador visual de upsell "Monte seu Espaco" com termometro de impacto.
- Prompts profissionais de geracao de imagem versionados no codigo.
- Integracao preparada para `POST /v1/images/generations` no endpoint `https://litellm.cogmo.com.br`.

## Onde ficam os prompts

Os prompts usados para gerar cada imagem estao em:

```txt
frontend/src/data/fluidcode.js
```

Cada item define:

- `title`
- `prompt`
- `quality`
- `size`
- imagem de referencia local

## Como rodar

```bash
cd frontend
npm install
npm run dev
```

Acesse:

```txt
http://127.0.0.1:5173/
http://127.0.0.1:5173/000000
```

## Configuracao de imagem

O endpoint padrao ja esta definido no codigo:

```txt
https://litellm.cogmo.com.br
```

Para sobrescrever via ambiente:

```bash
VITE_IMAGEGEN_BASE_URL="https://litellm.cogmo.com.br"
```

A chamada usa JSON no formato OpenAI/LiteLLM com:

- `model`
- `prompt`
- `quality`
- `size`
- `n`

A chave e enviada no header:

```txt
Authorization: Bearer <sua-chave>
```

Para gerar todos os assets finais:

```bash
cd frontend
npm run generate:images
```

## Validacao

```bash
cd frontend
npm run lint
npm run build
```
