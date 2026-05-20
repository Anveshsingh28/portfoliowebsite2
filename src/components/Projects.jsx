import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Neural Retrieval Engine",
    kicker: "RAG + Evaluation",
    icon: "Database",
    description:
      "A production retrieval pipeline with semantic chunking, reranking, latency-aware prompt routing, and automated hallucination audits.",
    stack: ["Python", "FastAPI", "FAISS", "OpenAI", "Docker"],
    terminal: ["embeddings: 1.2M indexed", "faithfulness: 98.7%", "p95 latency: 42ms"],
    href: "https://github.com/YOUR_GITHUB_USERNAME/neural-retrieval-engine",
  },
  {
    title: "Computer Vision Sentinel",
    kicker: "Vision AI",
    icon: "Activity",
    description:
      "Realtime anomaly detection for video streams using a hybrid CNN-transformer encoder, edge batching, and confidence-calibrated alerts.",
    stack: ["PyTorch", "ONNX", "WebRTC", "CUDA", "React"],
    terminal: ["mAP@50: 99.2%", "frames/sec: 144", "drift monitor: stable"],
    href: "https://github.com/YOUR_GITHUB_USERNAME/cv-sentinel",
  },
  {
    title: "Autonomous Codex Agent",
    kicker: "LLM Agents",
    icon: "GitBranch",
    description:
      "A tool-using AI engineering agent with WebSocket streaming, memory traces, deterministic task plans, and sandboxed code execution.",
    stack: ["React", "R3F", "FastAPI", "WebSocket", "LLM"],
    terminal: ["plan graph: optimized", "tests: 128 passed", "deploy gate: green"],
    href: "https://github.com/YOUR_GITHUB_USERNAME/codex-agent",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-200">Selected build logs</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
            AI/ML projects with glass shells and engine-room details.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-xl text-sm leading-7 text-slate-400"
        >
          Replace the repository URLs, metrics, and descriptions with your real CSE AI/ML work. The UI is
          intentionally dense enough for recruiters to scan quickly.
        </motion.p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
