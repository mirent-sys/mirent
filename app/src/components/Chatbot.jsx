import { useState, useRef, useEffect, useCallback } from "react";

const i18n = {
  en: {
    name: "Mirent Assistant", sub: "Always here to help!",
    welcome: "Hi! I can help you check availability, unit types, and how to book. What would you like to know?",
    placeholder: "Type your question...",
    units: "Units", book: "How to book", rates: "Rates",
  },
  fil: {
    name: "Mirent Assistant", sub: "Lagi kaming handa!",
    welcome: "Kumusta! Makakatulong ako sa pagtsek ng availability, uri ng unit, at paraan ng pag-book. Ano ang gusto mong malaman?",
    placeholder: "I-type ang iyong tanong...",
    units: "Mga Unit", book: "Paano mag-book", rates: "Mga rate",
  },
};

const QUICK = {
  en:  { units: "What units are available?", book: "How do I book a unit?", rates: "What are your rates?" },
  fil: { units: "Anong mga unit ang available?", book: "Paano mag-book ng unit?", rates: "Magkano ang mga rate?" },
};

// How many seconds of idle before auto-collapsing
const IDLE_TIMEOUT_MS = 15000;

export default function Chatbot({ lang = "en" }) {
  const t = i18n[lang] ?? i18n.en;
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState([{ role: "bot", text: t.welcome }]);
  const [loading, setLoading]   = useState(false);
  const [pulse, setPulse]       = useState(true); // attention pulse on bubble
  const bottomRef  = useRef(null);
  const idleTimer  = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Stop pulse animation after 3s so it's not annoying forever
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Reset idle timer whenever there's activity inside the chat
  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setOpen(false);
    }, IDLE_TIMEOUT_MS);
  }, []);

  // Start idle timer when chat opens; clear when it closes
  useEffect(() => {
    if (open) {
      resetIdle();
    } else {
      clearTimeout(idleTimer.current);
    }
    return () => clearTimeout(idleTimer.current);
  }, [open, resetIdle]);

  const handleOpen = () => {
    setOpen(true);
    setPulse(false);
  };

  const sendMsg = async (text) => {
    if (!text.trim() || loading) return;
    resetIdle(); // reset idle on every send
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Mirent Assistant, a friendly AI chatbot for Mirent — a condo rental platform in the Philippines.
You help users with:
- Checking unit availability (Studio, 1-Bedroom, 2-Bedroom)
- Explaining how to book (click Inquire button, fill form, wait for confirmation)
- Sharing rates (Studio: ₱800/night, 1-Bedroom: ₱1,200/night, 2-Bedroom: ₱1,800/night)
- Explaining promos (Long stay 7 nights: 10% off)
Keep answers short, warm, and helpful. Use a bit of Filipino flavor when appropriate.`,
          messages: [{ role: "user", content: text }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(i => i.text || "").join("") || "Sorry, I couldn't get a response. Please try again!";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setLoading(false);
      resetIdle(); // reset idle after response too
    }
  };

  return (
    <>
      <style>{`
        /* ── Floating bubble ── */
        .cb-bubble {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          box-shadow: 0 4px 20px rgba(124,58,237,.45);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 400;
          border: none;
          outline: none;
          font-size: 1.4rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cb-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(124,58,237,.6);
        }
        .cb-bubble.pulse::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #a855f7;
          animation: cb-ring 1.4s ease-out infinite;
        }
        @keyframes cb-ring {
          0%   { transform: scale(1);   opacity: .8; }
          100% { transform: scale(1.6); opacity: 0;  }
        }

        /* ── Chat window ── */
        .cb-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 340px;
          z-index: 399;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(30,10,60,.25);
          /* Enter/exit animation */
          transform-origin: bottom right;
          animation: cb-in 0.22s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .cb-window.closing {
          animation: cb-out 0.18s ease-in forwards;
        }
        @keyframes cb-in {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }
        @keyframes cb-out {
          from { opacity: 1; transform: scale(1)   translateY(0);    }
          to   { opacity: 0; transform: scale(0.7) translateY(20px); }
        }

        /* ── Header ── */
        .cb-header {
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cb-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .cb-head-info { flex: 1; }
        .cb-head-name { font-weight: 800; font-size: 0.95rem; color: #fff; }
        .cb-head-sub  { font-size: 0.72rem; color: rgba(255,255,255,0.7); }
        .cb-close-btn {
          background: rgba(255,255,255,0.15); border: none; color: #fff;
          width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
          font-size: 1rem; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .cb-close-btn:hover { background: rgba(255,255,255,0.3); }

        /* ── Body ── */
        .cb-body {
          background: var(--chat-bg, #f3f0ff);
          border: 1px solid var(--border, #e5e0f8);
          border-top: none;
          border-radius: 0 0 16px 16px;
        }
        .cb-messages {
          height: 240px; overflow-y: auto;
          padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-thumb { background: var(--border,#e5e0f8); border-radius: 4px; }

        .msg { max-width: 85%; padding: 9px 13px; border-radius: 14px; font-size: 0.83rem; line-height: 1.4; }
        .msg-bot  { background: var(--surface,#fff); color: var(--text,#1e1433); align-self: flex-start; border: 1px solid var(--border,#e5e0f8); border-bottom-left-radius: 4px; }
        .msg-user { background: #7c3aed; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }

        .typing { display:flex; gap:4px; align-items:center; padding:9px 13px; background:var(--surface,#fff); border:1px solid var(--border,#e5e0f8); border-radius:14px; border-bottom-left-radius:4px; align-self:flex-start; }
        .typing span { width:7px; height:7px; border-radius:50%; background:#8b5cf6; animation:bounce 1.2s infinite; }
        .typing span:nth-child(2) { animation-delay:.2s; }
        .typing span:nth-child(3) { animation-delay:.4s; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }

        .cb-quick { padding: 8px 14px 10px; display: flex; gap: 6px; flex-wrap: wrap; }
        .quick-btn {
          background: var(--surface,#fff); border: 1px solid var(--border,#e5e0f8);
          border-radius: 20px; padding: 4px 12px; font-size: 0.75rem; font-weight: 700;
          color: #7c3aed; cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .quick-btn:hover { background: #7c3aed; color: #fff; border-color: #7c3aed; }

        .cb-input-row { display: flex; gap: 8px; padding: 0 14px 14px; align-items: center; }
        .cb-input {
          flex: 1; background: var(--surface,#fff); border: 1px solid var(--border,#e5e0f8);
          border-radius: 20px; padding: 8px 14px; font-size: 0.83rem;
          color: var(--text,#1e1433); outline: none; transition: border-color 0.2s;
        }
        .cb-input:focus { border-color: #7c3aed; }
        .cb-input::placeholder { color: var(--text-muted,#6b6080); }
        .cb-send-btn {
          width: 36px; height: 36px; border-radius: 50%; background: #7c3aed;
          border: none; color: #fff; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
        }
        .cb-send-btn:hover { background: #6d28d9; transform: scale(1.08); }
        .cb-send-btn:disabled { background: #c4b5fd; cursor: not-allowed; transform: none; }
      `}</style>

      {/* Floating bubble — always visible */}
      {!open && (
        <button
          className={`cb-bubble${pulse ? " pulse" : ""}`}
          onClick={handleOpen}
          aria-label="Open Mirent Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat window — only when open */}
      {open && (
        <div className="cb-window" onMouseMove={resetIdle} onKeyDown={resetIdle}>
          {/* Header */}
          <div className="cb-header">
            <div className="cb-avatar">🤖</div>
            <div className="cb-head-info">
              <div className="cb-head-name">{t.name}</div>
              <div className="cb-head-sub">{t.sub}</div>
            </div>
            <button
              className="cb-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              −
            </button>
          </div>

          {/* Messages */}
          <div className="cb-body">
            <div className="cb-messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg msg-${m.role}`}>{m.text}</div>
              ))}
              {loading && (
                <div className="typing"><span/><span/><span/></div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="cb-quick">
              <button className="quick-btn" onClick={() => { resetIdle(); sendMsg(QUICK[lang].units); }}>{t.units}</button>
              <button className="quick-btn" onClick={() => { resetIdle(); sendMsg(QUICK[lang].book); }}>{t.book}</button>
              <button className="quick-btn" onClick={() => { resetIdle(); sendMsg(QUICK[lang].rates); }}>{t.rates}</button>
            </div>

            {/* Input */}
            <div className="cb-input-row">
              <input
                className="cb-input"
                value={input}
                placeholder={t.placeholder}
                onChange={e => { setInput(e.target.value); resetIdle(); }}
                onKeyDown={e => { if (e.key === "Enter") sendMsg(input); }}
              />
              <button
                className="cb-send-btn"
                onClick={() => sendMsg(input)}
                disabled={loading}
                aria-label="Send"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
