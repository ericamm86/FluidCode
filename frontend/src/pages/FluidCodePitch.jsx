import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CalendarCheck,
  ChevronRight,
  FileImage,
  Fingerprint,
  LayoutDashboard,
  QrCode,
  ScanSearch,
  Sparkles,
  Target,
  WandSparkles,
  Workflow,
} from "lucide-react";
import {
  atmosphereShowcases,
  publicAsset,
} from "../data/fluidcode";

const metrics = [
  {
    icon: Fingerprint,
    label: "Código do projeto",
    value: "ID do terreno",
    text: "Cada oportunidade recebe uma identificação exclusiva para proposta, imagens e rastreio comercial.",
  },
  {
    icon: CalendarCheck,
    label: "Cronograma inteligente",
    value: "Prazo garantido",
    text: "A experiência conecta desejo visual, qualificação e execução com previsibilidade operacional.",
  },
  {
    icon: Workflow,
    label: "Funil automatizado",
    value: "Jornada exclusiva",
    text: "Do QR Code ao pedido de orçamento, cada interação avança o cliente com contexto e intenção.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Venda mais visual",
    text: "O cliente não recebe só uma promessa: ele vê uma simulação do próprio terreno com piscina.",
  },
  {
    icon: BadgeCheck,
    title: "Lead mais qualificado",
    text: "Quem pede orçamento depois da experiência já demonstrou desejo, contexto e intenção real.",
  },
  {
    icon: LayoutDashboard,
    title: "Operação escalável",
    text: "Campanhas por bairro, endereço, token e status deixam a prospecção organizada.",
  },
];

const productHighlights = [
  {
    tag: "Engine de renderização",
    title: "Do quintal vazio ao paraíso particular em uma proposta visual.",
    text: "A FluidCode transforma fotos e referências do imóvel em uma simulação comercial de alto impacto, ajustando perspectiva, composição, piscina, deck, água e paisagismo para o cliente enxergar o projeto pronto.",
    benefit:
      "O cliente sente o desejo imediato de posse ao se imaginar dentro do próprio projeto.",
    visual: "render",
  },
  {
    tag: "Simulador atmosférico",
    title: "Estudo visual de luz, clima e desejo de uso.",
    text: "A apresentação pode mostrar o projeto em diferentes momentos: manhã clara, fim de tarde elegante ou noite com LEDs e área gourmet valorizada. A conversa sai do desenho técnico e entra no estilo de vida.",
    benefit:
      "Você antecipa objeções sobre sombra, posição da piscina e valorização da área externa.",
    visual: "atmosphere",
  },
];

const conversionPillars = [
  {
    phase: "Fase 01",
    title: "Mapeamento de terreno via satélite",
    highlight: "Sua proposta começa antes mesmo da primeira visita técnica.",
    text: "A FluidCode usa o endereço como ponto de partida para criar uma leitura visual do imóvel, do quintal e do potencial de implantação. O vendedor chega à conversa com contexto, referência e uma proposta mais concreta.",
  },
  {
    phase: "Fase 02",
    title: "Materialização hiper-realista do sonho",
    highlight: "O cliente não compra uma piscina. Ele compra o status do projeto pronto.",
    text: "A experiência transforma o terreno em imagens comerciais de alto impacto, mostrando piscina, deck, iluminação e paisagismo em uma composição feita para emocionar o comprador e acelerar a decisão.",
    featured: true,
  },
  {
    phase: "Fase 03",
    title: "Página exclusiva interativa",
    highlight: "O fechamento comercial conectado ao funil da empresa.",
    text: "Cada prospect recebe um link único com QR Code, galeria visual e chamada direta para orçamento. O interesse vira dado, o dado vira contato e o contato chega ao comercial com intenção real de compra.",
  },
];

const workflow = [
  {
    icon: ScanSearch,
    title: "Prospect por endereço",
    text: "A empresa seleciona regiões, imóveis ou leads com potencial para receber uma piscina.",
  },
  {
    icon: WandSparkles,
    title: "IA gera a proposta visual",
    text: "Fotos, medidas e referências viram imagens comerciais do projeto no terreno do cliente.",
  },
  {
    icon: QrCode,
    title: "Página por token",
    text: "Cada cliente recebe uma landing page exclusiva, acessada por QR Code ou link direto.",
  },
  {
    icon: FileImage,
    title: "Contato e orçamento",
    text: "O CTA coleta dados, fotos extras e preferências para o time comercial avançar.",
  },
];

export default function FluidCodePitch() {
  const [selectedAtmosphereId, setSelectedAtmosphereId] = useState(atmosphereShowcases[0].id);

  const selectedAtmosphere = useMemo(
    () =>
      atmosphereShowcases.find((showcase) => showcase.id === selectedAtmosphereId) ||
      atmosphereShowcases[0],
    [selectedAtmosphereId]
  );

  return (
    <main className="min-h-screen bg-[#f7fbfb] text-[#10232b]">
      <Hero />
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-6 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-lg border border-slate-200 bg-[#f7fbfb] p-4 shadow-[0_14px_34px_rgba(16,35,43,0.06)]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-md bg-[#063d54] text-[#75dfbd]">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0b7fab]">
                    {metric.label}
                  </p>
                  <strong className="mt-1 block text-lg font-black leading-tight text-[#10232b]">
                    {metric.value}
                  </strong>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{metric.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="tecnologia" className="bg-[#080f1e] px-5 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-[#00f0ff]/25 bg-[#00f0ff]/5 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00f0ff] shadow-[0_0_18px_rgba(0,240,255,0.12)]">
              Exclusividade FluidCode
            </span>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
              A tecnologia que transforma orçamentos frios em contratos assinados.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Esqueça os desenhos técnicos que o cliente não entende. Entregue a realidade
              pronta para desejar, aprovar e comprar.
            </p>
          </div>

          <div className="mt-20 grid gap-14">
            {productHighlights.map((feature, index) => (
              <article
                key={feature.title}
                className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#00f0ff]">
                    {feature.tag}
                  </p>
                  <h3 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-slate-400">{feature.text}</p>
                  <p className="mt-6 rounded-r-lg border-l-4 border-[#00f0ff] bg-white/[0.03] px-5 py-4 text-sm leading-7 text-slate-300">
                    <strong className="text-white">O impacto comercial:</strong>{" "}
                    {feature.benefit}
                  </p>
                </div>

                <div className="flex justify-center">
                  {feature.visual === "render" ? (
                    <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#050b14] p-6 shadow-[0_24px_54px_rgba(0,0,0,0.42)]">
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <span className="text-sm font-black text-white">Render Engine</span>
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                          Ativo
                        </span>
                      </div>
                      <div className="mt-5 grid gap-3 text-sm">
                        {[
                          ["Status", "Processando terreno"],
                          ["Perspectiva", "Identificada"],
                          ["Água e reflexos", "Alta definição"],
                          ["Paisagismo", "Aplicado ao cenário"],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between gap-4">
                            <span className="text-slate-400">{label}</span>
                            <strong className="text-right text-slate-100">{value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#00b4d8] to-[#00f0ff]" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-md rounded-lg border border-[#00f0ff]/20 bg-[#050b14] p-6 shadow-[0_24px_54px_rgba(0,240,255,0.10)]">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="text-sm font-black text-white">Atmosphere Studio</span>
                        <Sparkles size={18} className="text-[#00f0ff]" />
                      </div>
                      {[
                        ["Modo manhã", "Claridade limpa"],
                        ["Modo sunset", "Luz quente ativada"],
                        ["Modo noturno", "LEDs subaquáticos"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="mb-3 flex items-center justify-between gap-4 rounded-md bg-white/[0.03] px-4 py-3 text-sm"
                        >
                          <span className="text-slate-300">{label}</span>
                          <strong className="text-right text-[#00f0ff]">{value}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="simulador-visual" className="bg-[#050b14] px-5 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[#00f0ff]">
              Estudo visual ativo
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              A conversa sai do desenho técnico e entra no estilo de vida.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              O impacto comercial é imediato: você antecipa objeções sobre sombra,
              posicionamento da piscina e valorização real da área externa antes de mover
              um único bloco de terra.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {atmosphereShowcases.map((showcase) => {
              const isActive = showcase.id === selectedAtmosphere.id;

              return (
                <button
                  key={showcase.id}
                  type="button"
                  onClick={() => setSelectedAtmosphereId(showcase.id)}
                  className={`rounded-full border px-5 py-3 text-sm font-black transition ${
                    isActive
                      ? "border-[#00f0ff] bg-[#00f0ff] text-[#050b14] shadow-[0_0_22px_rgba(0,240,255,0.28)]"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#00f0ff] hover:text-white"
                  }`}
                >
                  {showcase.label}
                </button>
              );
            })}
          </div>

          <div className="mt-12 animate-[fadeIn_0.45s_ease]">
            <div className="grid gap-6 lg:grid-cols-2">
              <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                <span className="absolute left-4 top-4 z-10 rounded-md bg-[#050b14]/75 px-3 py-2 text-xs font-bold text-slate-200 backdrop-blur">
                  {selectedAtmosphere.beforeLabel}
                </span>
                <img
                  src={selectedAtmosphere.before}
                  alt={selectedAtmosphere.beforeLabel}
                  onError={(event) => {
                    event.currentTarget.src = publicAsset("/fluidcode/generated/before-after-luxury-yard.png");
                  }}
                  className="h-full w-full object-cover"
                />
              </figure>

              <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#00f0ff]/35 bg-slate-900 shadow-[0_18px_42px_rgba(0,240,255,0.10)]">
                <span className="absolute left-4 top-4 z-10 rounded-md bg-[#00b4d8]/90 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                  {selectedAtmosphere.afterLabel}
                </span>
                <img
                  src={selectedAtmosphere.after}
                  alt={selectedAtmosphere.afterLabel}
                  onError={(event) => {
                    event.currentTarget.src = publicAsset("/fluidcode/generated/hero-resort-yard.png");
                  }}
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>

            <div className="mx-auto mt-8 max-w-3xl text-center">
              <h3 className="text-2xl font-black text-white">{selectedAtmosphere.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-400">
                {selectedAtmosphere.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="proposta" className="bg-[#eaf6f3]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Demonstração"
              title="A experiência começa no endereço do cliente."
              text="A empresa pode iniciar com imagens pré-geradas por token e depois melhorar a simulação com fotos, medidas e preferências enviadas pelo proprietário."
            />
            <div className="mt-8 grid gap-4">
              {workflow.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#0b7fab] text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#10232b]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_24px_60px_rgba(11,76,104,0.16)]">
            <img
              src={publicAsset("/fluidcode/generated/demo-before-after-client-house.png")}
              alt="Simulação de piscina no terreno do cliente"
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              {["Página por token", "Galeria IA", "CTA orçamento"].map((item) => (
                <div key={item} className="rounded-md bg-[#f2f8f8] p-4">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#17a878]">
                    FluidCode
                  </span>
                  <p className="mt-2 text-sm font-bold text-[#10232b]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="bg-[#0d172a] px-5 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.22em] text-[#00f0ff]">
              Engenharia de desejo
            </span>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              Como a FluidCode transforma um endereço comum em um fechamento de alto valor.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              A tecnologia que substitui o &quot;imaginar&quot; pelo impacto visual instantâneo.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {conversionPillars.map((pillar) => (
              <article
                key={pillar.phase}
                className={`flex flex-col rounded-lg border p-8 transition duration-300 hover:-translate-y-2 hover:border-[#00f0ff] hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] ${
                  pillar.featured
                    ? "border-[#00f0ff]/35 bg-[#050b14] shadow-[0_20px_48px_rgba(0,240,255,0.10)] lg:scale-[1.02]"
                    : "border-white/10 bg-[#050b14]"
                }`}
              >
                <span
                  className={`mb-6 self-start rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                    pillar.featured
                      ? "bg-[#00f0ff]/10 text-[#00f0ff]"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  {pillar.phase}
                </span>
                <h3 className="text-2xl font-black leading-tight text-white">{pillar.title}</h3>
                <p className="mt-4 text-base font-bold leading-6 text-[#00f0ff]">
                  {pillar.highlight}
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-400">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeader
            eyebrow="Valor para a empresa"
            title="A FluidCode conecta tecnologia IA com resultado comercial."
            text="O produto foi pensado para caber na operação de vendas: criar desejo, capturar contato, priorizar leads e abrir espaço para novos produtos."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-lg border border-slate-200 p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#e3f7f0] text-[#08785a]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#063d54] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#75dfbd]">
              FluidCode
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Transforme endereços em propostas visuais com IA.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Uma máquina visual de vendas para transformar curiosidade em orçamento, orçamento em contrato e contrato em novas oportunidades.
            </p>
          </div>
          <a
            href="#simulador-visual"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-[#063d54]"
          >
            Ver motor visual
            <ChevronRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <header className="relative min-h-[92vh] overflow-hidden bg-[#061d28] text-white">
      <img
        src={publicAsset("/fluidcode/generated/hero-resort-yard.png")}
        alt="Casa com piscina gerada como proposta visual"
        className="absolute inset-0 h-full w-full object-cover opacity-72"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061d28] via-[#061d28]/76 to-[#061d28]/18" />
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-6">
        <a href="#" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em]">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[#44c8a0] text-[#06202b]">
            <Building2 size={19} />
          </span>
          FluidCode
        </a>
        <div className="hidden items-center gap-6 text-sm font-semibold text-white/78 md:flex">
          <a href="#tecnologia" className="hover:text-white">Tecnologia</a>
          <a href="#proposta" className="hover:text-white">Proposta</a>
          <a href="#galeria" className="hover:text-white">Galeria</a>
          <a href="#simulador-visual" className="hover:text-white">Simulador</a>
          <a href="#simulador-visual" className="hover:text-white">Motor IA</a>
        </div>
      </nav>
      <div className="relative z-10 mx-auto grid max-w-6xl px-5 pb-16 pt-20 md:pt-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={17} />
            Proposta comercial para venda de piscinas com IA
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] md:text-7xl">
            Transforme endereços em propostas visuais com IA.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
            A FluidCode cria páginas personalizadas por cliente com imagens realistas da piscina
            no próprio terreno, QR Code de acesso e captura de orçamento.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#proposta"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-[#06202b]"
            >
              Ver proposta
              <ArrowRight size={18} />
            </a>
            <a
              href="#simulador-visual"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/36 bg-white/12 px-5 py-3 text-sm font-black text-white backdrop-blur"
            >
              <Camera size={18} />
              Ver motor visual
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ eyebrow, title, text, inverted = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-black uppercase tracking-[0.18em] ${inverted ? "text-[#75dfbd]" : "text-[#0b7fab]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-4xl font-black leading-tight md:text-5xl ${inverted ? "text-white" : "text-[#10232b]"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-lg leading-8 ${inverted ? "text-white/72" : "text-slate-600"}`}>
        {text}
      </p>
    </div>
  );
}
