import {
  imageGenerationEndpoint,
  imageGenerationModel,
} from "../data/fluidcode";

export async function generateImage({ apiKey, provider, prompt, quality, size }) {
  if (!prompt?.trim()) {
    throw new Error("Selecione ou escreva um prompt antes de gerar.");
  }

  if (!apiKey?.trim()) {
    const response = await fetch(buildPollinationsImageUrl({ prompt, size }), {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Pollinations AI retornou erro HTTP ${response.status}.`);
    }

    const blob = await response.blob();

    if (!blob.type.startsWith("image/")) {
      throw new Error("Pollinations AI não retornou uma imagem válida.");
    }

    return {
      blob,
      provider: "Pollinations AI",
      revoke: true,
    };
  }

  const response = await fetch(
    `${imageGenerationEndpoint.replace(/\/$/, "")}/v1/images/generations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: imageGenerationModel,
        prompt: prompt.trim(),
        quality: quality || "medium",
        size: size || "1024x1024",
        n: 1,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Erro HTTP ${response.status}`);
  }

  const json = await response.json();
  const imageBase64 = json?.data?.[0]?.b64_json;

  if (!imageBase64) {
    throw new Error("A resposta não trouxe data[0].b64_json.");
  }

  return {
    blob: base64ToBlob(imageBase64, "image/png"),
    provider: provider ? `${provider} (${imageGenerationModel})` : imageGenerationModel,
    revoke: true,
  };
}

function buildPollinationsImageUrl({ prompt, size }) {
  const { width, height } = parseSize(size);
  const proofOfConceptPrompt = buildCompactProofPrompt(prompt);

  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    nologo: "true",
    seed: String(Date.now()),
  });

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(proofOfConceptPrompt)}?${params.toString()}`;
}

function buildCompactProofPrompt(prompt) {
  const normalizedPrompt = prompt.toLowerCase();
  const baseConstraints =
    "photorealistic, premium residential architecture, realistic water, natural light, no text, no logo, no watermark";

  if (normalizedPrompt.includes("before-and-after") || normalizedPrompt.includes("antes")) {
    return `aerial before and after comparison of the same modern residential backyard, left side empty lawn, right side luxury rectangular swimming pool, pale stone deck, landscaping, lounge chairs, same perspective and scale, ${baseConstraints}`;
  }

  if (normalizedPrompt.includes("qr")) {
    return `premium sales desk with printed pool proposal folder, abstract QR code card, tablet showing backyard pool render thumbnails, elegant commercial presentation, ${baseConstraints}`;
  }

  if (normalizedPrompt.includes("dashboard") || normalizedPrompt.includes("campaign")) {
    return `modern SaaS dashboard for pool sales campaigns on a desktop monitor, lead cards, generated pool thumbnails, token status, clean professional interface, ${baseConstraints}`;
  }

  if (normalizedPrompt.includes("upsell")) {
    return `luxury backyard upgrade after pool sale, swimming pool, outdoor lounge, pergola, garden lighting, subtle roof solar panels, premium evening atmosphere, ${baseConstraints}`;
  }

  return `cinematic aerial view of a modern home backyard transformed into a luxury pool proposal, turquoise rectangular pool, pale porcelain deck, elegant landscaping, warm daylight, ${baseConstraints}`;
}

function parseSize(size) {
  const match = /^(\d+)x(\d+)$/.exec(size || "");

  if (!match) {
    return { width: 1024, height: 1024 };
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function base64ToBlob(base64, mimeType) {
  const bytes = atob(base64);
  const chunks = [];

  for (let index = 0; index < bytes.length; index += 1024) {
    const slice = bytes.slice(index, index + 1024);
    const numbers = new Array(slice.length);

    for (let sliceIndex = 0; sliceIndex < slice.length; sliceIndex += 1) {
      numbers[sliceIndex] = slice.charCodeAt(sliceIndex);
    }

    chunks.push(new Uint8Array(numbers));
  }

  return new Blob(chunks, { type: mimeType });
}
