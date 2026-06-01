import { mkdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const rootDir = new URL("../", import.meta.url);
const generatedDir = new URL("public/fluidcode/generated/", rootDir);
const videoDir = new URL("public/fluidcode/video/", rootDir);
const tmpDir = new URL(".tmp-fluidcode-demo-video/", rootDir);
const outFile = new URL("fluidcode-demo-saas-ia-piscinas.mp4", videoDir);
const fontPath = "C\\:/Windows/Fonts/arial.ttf";
const fps = 30;
const width = 1920;
const height = 1080;
const sceneDuration = 2;

await mkdir(videoDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const textFiles = new Map();

const scenes = [
  {
    name: "01-home",
    inputs: [],
    filter: sceneHome,
  },
  {
    name: "02-aerial",
    inputs: ["video-scanner-pool.png"],
    filter: sceneAerial,
  },
  {
    name: "03-processing",
    inputs: ["video-scanner-pool.png"],
    filter: sceneProcessing,
  },
  {
    name: "04-comparison",
    inputs: ["before-after-satellite.png"],
    filter: sceneComparison,
  },
  {
    name: "05-result",
    inputs: ["hero-resort-yard.png"],
    filter: sceneResult,
  },
];

const segmentFiles = [];

for (const [index, scene] of scenes.entries()) {
  const segmentFile = new URL(`segment-${index}.mp4`, tmpDir);
  segmentFiles.push(segmentFile);

  const args = [
    "-y",
    "-hide_banner",
    "-f",
    "lavfi",
    "-i",
    `color=c=0x0b1020:s=${width}x${height}:r=${fps}:d=${sceneDuration}`,
  ];

  for (const input of scene.inputs) {
    args.push("-loop", "1", "-t", String(sceneDuration), "-i", fileURLToPath(new URL(input, generatedDir)));
  }

  args.push(
    "-filter_complex",
    scene.filter(),
    "-map",
    "[vout]",
    "-t",
    String(sceneDuration),
    "-r",
    String(fps),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    fileURLToPath(segmentFile)
  );

  await run(ffmpegPath, args);
}

const listFile = new URL("segments.txt", tmpDir);
await writeFile(
  listFile,
  segmentFiles.map((file) => `file '${fileURLToPath(file).replaceAll("\\", "/")}'`).join("\n"),
  "utf8"
);

await run(ffmpegPath, [
  "-y",
  "-hide_banner",
  "-f",
  "concat",
  "-safe",
  "0",
  "-i",
  fileURLToPath(listFile),
  "-c",
  "copy",
  "-movflags",
  "+faststart",
  fileURLToPath(outFile),
]);

await rm(tmpDir, { recursive: true, force: true });

console.log(`Video salvo em: ${outFile.pathname}`);

function sceneHome() {
  return [
    baseUi("[0:v]"),
    box(330, 240, 1260, 610, "0x091622@0.96", "0x1b4d5f@0.8"),
    text("FluidCode", 390, 282, 34, "0xFFFFFF"),
    text("Visualização Inteligente por IA", 390, 340, 64, "0xFFFFFF"),
    text("Informe o endereço e receba uma proposta visual realista de piscina.", 394, 430, 28, "0xBBD2DE"),
    box(390, 520, 720, 78, "0xFFFFFF@0.07", "0x2a5366@0.9"),
    text("Rua das Palmeiras, 248", 430, 543, 30, "0xFFFFFF"),
    box(1135, 520, 335, 78, "0x00F0FF@0.95", "0x00F0FF@1"),
    text("Gerar Projeto por IA", 1175, 545, 28, "0x06131C"),
    box(390, 660, 1080, 96, "0xFFFFFF@0.035", "0x173646@0.9"),
    text("Produto SaaS pronto para o cliente final", 430, 690, 30, "0xD9F7FF"),
    text("Sem configuracoes tecnicas. Apenas a jornada visual.", 430, 730, 22, "0x86A9B8"),
    finish(),
  ].join(",");
}

function sceneAerial() {
  return [
    "[1:v]scale=1260:650:force_original_aspect_ratio=increase,crop=1260:650,format=rgba[map]",
    baseUiLabel("[0:v]", "base"),
    `[base]${box(300, 210, 1320, 720, "0x08131e@0.95", "0x1b4d5f@0.8")}[shell]`,
    "[shell][map]overlay=x=330:y=260[withmap]",
    `[withmap]${box(330, 260, 1260, 76, "0x06131c@0.76", "0x06131c@0")},${text("Imagem aérea carregada", 370, 282, 34, "0xFFFFFF")},${text("Endereço identificado e área externa pronta para análise.", 370, 880, 26, "0xD0E7EF")},${finish()}`,
  ].join(";");
}

function sceneProcessing() {
  return [
    "[1:v]scale=1260:650:force_original_aspect_ratio=increase,crop=1260:650,gblur=sigma=8,format=rgba[map]",
    baseUiLabel("[0:v]", "base"),
    `[base]${box(300, 210, 1320, 720, "0x08131e@0.95", "0x1b4d5f@0.8")}[shell]`,
    "[shell][map]overlay=x=330:y=260[withmap]",
    `[withmap]drawbox=x=330:y=260:w=1260:h=650:color=0x06131c@0.58:t=fill,${box(610, 360, 700, 330, "0x071522@0.92", "0x00F0FF@0.35")},${box(720, 485, 480, 16, "0xFFFFFF@0.1", "0xFFFFFF@0.1")},${box(720, 485, 315, 16, "0x00F0FF@0.95", "0x00F0FF@0.95")},${text("Analisando imóvel...", 720, 405, 42, "0xFFFFFF")},${text("Gerando proposta visual...", 720, 535, 34, "0xBFEFFF")},${text("Posição da casa  |  Áreas livres  |  Integração com lazer", 646, 625, 24, "0x8FB7C7")},${finish()}`,
  ].join(";");
}

function sceneComparison() {
  return [
    "[1:v]crop=iw/2:ih:0:0,scale=760:520:force_original_aspect_ratio=increase,crop=760:520,format=rgba[before]",
    "[1:v]crop=iw/2:ih:iw/2:0,scale=760:520:force_original_aspect_ratio=increase,crop=760:520,format=rgba[after]",
    baseUiLabel("[0:v]", "base"),
    `[base]${box(170, 190, 760, 650, "0x071522@0.96", "0x244452@0.9")},${box(990, 190, 760, 650, "0x071522@0.96", "0x00F0FF@0.75")}[cards]`,
    "[cards][before]overlay=x=170:y=280[left]",
    "[left][after]overlay=x=990:y=280[split]",
    `[split]${text("ANTES", 210, 220, 38, "0xFFFFFF")},${text("Residência sem piscina", 210, 800, 26, "0xAFC8D4")},${text("DEPOIS", 1030, 220, 38, "0x00F0FF")},${text("Piscina, deck, paisagismo e área de lazer", 1030, 800, 26, "0xD7F8FF")},${finish()}`,
  ].join(";");
}

function sceneResult() {
  return [
    "[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=rgba[hero]",
    "[0:v][hero]overlay=0:0[tmp1]",
    `[tmp1]drawbox=x=0:y=0:w=1920:h=1080:color=0x020914@0.22:t=fill,${box(115, 720, 960, 210, "0x06131c@0.72", "0x00F0FF@0.35")},${text("Projeto gerado por IA", 160, 760, 52, "0xFFFFFF")},${text("Piscina moderna, deck premium, jardinagem e área de convivência.", 164, 835, 30, "0xD7EEF6")},${box(160, 890, 300, 52, "0x00F0FF@0.95", "0x00F0FF@1")},${text("Proposta pronta", 194, 904, 24, "0x06131C")},${finish()}`,
  ].join(";");
}

function baseUi(input) {
  return [
    `${input}drawbox=x=0:y=0:w=1920:h=1080:color=0x0d172a@1:t=fill`,
    "drawbox=x=0:y=0:w=1920:h=86:color=0x07111f@1:t=fill",
    "drawbox=x=0:y=86:w=1920:h=1:color=0x244452@0.8:t=fill",
    drawtext("FluidCode", 76, 28, 24, "0xFFFFFF"),
    drawtext("Plataforma de projetos de piscinas por IA", 155, 31, 21, "0x8EB6C6"),
  ].join(",");
}

function baseUiLabel(input, label) {
  return `${baseUi(input)}[${label}]`;
}

function box(x, y, w, h, color, borderColor) {
  return [
    `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${color}:t=fill`,
    `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${borderColor}:t=2`,
  ].join(",");
}

function text(value, x, y, size, color) {
  return drawtext(value, x, y, size, color);
}

function drawtext(value, x, y, size, color) {
  const key = `${value}-${x}-${y}-${size}-${color}`;
  if (!textFiles.has(key)) {
    const fileUrl = new URL(`text-${textFiles.size}.txt`, tmpDir);
    textFiles.set(key, fileUrl);
  }

  const fileUrl = textFiles.get(key);
  return `drawtext=fontfile='${fontPath}':textfile='${escapePathForDrawtext(fileUrl)}':fontcolor=${color}:fontsize=${size}:x=${x}:y=${y}`;
}

function finish() {
  return `fade=t=in:st=0:d=0.14,fade=t=out:st=1.88:d=0.12,format=yuv420p[vout]`;
}

async function writeTextFiles() {
  for (const [key, fileUrl] of textFiles.entries()) {
    const [value] = key.split(/-\d+-\d+-\d+-0x/);
    await writeFile(fileUrl, value, "utf8");
  }
}

function escapePathForDrawtext(fileUrl) {
  return fileUrl.pathname
    .replaceAll("\\", "/")
    .replace(/^\/([A-Za-z]):\//, (_match, drive) => `${drive}\\:/`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    writeTextFiles()
      .then(() => {
        const child = spawn(command, args, { stdio: "inherit" });
        child.on("error", reject);
        child.on("close", (code) => {
          if (code === 0) {
            resolve();
            return;
          }

          reject(new Error(`ffmpeg finalizou com codigo ${code}`));
        });
      })
      .catch(reject);
  });
}
