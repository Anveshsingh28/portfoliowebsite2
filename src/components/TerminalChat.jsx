import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, Terminal, Wifi, WifiOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function resolveSocketUrl() {
  if (import.meta.env.VITE_CODEX_WS_URL) return import.meta.env.VITE_CODEX_WS_URL;

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${window.location.hostname}:8000/ws/chat`;
}

const bootMessages = [
  { role: "system", content: "codex kernel ready. websocket handshake pending..." },
  { role: "assistant", content: "Ask about my AI/ML projects, stack, internships, or research direction." },
];

export default function TerminalChat() {
  const socketUrl = useMemo(() => resolveSocketUrl(), []);
  const socketRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const scrollRef = useRef(null);
  const activeAssistantIdRef = useRef(null);
  const [messages, setMessages] = useState(bootMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connection, setConnection] = useState("connecting");

  const appendMessage = useCallback((message) => {
    setMessages((current) => [...current, { id: crypto.randomUUID(), ...message }]);
  }, []);

  useEffect(() => {
    let shouldReconnect = true;

    function openSocket() {
      setConnection("connecting");

      const ws = new WebSocket(socketUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setConnection("online");
        appendMessage({ role: "system", content: `connected ${socketUrl.replace(/^wss?:\/\//, "")}` });
      };

      ws.onmessage = (event) => {
        let packet;

        try {
          packet = JSON.parse(event.data);
        } catch {
          packet = { type: "token", token: event.data };
        }

        if (packet.type === "ready") return;

        if (packet.type === "typing") {
          setIsTyping(Boolean(packet.active));
          return;
        }

        if (packet.type === "token") {
          setIsTyping(false);
          setMessages((current) =>
            current.map((message) =>
              message.id === activeAssistantIdRef.current
                ? { ...message, content: `${message.content}${packet.token}` }
                : message,
            ),
          );
          return;
        }

        if (packet.type === "done") {
          setIsTyping(false);
          activeAssistantIdRef.current = null;
          return;
        }

        if (packet.type === "error") {
          setIsTyping(false);
          appendMessage({ role: "system", content: `error: ${packet.message}` });
        }
      };

      ws.onclose = () => {
        setConnection("offline");
        setIsTyping(false);
        if (shouldReconnect) {
          reconnectTimerRef.current = window.setTimeout(openSocket, 1800);
        }
      };

      ws.onerror = () => {
        setConnection("offline");
        ws.close();
      };
    }

    openSocket();

    return () => {
      shouldReconnect = false;
      window.clearTimeout(reconnectTimerRef.current);
      socketRef.current?.close();
    };
  }, [appendMessage, socketUrl]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function sendPrompt(event) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    appendMessage({ role: "user", content: prompt });
    const assistantId = crypto.randomUUID();
    activeAssistantIdRef.current = assistantId;
    setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "" }]);
    setIsTyping(true);
    setInput("");

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          prompt,
          session_id: "portfolio-terminal",
        }),
      );
    } else {
      setIsTyping(false);
      appendMessage({ role: "system", content: "backend offline. start FastAPI on port 8000 and try again." });
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="glass-terminal terminal-grid fixed bottom-3 right-3 z-50 flex h-[min(40svh,330px)] w-[min(calc(100vw-1.5rem),430px)] flex-col sm:bottom-4 sm:right-4 sm:h-[520px] sm:w-[min(calc(100vw-2rem),430px)]"
    >
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.7)]" />
          <span className="h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_14px_rgba(253,224,71,0.55)]" />
          <span className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.55)]" />
        </div>

        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <Terminal className="h-3.5 w-3.5 text-cyan-200" />
          codex.chat
        </div>

        <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em]">
          {connection === "online" ? <Wifi className="h-3.5 w-3.5 text-green-300" /> : <WifiOff className="h-3.5 w-3.5 text-red-300" />}
          <span className={connection === "online" ? "text-green-200" : "text-red-200"}>{connection}</span>
        </div>
      </div>

      <div ref={scrollRef} className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id ?? `${message.role}-${message.content}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs leading-6"
            >
              <span
                className={
                  message.role === "user"
                    ? "text-fuchsia-200"
                    : message.role === "system"
                      ? "text-slate-500"
                      : "text-cyan-200"
                }
              >
                {message.role === "user" ? "you" : message.role === "system" ? "sys" : "codex"}$
              </span>{" "}
              <span className="whitespace-pre-wrap text-slate-200">{message.content}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-100">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>streaming tensor response...</span>
          </div>
        )}
      </div>

      <form onSubmit={sendPrompt} className="relative z-10 border-t border-white/10 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
          <span className="pl-2 text-sm text-fuchsia-200">&gt;</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="query portfolio graph..."
            className="min-w-0 flex-1 bg-transparent text-sm text-cyan-50 outline-none placeholder:text-slate-600"
            autoComplete="off"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 transition hover:bg-cyan-300/20"
            aria-label="Send terminal command"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </motion.aside>
  );
}
