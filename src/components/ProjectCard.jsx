import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, ArrowUpRight, Cpu, Database, GitBranch, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

const iconMap = {
  Activity,
  Cpu,
  Database,
  GitBranch,
  ShieldCheck,
};

export default function ProjectCard({ project, index }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 210, damping: 24, mass: 0.65 });
  const springY = useSpring(rotateY, { stiffness: 210, damping: 24, mass: 0.65 });
  const glareOpacity = useTransform(pointerX, [0, 50, 100], [0.24, 0.08, 0.24]);
  const glare = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(255,255,255,${glareOpacity}) 0%, rgba(0,255,255,0.10) 18%, transparent 44%)`;

  const Icon = useMemo(() => iconMap[project.icon] ?? Cpu, [project.icon]);

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const px = localX / rect.width;
    const py = localY / rect.height;

    rotateX.set((0.5 - py) * 13);
    rotateY.set((px - 0.5) * 16);
    pointerX.set(px * 100);
    pointerY.set(py * 100);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    pointerX.set(50);
    pointerY.set(50);
  }

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6.5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1100,
      }}
      className="glass-card preserve-3d group min-h-[470px] rounded-lg p-5 transition duration-300 hover:border-cyan-300/30"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-[1] rounded-lg opacity-80" style={{ background: glare }} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-neonCyan">
            <Icon className="h-5 w-5" />
          </div>
          <a
            href={project.href}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition group-hover:border-cyan-300/30 group-hover:text-cyan-100"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-7">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">{project.kicker}</p>
          <h3 className="mt-3 text-2xl font-black leading-tight text-white">{project.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">{project.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-xs shadow-inner shadow-black/40">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">run.log</span>
            </div>
            <div className="space-y-2 text-cyan-100">
              {project.terminal.map((line) => (
                <p key={line} className="leading-5">
                  <span className="text-fuchsia-300">&gt;</span> {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
