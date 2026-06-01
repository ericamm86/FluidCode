import { Activity } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-6 sm:px-5 sm:py-10">
      <section className="w-full max-w-md">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-teal-400 text-slate-950 sm:h-14 sm:w-14">
            <Activity size={30} />
          </div>
          <h1 className="text-2xl font-bold tracking-normal text-white sm:text-3xl">FluidCode</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>

        <div className="panel p-5 sm:p-8">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {children}
        </div>
      </section>
    </main>
  );
}
