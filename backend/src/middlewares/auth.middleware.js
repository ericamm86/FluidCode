import jwt from "jsonwebtoken";

export function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token nao informado." });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token invalido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    return next();
  } catch {
    return res.status(401).json({ message: "Token invalido ou expirado." });
  }
}
