import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../services/auth-context";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register(form.nome, form.email, form.senha);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Nao foi possivel criar sua conta.");
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Transforme registros diarios em leitura emocional.">
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="label">Nome</span>
          <input
            className="input mt-2"
            value={form.nome}
            onChange={(event) => setForm({ ...form, nome: event.target.value })}
            required
            minLength={2}
          />
        </label>

        <label className="block">
          <span className="label">Email</span>
          <input
            className="input mt-2"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>

        <label className="block">
          <span className="label">Senha</span>
          <input
            className="input mt-2"
            type="password"
            value={form.senha}
            onChange={(event) => setForm({ ...form, senha: event.target.value })}
            required
            minLength={6}
          />
        </label>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <button className="btn-primary w-full" type="submit" disabled={loading}>
          <UserPlus size={18} />
          {loading ? "Criando..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Ja tem conta?{" "}
        <Link className="font-semibold text-teal-300 hover:text-teal-200" to="/login">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
