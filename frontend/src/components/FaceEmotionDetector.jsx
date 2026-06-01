import { Camera, CameraOff, History, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { createEmotion } from "../services/emotion.service";

/* global window */

const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";

const emotionView = {
  feliz: { emoji: ":-)", label: "Feliz", color: "#2dd4bf", note: "Seu rosto parece leve e aberto." },
  triste: { emoji: ":-(", label: "Triste", color: "#60a5fa", note: "Respire com calma. Esta leitura e um sinal, nao um julgamento." },
  bravo: { emoji: ">:(", label: "Bravo", color: "#fb7185", note: "Talvez seja hora de pausar e soltar os ombros." },
  neutro: { emoji: ":-|", label: "Neutro", color: "#a78bfa", note: "Expressao estavel no momento." },
  cansado: { emoji: "-_-", label: "Cansado", color: "#fbbf24", note: "Seu rosto parece pedir descanso e agua." }
};

const emptyReading = {
  emotion: "neutro",
  confidence: 0,
  note: "Ative a camera para acompanhar sua emocao em tempo real.",
  detected: false
};

const emotionScores = {
  feliz: { humor: 9, estresse: 2, energia: 8 },
  triste: { humor: 3, estresse: 6, energia: 3 },
  bravo: { humor: 4, estresse: 9, energia: 6 },
  neutro: { humor: 6, estresse: 4, energia: 6 },
  cansado: { humor: 5, estresse: 5, energia: 2 }
};

function mapExpression(expressions = {}) {
  const values = {
    happy: expressions.happy || 0,
    sad: expressions.sad || 0,
    angry: expressions.angry || 0,
    neutral: expressions.neutral || 0,
    surprised: expressions.surprised || 0,
    fearful: expressions.fearful || 0,
    disgusted: expressions.disgusted || 0
  };

  const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]);
  const [top, confidence] = sorted[0] || ["neutral", 0];

  if (values.happy >= 0.35) return { emotion: "feliz", confidence: values.happy };
  if (values.angry >= 0.25 || values.disgusted >= 0.25) return { emotion: "bravo", confidence: Math.max(values.angry, values.disgusted) };
  if (values.sad >= 0.28) return { emotion: "triste", confidence: values.sad };
  if ((values.neutral >= 0.34 && values.sad >= 0.10) || confidence < 0.42) return { emotion: "cansado", confidence: Math.max(values.neutral, values.sad, confidence) };
  if (top === "fearful" || top === "surprised") return { emotion: "neutro", confidence };

  return { emotion: "neutro", confidence: values.neutral || confidence };
}

function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

export default function FaceEmotionDetector({ onCreated }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(0);
  const lastSaveRef = useRef(0);
  const lastDetectRef = useRef(0);

  const [modelsReady, setModelsReady] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("Tudo acontece no navegador. Nenhuma imagem e enviada para o servidor.");
  const [reading, setReading] = useState(emptyReading);
  const [history, setHistory] = useState([]);

  const current = emotionView[reading.emotion] || emotionView.neutro;
  const confidencePercent = Math.round((reading.confidence || 0) * 100);

  const historySummary = useMemo(() => {
    if (!history.length) return "Sem leituras ainda";
    const counts = history.reduce((acc, item) => {
      acc[item.emotion] = (acc[item.emotion] || 0) + 1;
      return acc;
    }, {});
    const [emotion, total] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return `${emotionView[emotion]?.label || emotion}: ${total} leitura${total > 1 ? "s" : ""}`;
  }, [history]);

  async function registerDetectedEmotion() {
    if (!reading.detected || saving) return;

    const scores = emotionScores[reading.emotion] || emotionScores.neutro;
    const view = emotionView[reading.emotion] || emotionView.neutro;
    setSaving(true);
    setMessage(`Registrando emocao detectada: ${view.label}.`);

    try {
      await createEmotion({
        ...scores,
        data: new Date().toISOString().slice(0, 10),
        anotacao: `Registro por leitura facial: ${view.label} com ${confidencePercent}% de confianca.`
      });
      setMessage(`${view.label} registrada no historico emocional.`);
      onCreated?.();
    } catch (error) {
      setMessage(error.response?.data?.message || "Nao consegui registrar a leitura agora. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadModels() {
      try {
        setMessage("Carregando modelos gratuitos de reconhecimento facial...");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        if (!active) return;
        setModelsReady(true);
        setMessage("Modelos prontos. Toque em Ativar camera para comecar.");
      } catch {
        if (!active) return;
        setMessage("Nao consegui carregar os modelos. Verifique a internet e tente novamente.");
      }
    }

    loadModels();

    return () => {
      active = false;
      stopCamera();
    };
  }, []);

  async function startCamera() {
    if (!modelsReady || loading) return;
    setLoading(true);
    setMessage("Solicitando permissao da camera...");

    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 960 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraOn(true);
      setMessage("Camera ativa. Olhe para a tela e mantenha o rosto visivel.");
      detectLoop();
    } catch (error) {
      setCameraOn(false);
      setMessage(error?.name === "NotAllowedError"
        ? "Permissao negada. Libere a camera no navegador para usar a leitura facial."
        : "Nao consegui acessar a camera. Tente novamente em uma pagina HTTPS ou no localhost.");
    } finally {
      setLoading(false);
    }
  }

  function stopCamera() {
    window.cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    const context = canvasRef.current?.getContext("2d");
    context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCameraOn(false);
  }

  async function detectLoop(time = 0) {
    frameRef.current = window.requestAnimationFrame(detectLoop);
    if (!videoRef.current || videoRef.current.readyState < 2 || time - lastDetectRef.current < 220) return;
    lastDetectRef.current = time;

    const video = videoRef.current;
    const displaySize = {
      width: video.videoWidth || video.clientWidth,
      height: video.videoHeight || video.clientHeight
    };

    if (!displaySize.width || !displaySize.height) return;

    const canvas = canvasRef.current;
    faceapi.matchDimensions(canvas, displaySize);

    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
      .withFaceExpressions();

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!detection) {
      setReading((currentReading) => ({
        ...currentReading,
        detected: false,
        note: "Nao encontrei um rosto agora. Aproxime-se um pouco da camera."
      }));
      return;
    }

    const resized = faceapi.resizeResults(detection, displaySize);
    faceapi.draw.drawDetections(canvas, resized);

    const result = mapExpression(detection.expressions);
    const view = emotionView[result.emotion] || emotionView.neutro;
    const nextReading = {
      emotion: result.emotion,
      confidence: result.confidence,
      note: view.note,
      detected: true
    };

    setReading(nextReading);

    if (Date.now() - lastSaveRef.current > 4500 && result.confidence > 0.35) {
      lastSaveRef.current = Date.now();
      setHistory((items) => [
        {
          id: `${Date.now()}-${result.emotion}`,
          emotion: result.emotion,
          confidence: result.confidence,
          time: formatTime()
        },
        ...items
      ].slice(0, 8));
    }
  }

  return (
    <section className="face-panel panel overflow-hidden">
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]">
        <div className="face-camera">
          <video ref={videoRef} className="face-video" playsInline muted />
          <canvas ref={canvasRef} className="face-canvas" />
          {!cameraOn && (
            <div className="face-placeholder">
              <Sparkles size={32} />
              <strong>Leitura facial em tempo real</strong>
              <span>Use a webcam para estimar seu estado emocional no navegador.</span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5 p-4 sm:p-5">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-200">
              <ShieldCheck size={14} />
              processamento local
            </span>
            <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">Camera emocional</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
          </div>

          <div className="emotion-card" style={{ "--emotion-color": current.color }}>
            <div className="flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
              <div className="min-w-0">
                <span className="text-sm font-medium text-muted">Emocao atual</span>
                <strong className="mt-1 block text-2xl text-white sm:text-3xl">{current.label}</strong>
              </div>
              <div className="emotion-emoji" aria-label={current.label}>{current.emoji}</div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">Confianca</span>
                <strong className="text-white">{confidencePercent}%</strong>
              </div>
              <div className="emotion-meter">
                <span style={{ width: `${confidencePercent}%` }} />
              </div>
              <p className="mt-3 text-sm leading-5 text-muted">{reading.note}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button className="btn-primary" type="button" onClick={startCamera} disabled={!modelsReady || loading || cameraOn}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
              {cameraOn ? "Camera ativa" : "Ativar camera"}
            </button>
            <button className="btn-secondary" type="button" onClick={stopCamera} disabled={!cameraOn}>
              <CameraOff size={18} />
              Desligar
            </button>
          </div>

          <button
            className="btn-primary w-full"
            type="button"
            onClick={registerDetectedEmotion}
            disabled={!reading.detected || confidencePercent < 35 || saving}
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {saving ? "Registrando..." : "Registrar emocao detectada"}
          </button>

          <div className="rounded-lg border border-line bg-[#10161d] p-4">
            <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                <History size={16} />
                Historico rapido
              </span>
              <small className="text-xs text-muted">{historySummary}</small>
            </div>
            <div className="mt-3 grid gap-2">
              {history.length ? history.map((item) => (
                <div className="history-pill" key={item.id}>
                  <span>{emotionView[item.emotion]?.emoji}</span>
                  <strong>{emotionView[item.emotion]?.label}</strong>
                  <small>{Math.round(item.confidence * 100)}% - {item.time}</small>
                </div>
              )) : (
                <p className="text-sm text-muted">As leituras confiaveis aparecem aqui automaticamente.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
