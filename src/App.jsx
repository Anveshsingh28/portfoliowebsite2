import { Bot, Code2, Cpu, Mail, Network, Sparkles } from "lucide-react";
import CanvasBackground from "./components/CanvasBackground";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TerminalChat from "./components/TerminalChat";

const navItems = [
  { label: "origin", href: "#hero" },
  { label: "models", href: "#projects" },
  { label: "codex", href: "#terminal" },
];

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <CanvasBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_34%)]" />

      <header className="fixed left-1/2 top-4 z-40 w-[min(calc(100%-1rem),1180px)] -translate-x-1/2 px-2">
        <nav className="glass-panel flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-300 sm:px-5">
          <a href="#hero" className="relative z-10 flex items-center gap-2 font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan-300/20 bg-white/5 shadow-neonCyan">
              <Cpu className="h-4 w-4 text-cyan-200" />
            </span>
            <span className="hidden sm:inline">Antigravity Codex</span>
            <span className="sm:hidden">AC</span>
          </a>

          <div className="relative z-10 hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md border border-transparent px-3 py-2 text-slate-400 transition hover:border-white/10 hover:bg-white/5 hover:text-cyan-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <a
              aria-label="GitHub profile"
              href="https://github.com/YOUR_GITHUB_USERNAME"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              <Code2 className="h-4 w-4" />
            </a>
            <a
              aria-label="LinkedIn profile"
              href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              <Network className="h-4 w-4" />
            </a>
            <a
              aria-label="Email"
              href="mailto:YOUR_EMAIL@example.com"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-36 pt-24 sm:px-6 lg:px-8">
        <Hero />

        <section className="my-10 grid gap-4 md:grid-cols-3">
          {[
            ["LLM Systems", "RAG pipelines, evaluation harnesses, prompt routing"],
            ["Vision AI", "Multimodal inference, vector search, edge optimization"],
            ["MLOps", "Realtime metrics, model governance, deployable agents"],
          ].map(([title, text]) => (
            <div key={title} className="glass-panel rounded-lg p-5">
              <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10">
                <Sparkles className="h-4 w-4 text-cyan-200" />
              </div>
              <h2 className="relative z-10 text-sm font-semibold uppercase tracking-[0.22em] text-white">
                {title}
              </h2>
              <p className="relative z-10 mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </section>

        <Projects />
      </main>

      <div id="terminal" className="sr-only">
        Codex terminal
      </div>
      <TerminalChat />

      <div className="pointer-events-none fixed bottom-8 left-8 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 shadow-glass backdrop-blur-xl lg:flex">
        <Bot className="h-4 w-4" />
        WebGL neural field online
      </div>
    </div>
  );
}
