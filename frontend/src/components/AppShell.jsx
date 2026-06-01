import { Activity, BarChart3, History, LogOut, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/auth-context";

const navigation = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/historico", label: "Historico", icon: History }
];

export default function AppShell({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-0 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="sticky top-0 z-30 border-b border-line bg-[#0d1218]/95 px-4 py-3 backdrop-blur sm:px-5 lg:static lg:min-h-screen lg:border-b-0 lg:border-r lg:p-6">
        <div className="flex min-w-0 items-center justify-between gap-3 lg:block">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-400 text-slate-950 sm:h-11 sm:w-11">
              <Activity size={24} />
            </div>
            <div className="min-w-0">
              <strong className="block truncate text-base sm:text-lg">FluidCode</strong>
              <span className="text-xs text-muted">saude emocional</span>
            </div>
          </div>
          <button className="btn-secondary px-3 lg:hidden" onClick={logout} title="Sair">
            <LogOut size={18} />
          </button>
        </div>

        <nav className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-10 lg:block lg:space-y-2 lg:overflow-visible lg:px-0 lg:pb-0">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => [
                  "inline-flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition lg:flex lg:shrink",
                  isActive
                    ? "bg-teal-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                ].join(" ")}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="panel mt-10 hidden p-4 lg:block">
          <Sparkles className="mb-3 text-amber-300" size={20} />
          <p className="text-sm font-semibold text-slate-100">{user?.nome}</p>
          <p className="mt-1 break-all text-xs text-muted">{user?.email}</p>
          <button className="btn-secondary mt-4 w-full" onClick={logout}>
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        {children}
      </main>
    </div>
  );
}
