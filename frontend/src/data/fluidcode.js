export const imageGenerationEndpoint =
  import.meta.env?.VITE_IMAGEGEN_BASE_URL || "https://litellm.cogmo.com.br";

export const imageGenerationModel =
  import.meta.env?.VITE_IMAGEGEN_MODEL || "gpt-image-2";

export const publicAsset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const imagePrompts = [
  {
    id: "hero-resort-yard",
    title: "Hero comercial",
    size: "1536x1024",
    quality: "high",
    asset: publicAsset("/fluidcode/generated/hero-resort-yard.png"),
    prompt:
      "Use case: commercial proposal hero image. Asset type: original AI-generated visual for FluidCode, a B2B AI sales solution for pool companies. Primary request: photorealistic cinematic aerial three-quarter view of a contemporary residential backyard being transformed into a premium pool proposal, with a turquoise rectangular pool, pale porcelain deck, subtle landscape design, elegant outdoor lights, and a clean modern home. Scene/backdrop: warm Florida-style suburb, not based on any real address, no map interface. Composition/framing: wide horizontal image, pool and house on the right two-thirds, calm dark-green garden depth on the left for overlay copy, strong first-impression commercial quality. Lighting/mood: late afternoon sun, aspirational, precise, technology-enabled, premium but believable. Color palette: aqua water, fresh greens, white stone, charcoal shadows, small warm light accents. Constraints: original image only, no reference photo copying, no text, no logos, no watermarks, no people, no distorted architecture, no UI overlays.",
  },
  {
    id: "before-after-satellite",
    title: "Antes e depois por endereço",
    size: "1536x1024",
    quality: "high",
    asset: publicAsset("/fluidcode/generated/before-after-luxury-yard.png"),
    prompt:
      "Use case: AI sales comparison image. Asset type: original before-and-after visual for a pool proposal. Primary request: create a realistic top-down residential lot visualization split into two halves; left half shows a simple backyard with grass and patio, right half shows the same invented property transformed with a rectangular pool, stone deck, lounge chairs, and landscaping. Scene/backdrop: generic upscale suburban property seen from above, not a real map screenshot. Composition/framing: precise top-down orthographic look, clean vertical comparison, property geometry consistent across both halves, no labels. Lighting/mood: realistic midday sunlight, clear shadows, credible survey-like perspective. Constraints: original synthetic property only, no real addresses, no street names, no map pins, no UI, no red boundary lines, no text, no watermark.",
  },
  {
    id: "qr-folder",
    title: "Folder com QR Code",
    size: "1024x1024",
    quality: "medium",
    asset: publicAsset("/fluidcode/generated/qr-folder.png"),
    prompt:
      "Use case: commercial proposal material mockup. Asset type: original AI-generated printed folder and tablet scene for FluidCode. Primary request: elegant sales desk with a premium one-page pool proposal, a stylized QR code block, abstract miniature pool render thumbnails, campaign cards, and a tablet showing a modern proposal page. Scene/backdrop: bright executive meeting table, architectural samples, clean business setting. Style/medium: photorealistic product mockup. Composition/framing: square image, folder centered, tablet angled behind it, clean negative space, high-end B2B sales material. Lighting/mood: trustworthy, polished, consultative. Constraints: no readable text, no real logos, no real addresses, no copied layout, no watermark, QR code can be abstract and non-functional.",
  },
  {
    id: "ai-dashboard",
    title: "Painel de campanhas",
    size: "1536x1024",
    quality: "medium",
    asset: publicAsset("/fluidcode/generated/ai-dashboard.png"),
    prompt:
      "Use case: SaaS interface concept. Asset type: original AI-generated dashboard mockup for FluidCode. Primary request: modern B2B software dashboard on a desktop monitor showing prospect pipeline, generated pool image thumbnails, token status, QR readiness, budget requests, and campaign performance. Scene/backdrop: focused sales operations desk with soft reflections, no human hands. Composition/framing: wide image, dense but organized interface, left navigation, central lead board, right insight column, professional product-shot perspective. Lighting/mood: technology-forward, commercial, sharp, executive. Color palette: deep teal, white panels, aqua accents, small green status indicators. Constraints: no readable real text, no real addresses, no logos except abstract marks, no watermark, no fantasy UI, no copied website layout.",
  },
  {
    id: "upsell-backyard",
    title: "Upsell pós-orçamento",
    size: "1536x1024",
    quality: "high",
    asset: publicAsset("/fluidcode/generated/upsell-backyard.png"),
    prompt:
      "Use case: future upsell proposal image. Asset type: original AI-generated premium backyard upgrade visual. Primary request: photorealistic residential backyard after a pool sale, showing a refined pool, outdoor lounge furniture, pergola, soft landscape lighting, discreet solar panels on the roof, and a small outdoor dining area. Scene/backdrop: invented high-end suburban home, warm evening light, tasteful commercial design. Composition/framing: wide image showing pool, patio, roof, and upgrades as one coordinated package. Lighting/mood: aspirational, realistic, profitable upsell opportunity, premium but attainable. Constraints: original image only, no people, no text, no logos, no unrealistic mansion, no watermark.",
  },
];

export const pitchSlides = [
  {
    eyebrow: "01 / Primeiro impacto",
    title: "Piscinas ainda são vendidas antes do cliente conseguir enxergar o resultado.",
    text: "O comprador precisa imaginar uma obra cara olhando para um quintal vazio. Isso aumenta a dúvida, alonga o ciclo de venda e reduz a urgência do orçamento.",
  },
  {
    eyebrow: "02 / Virada",
    title: "A FluidCode transforma o endereço em desejo visual.",
    text: "Cada prospect recebe uma página personalizada com imagens da piscina no próprio terreno, geradas por IA e preparadas para converter interesse em contato comercial.",
  },
  {
    eyebrow: "03 / Experiência",
    title: "Do QR Code ao pedido de orçamento.",
    text: "A empresa envia um folder, anúncio ou mensagem com QR Code. O cliente acessa a página, vê a transformação, envia fotos extras e solicita orçamento.",
  },
  {
    eyebrow: "04 / Ganho",
    title: "Mais leads qualificados para o time de vendas.",
    text: "Quem interage com a proposta visual já demonstrou intenção. A abordagem deixa de ser fria e passa a conversar com um projeto que o cliente já viu.",
  },
  {
    eyebrow: "05 / Escala",
    title: "Campanhas por bairro, endereço ou lista de prospects.",
    text: "A FluidCode pode operar com tokens, páginas personalizadas, imagens pré-geradas e acompanhamento dos leads por status comercial.",
  },
  {
    eyebrow: "06 / Expansão",
    title: "Depois da piscina, entram os upgrades.",
    text: "A mesma experiência visual abre espaço para móveis externos, paisagismo, painel solar, iluminação, automação e manutenção.",
  },
];

export const demoGallery = [
  {
    title: "Vista de projeto",
    caption: "Imagem técnica e aspiracional para abrir a proposta.",
    src: publicAsset("/fluidcode/generated/qr-folder.png"),
  },
  {
    title: "Simulação no terreno",
    caption: "O cliente reconhece o espaço e entende a transformação.",
    src: publicAsset("/fluidcode/generated/before-after-luxury-yard.png"),
  },
  {
    title: "Render comercial",
    caption: "Imagem de desejo para acelerar a decisão.",
    src: publicAsset("/fluidcode/generated/hero-resort-yard.png"),
  },
  {
    title: "Painel comercial",
    caption: "Campanhas, tokens, leads e imagens em uma operação escalável.",
    src: publicAsset("/fluidcode/generated/ai-dashboard.png"),
  },
  {
    title: "Upsell visual",
    caption: "Piscina, solar, paisagismo e área externa no mesmo funil.",
    src: publicAsset("/fluidcode/generated/upsell-backyard.png"),
  },
];

export const atmosphereShowcases = [
  {
    id: "manha",
    label: "Manhã clara",
    title: "Estudo de incidência solar matinal",
    description:
      "Compensa as linhas de sombra dos muros e mostra o aproveitamento do sol na água nas primeiras horas do dia. Perfeito para defender a melhor posição térmica da piscina.",
    beforeLabel: "Antes / Terreno original",
    afterLabel: "Depois / Simulador IA",
    before: publicAsset("/fluidcode/generated/atmosphere-morning-before.png"),
    after: publicAsset("/fluidcode/generated/atmosphere-morning-after.png"),
    beforePrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator before image. Primary request: photorealistic modern Brazilian residential backyard without a pool, clean grass, boundary walls, simple patio, warm clear morning sunlight, credible real estate photo, no people. Composition/framing: horizontal 16:10 wide angle from patio height, enough sky and yard visible, same invented property geometry suitable for before/after comparison. Lighting/mood: clear morning, fresh, realistic shadows from side walls. Constraints: no text, no logos, no watermark, no pool, no fantasy architecture.",
    afterPrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator after image. Primary request: photorealistic transformation of the same invented modern Brazilian backyard into a premium pool project, rectangular pool with crystal-clear water, pale stone deck, integrated landscaping, morning sunlight hitting the water, realistic wall shadows, aspirational but buildable. Composition/framing: horizontal 16:10 wide angle from patio height, match the before scene geometry and camera perspective. Lighting/mood: clear morning, fresh, high-end residential sales render. Constraints: no text, no logos, no watermark, no people, no distorted water, no impossible architecture.",
  },
  {
    id: "tarde",
    label: "Fim de tarde",
    title: "Estudo cromático do pôr do sol",
    description:
      "Gera reflexos dourados e leitura emocional do uso após o trabalho. A proposta deixa de ser obra e passa a ser relaxamento, status e valorização da casa.",
    beforeLabel: "Antes / Quintal ao entardecer",
    afterLabel: "Depois / Reflexos dourados",
    before: publicAsset("/fluidcode/generated/atmosphere-sunset-before.png"),
    after: publicAsset("/fluidcode/generated/atmosphere-sunset-after.png"),
    beforePrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator before image. Primary request: photorealistic modern residential backyard without a pool at golden hour, clean grass, patio, walls, subtle warm sunset light, ordinary unused outdoor area with commercial potential. Composition/framing: horizontal 16:10 wide angle from patio height, same invented property geometry suitable for before/after comparison. Lighting/mood: elegant late afternoon, golden shadows, realistic and premium. Constraints: no text, no logos, no watermark, no pool, no people.",
    afterPrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator after image. Primary request: photorealistic premium pool transformation of the same invented backyard at golden hour, rectangular pool, warm reflections on water, elegant deck, lounge chairs, refined landscaping, architecture integrated with outdoor lifestyle. Composition/framing: horizontal 16:10 wide angle from patio height, match the before scene geometry and camera perspective. Lighting/mood: cinematic sunset, aspirational, luxurious but realistic. Constraints: no text, no logos, no watermark, no people, no impossible mansion.",
  },
  {
    id: "noite",
    label: "Noite com LEDs",
    title: "Iluminação de alta performance e área gourmet valorizada",
    description:
      "Ativa o desejo de recepção noturna com água iluminada, LEDs subaquáticos e integração com espaço gourmet. Ideal para vender upgrades e aumentar ticket.",
    beforeLabel: "Antes / Área externa escura",
    afterLabel: "Depois / LED e gourmet",
    before: publicAsset("/fluidcode/generated/atmosphere-night-before.png"),
    after: publicAsset("/fluidcode/generated/atmosphere-night-after.png"),
    beforePrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator before image. Primary request: photorealistic modern residential backyard without a pool at night, dim simple patio light, underused lawn, walls, modest outdoor area before renovation. Composition/framing: horizontal 16:10 wide angle from patio height, same invented property geometry suitable for before/after comparison. Lighting/mood: realistic night, slightly dark but visible, commercial before photo. Constraints: no text, no logos, no watermark, no pool, no people, no scary mood.",
    afterPrompt:
      "Use case: ads-marketing. Asset type: FluidCode atmospheric simulator after image. Primary request: photorealistic premium night pool transformation of the same invented backyard, rectangular pool with blue underwater LED lighting, gourmet area warmly lit, deck, plants with subtle landscape lighting, elegant high-value entertaining space. Composition/framing: horizontal 16:10 wide angle from patio height, match the before scene geometry and camera perspective. Lighting/mood: luxury evening, inviting, cinematic, realistic. Constraints: no text, no logos, no watermark, no people, no nightclub look, no unrealistic glow.",
  },
];

