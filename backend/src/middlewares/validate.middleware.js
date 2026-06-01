export function validateAuth(req, res, next) {
  const { nome, email, senha } = req.body;
  const isRegister = req.path === "/register";

  if (isRegister && (!nome || nome.trim().length < 2)) {
    return res.status(400).json({ message: "Nome deve ter pelo menos 2 caracteres." });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email invalido." });
  }

  if (!senha || senha.length < 6) {
    return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres." });
  }

  return next();
}

export function validateEmotion(req, res, next) {
  const { humor, estresse, energia } = req.body;
  const values = [humor, estresse, energia].map(Number);
  const invalid = values.some((value) => !Number.isInteger(value) || value < 1 || value > 10);

  if (invalid) {
    return res.status(400).json({
      message: "Humor, estresse e energia devem ser numeros inteiros de 1 a 10."
    });
  }

  if (req.body.data && Number.isNaN(new Date(req.body.data).getTime())) {
    return res.status(400).json({ message: "Data invalida." });
  }

  return next();
}
