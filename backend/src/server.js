import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import emotionalRoutes from "./routes/emotional.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(new URL(origin).hostname)) {
      return callback(null, true);
    }

    return callback(new Error("Origem nao permitida pelo CORS."));
  }
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "FluidCode API" });
});

app.use(authRoutes);
app.use(emotionalRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota nao encontrada." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Erro interno do servidor."
  });
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`API FluidCode rodando na porta ${port}`);
  });
}

export default app;
