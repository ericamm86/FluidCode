import { access, mkdir, writeFile } from "node:fs/promises";
import {
  atmosphereShowcases,
  imageGenerationEndpoint,
  imageGenerationModel,
  imagePrompts,
} from "../src/data/fluidcode.js";

const apiKey = process.env.LITELLM_API_KEY || process.env.IMAGEGEN_API_KEY;
const outDir = new URL("../public/fluidcode/generated/", import.meta.url);

if (!apiKey) {
  console.error("Defina LITELLM_API_KEY ou IMAGEGEN_API_KEY antes de gerar as imagens.");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const atmospherePrompts = atmosphereShowcases.flatMap((showcase) => [
  {
    id: assetIdFromPath(showcase.before),
    quality: "high",
    size: "1536x960",
    prompt: showcase.beforePrompt,
  },
  {
    id: assetIdFromPath(showcase.after),
    quality: "high",
    size: "1536x960",
    prompt: showcase.afterPrompt,
  },
]);

for (const item of [...imagePrompts, ...atmospherePrompts]) {
  const filePath = new URL(`${item.id}.png`, outDir);

  if (!process.env.FORCE_IMAGEGEN && await fileExists(filePath)) {
    console.log(`Mantido: ${filePath.pathname}`);
    continue;
  }

  const body = {
    model: imageGenerationModel,
    prompt: item.prompt,
    quality: item.quality,
    size: item.size,
    n: 1,
  };

  const url = `${imageGenerationEndpoint.replace(/\/$/, "")}/v1/images/generations`;
  console.log(`Gerando ${item.id} em ${item.size} (${item.quality})...`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${item.id}: ${response.status} ${text}`);
  }

  const json = await response.json();
  const imageBase64 = json?.data?.[0]?.b64_json;

  if (!imageBase64) {
    throw new Error(`${item.id}: resposta sem data[0].b64_json`);
  }

  const buffer = Buffer.from(imageBase64, "base64");
  await writeFile(filePath, buffer);
  console.log(`Salvo: ${filePath.pathname}`);
}

function assetIdFromPath(assetPath) {
  return assetPath.split("/").pop().replace(/\.png$/i, "");
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
