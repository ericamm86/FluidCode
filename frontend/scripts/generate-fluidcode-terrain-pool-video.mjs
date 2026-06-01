import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const rootDir = new URL("../", import.meta.url);
const generatedDir = new URL("public/fluidcode/generated/", rootDir);
const videoDir = new URL("public/fluidcode/video/", rootDir);
const sourceImage = new URL("before-after-satellite.png", generatedDir);
const outFile = new URL("fluidcode-terreno-piscina-ia.mp4", videoDir);
const width = 1920;
const height = 1080;
const fps = 30;

await mkdir(videoDir, { recursive: true });

const beforeScene =
  `[0:v]crop=iw/2:ih:0:0,split=2[beforeBg][beforeFg];` +
  `[beforeBg]scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},gblur=sigma=22,eq=brightness=-0.08:saturation=0.9[beforeBlur];` +
  `[beforeFg]scale=${width}:${height}:force_original_aspect_ratio=decrease[beforeFit];` +
  `[beforeBlur][beforeFit]overlay=(W-w)/2:(H-h)/2,trim=duration=5.5,setpts=PTS-STARTPTS,fade=t=in:st=0:d=0.35,format=yuv420p[before]`;

const afterScene =
  `[1:v]crop=iw/2:ih:iw/2:0,split=2[afterBg][afterFg];` +
  `[afterBg]scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},gblur=sigma=22,eq=brightness=-0.05:saturation=1.04[afterBlur];` +
  `[afterFg]scale=${width}:${height}:force_original_aspect_ratio=decrease[afterFit];` +
  `[afterBlur][afterFit]overlay=(W-w)/2:(H-h)/2,trim=duration=5.5,setpts=PTS-STARTPTS,format=yuv420p[after]`;

const filter =
  `${beforeScene};${afterScene};` +
  `[before][after]xfade=transition=fade:duration=1:offset=4.5,` +
  `trim=duration=10,setpts=PTS-STARTPTS,format=yuv420p[vout]`;

await run(ffmpegPath, [
  "-y",
  "-hide_banner",
  "-loop",
  "1",
  "-t",
  "5.5",
  "-i",
  fileURLToPath(sourceImage),
  "-loop",
  "1",
  "-t",
  "5.5",
  "-i",
  fileURLToPath(sourceImage),
  "-filter_complex",
  filter,
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
  fileURLToPath(outFile),
]);

console.log(`Video salvo em: ${outFile.pathname}`);

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
