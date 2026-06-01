import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const SALT_ROUNDS = 10;

export async function registerUser({ nome, email, senha }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (existingUser) {
    const error = new Error("Este email ja esta cadastrado.");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      nome: nome.trim(),
      email: normalizedEmail,
      senha: hashedPassword
    },
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true
    }
  });

  return {
    user,
    token: generateToken(user.id)
  };
}

export async function loginUser({ email, senha }) {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() }
  });

  if (!user) {
    const error = new Error("Email ou senha invalidos.");
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(senha, user.senha);

  if (!passwordMatches) {
    const error = new Error("Email ou senha invalidos.");
    error.status = 401;
    throw error;
  }

  return {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      createdAt: user.createdAt
    },
    token: generateToken(user.id)
  };
}

export async function getUserProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true
    }
  });
}

function generateToken(userId) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}
