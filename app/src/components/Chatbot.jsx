import { useState, useRef, useEffect } from "react";

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

export default function Chatbot({ lang }) {
  const t = i18n[lang];
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState([{ role: "bot", text: t.welcome }]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMsg = async (text) => {
    if (!text.trim()) return;
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
    }
  };

  return (
    <>
      <style>{`
        .chat-widget {
          position: fixed; bottom: 24px; right: 24px;
          width: 340px; z-index: 300;
        }
        .chat-header {
          background: linear-gradient(90deg,#7c3aed,#a855f7);
          border-radius: 16px 16px 0 0;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; user-select: none;
          box-shadow: 0 4px 20px rgba(124,58,237,.3);
        }
        .chat-widget.minimized .chat-header { border-radius: 16px; }
        .chat-avatar { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
        .chat-head-info { flex:1; }
        .chat-head-name { font-weight:800; font-size:0.95rem; color:#fff; }
        .chat-head-sub  { font-size:0.72rem; color:rgba(255,255,255,0.7); }
        .chat-min-btn { background:rgba(255,255,255,0.15); border:none; color:#fff; width:26px; height:26px; border-radius:50%; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; }
        .chat-min-btn:hover { background:rgba(255,255,255,0.3); }

        .chat-body { background:var(--chat-bg,#f3f0ff); border:1px solid var(--border,#e5e0f8); border-top:none; border-radius:0 0 16px 16px; overflow:hidden; }
        .chat-widget.minimized .chat-body { display:none; }

        .chat-messages { height:240px; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px; }
        .chat-messages::-webkit-scrollbar { width:4px; }
        .chat-messages::-webkit-scrollbar-thumb { background:var(--border,#e5e0f8); border-radius:4px; }

        .msg { max-width:85%; padding:9px 13px; border-radius:14px; font-size:0.83rem; line-height:1.4; }
        .msg-bot  { background:var(--surface,#fff); color:var(--text,#1e1433); align-self:flex-start; border:1px solid var(--border,#e5e0f8); border-bottom-left-radius:4px; }
        .msg-user { background:#7c3aed; color:#fff; align-self:flex-end; border-bottom-right-radius:4px; }

        .typing { display:flex; gap:4px; align-items:center; padding:9px 13px; background:var(--surface,#fff); border:1px solid var(--border,#e5e0f8); border-radius:14px; border-bottom-left-radius:4px; align-self:flex-start; }
        .typing span { width:7px; height:7px; border-radius:50%; background:#8b5cf6; animation:bounce 1.2s infinite; }
        .typing span:nth-child(2) { animation-delay:.2s; }
        .typing span:nth-child(3) { animation-delay:.4s; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }

        .chat-quick { padding:8px 14px 10px; display:flex; gap:6px; flex-wrap:wrap; }
        .quick-btn { background:var(--surface,#fff); border:1px solid var(--border,#e5e0f8); border-radius:20px; padding:4px 12px; font-size:0.75rem; font-weight:700; color:#7c3aed; cursor:pointer; transition:background 0.2s,color 0.2s; }
        .quick-btn:hover { background:#7c3aed; color:#fff; border-color:#7c3aed; }

        .chat-input-row { display:flex; gap:8px; padding:0 14px 14px; align-items:center; }
        .chat-input { flex:1; background:var(--surface,#fff); border:1px solid var(--border,#e5e0f8); border-radius:20px; padding:8px 14px; font-size:0.83rem; color:var(--text,#1e1433); outline:none; transition:border-color 0.2s; }
        .chat-input:focus { border-color:#7c3aed; }
        .chat-input::placeholder { color:var(--text-muted,#6b6080); }
        .chat-send-btn { width:36px; height:36px; border-radius:50%; background:#7c3aed; border:none; color:#fff; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.2s,transform 0.15s; }
        .chat-send-btn:hover { background:#6d28d9; transform:scale(1.08); }
      `}</style>

      <div className={`chat-widget${open ? "" : " minimized"}`}>
        <div className="chat-header" onClick={() => setOpen(!open)}>
          <div className="chat-avatar">🤖</div>
          <div className="chat-head-info">
            <div className="chat-head-name">{t.name}</div>
            <div className="chat-head-sub">{t.sub}</div>
          </div>
          <button className="chat-min-btn" onClick={e => { e.stopPropagation(); setOpen(!open); }}>
            {open ? "−" : "+"}
          </button>
        </div>

        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg msg-${m.role}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="typing"><span/><span/><span/></div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-quick">
            <button className="quick-btn" onClick={() => sendMsg(QUICK[lang].units)}>{t.units}</button>
            <button className="quick-btn" onClick={() => sendMsg(QUICK[lang].book)}>{t.book}</button>
            <button className="quick-btn" onClick={() => sendMsg(QUICK[lang].rates)}>{t.rates}</button>
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              placeholder={t.placeholder}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") sendMsg(input); }}
            />
            <button className="chat-send-btn" onClick={() => sendMsg(input)}>➤</button>
          </div>
        </div>
      </div>
    </>
  );
}
