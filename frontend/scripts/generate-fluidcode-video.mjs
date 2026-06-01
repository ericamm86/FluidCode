import { mkdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import { videoPrompts, videoScript } from "../src/data/fluidcode.js";

const rootDir = new URL("../", import.meta.url);
const generatedDir = new URL("public/fluidcode/generated/", rootDir);
const videoDir = new URL("public/fluidcode/video/", rootDir);
const tmpDir = new URL(".tmp-fluidcode-video/", rootDir);
const outFile = new URL("fluidcode-promocional.mp4", videoDir);
const fontPath = "C\\:/Windows/Fonts/arial.ttf";
const fps = 30;
const width = 1920;
const height = 1080;

const scenes = [
  {
    duration: 6,
    image: "video-scanner-pool.png",
    title: "Cada endereco vira desejo imediato.",
    voice: videoScript[0].voice,
  },
  {
    duration: 8,
    image: "video-mobile-qr-gallery.png",
    title: "Link exclusivo, QR Code e galeria personalizada.",
    voice: videoScript[1].voice,
  },
  {
    duration: 8,
    image: "video-qualified-lead.png",
    title: "Leads prontos para o comercial fechar.",
    voice: videoScript[2].voice,
  },
  {
    duration: 8,
    image: "video-sunset-cta.png",
    title: "Pare de vender espacos vazios.",
    voice: videoScript[3].voice,
  },
];

await mkdir(videoDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const missing = videoPrompts
  .map((prompt) => prompt.asset.split("/").pop())
  .filter((fileName) => !scenes.some((scene) => scene.image === fileName));

if (missing.length) {
  console.warn(`Aviso: prompts de video sem cena configurada: ${missing.join(", ")}`);
}

const args = ["-y", "-hide_banner"];

for (const scene of scenes) {
  args.push("-loop", "1", "-t", String(scene.duration), "-i", fileURLToPath(new URL(scene.image, generatedDir)));
}

const filterParts = [];
const concatInputs = [];

for (const [index, scene] of scenes.entries()) {
  const titleFile = new URL(`scene-${index}-title.txt`, tmpDir);
  const voiceFile = new URL(`scene-${index}-voice.txt`, tmpDir);

  await writeFile(titleFile, scene.title, "utf8");
  await writeFile(voiceFile, scene.voice, "utf8");

  const titlePath = escapePathForDrawtext(titleFile);
  const voicePath = escapePathForDrawtext(voiceFile);

  filterParts.push(
    `[${index}:v]` +
      `scale=${width}:${height}:force_original_aspect_ratio=decrease,` +
      `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x061d28,` +
      `fps=${fps},trim=duration=${scene.duration},setpts=PTS-STARTPTS,` +
      "format=yuv420p," +
      "drawbox=x=0:y=720:w=iw:h=360:color=black@0.58:t=fill," +
      "drawbox=x=92:y=780:w=8:h=210:color=0x00f0ff@0.95:t=fill," +
      `drawtext=fontfile='${fontPath}':textfile='${titlePath}':` +
      "fontcolor=white:fontsize=46:line_spacing=10:x=126:y=772," +
      `drawtext=fontfile='${fontPath}':textfile='${voicePath}':` +
      "fontcolor=0xd7e7ee:fontsize=28:line_spacing=8:x=126:y=858[v" +
      index +
      "]"
  );
  concatInputs.push(`[v${index}]`);
}

filterParts.push(`${concatInputs.join("")}concat=n=${scenes.length}:v=1:a=0[vout]`);

args.push(
  "-filter_complex",
  filterParts.join(";"),
  "-map",
  "[vout]",
  "-r",
  String(fps),
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  fileURLToPath(outFile)
);

await run(ffmpegPath, args);
await rm(tmpDir, { recursive: true, force: true });

console.log(`Video salvo em: ${outFile.pathname}`);

function escapePathForDrawtext(fileUrl) {
  return fileUrl.pathname
    .replaceAll("\\", "/")
    .replace(/^\/([A-Za-z]):\//, (_match, drive) => `${drive}\\:/`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`ffmpeg finalizou com codigo ${code}`));
    });
  });
}
