import { useState, useRef, useEffect, useCallback } from 'react';
import { UNITS, BNAME, TYPE_LABEL } from '../data/units';
import './Chatbot.css';

const i18n = {
  en: {
    name: 'Mirent Assistant',
    sub: 'Always here to help!',
    welcome: "Hi! I can help you check availability, unit types, and booking. What would you like to know?",
    placeholder: 'Type your question...',
    units: 'Units', book: 'How to book', rates: 'Rates',
  },
  fil: {
    name: 'Mirent Assistant',
    sub: 'Lagi kaming handa!',
    welcome: 'Kumusta! Makakatulong ako sa pagtsek ng availability, uri ng unit, at booking. Ano ang gusto mong malaman?',
    placeholder: 'I-type ang iyong tanong...',
    units: 'Mga Unit', book: 'Paano mag-book', rates: 'Mga rate',
  },
};

const QUICK = {
  en: ['Check availability', 'Unit types & rates', 'How to book', 'Contact info'],
  fil: ['Tsek ng availability', 'Uri ng unit at rates', 'Paano mag-book', 'Contact info'],
};

const SYSTEM_PROMPT = `You are Mirent Assistant, a friendly and helpful AI for MiRent — a condo rental platform in Makati, Philippines. You speak naturally in Filipino (Tagalog) or English depending on what the user uses. Mix both naturally if the user does (like "Taglish").

MiRent has 14 units across 3 buildings:
- Gramercy Residences: Studios (₱800/night), 1BR (₱1,200/night), 2BR (₱1,800/night), 3BR (₱2,500/night), Parking (₱300/night)
- Knightsbridge (KBP): Studios (₱900/night), 1BR (₱1,400/night)
- Milano Residences: 2BR (₱2,000/night)

All units include WiFi and AC. Pool and Gym availability vary per unit.

For bookings and inquiries, direct users to use the search feature on the website to find available units and click "Inquire now". For urgent matters, they can contact the property manager directly.

Be warm, concise, and helpful. Keep responses short and focused. If asked about specific unit availability, remind them to use the search/date picker to see real-time availability.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const t = i18n[lang];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.welcome }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!open) setUnread(u => u + 1);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Oops! May problema sa connection. Please try again. 😊',
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function switchLang() {
    const newLang = lang === 'en' ? 'fil' : 'en';
    setLang(newLang);
    const nt = i18n[newLang];
    setMessages([{ role: 'assistant', content: nt.welcome }]);
  }

  return (
    <>
      {/* Bubble */}
      <button className={`chat-bubble${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Open chat">
        {open ? (
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
        {!open && unread > 0 && <span className="chat-badge">{unread}</span>}
      </button>

      {/* Window */}
      <div className={`chat-window${open ? ' open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">🏡</div>
          <div className="chat-header-info">
            <div className="chat-name">{t.name}</div>
            <div className="chat-sub">{t.sub}</div>
          </div>
          <button className="chat-lang-btn" onClick={switchLang} title="Switch language">
            {lang === 'en' ? '🇵🇭' : '🇺🇸'}
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              {msg.role === 'assistant' && <div className="msg-avatar">🏡</div>}
              <div className="msg-bubble">{msg.content}</div>
            </div>
          ))}

          {/* Quick replies — show after welcome */}
          {messages.length === 1 && (
            <div className="chat-quick">
              {QUICK[lang].map(q => (
                <button key={q} className="quick-btn" onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}

          {loading && (
            <div className="chat-msg assistant">
              <div className="msg-avatar">🏡</div>
              <div className="msg-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            className="chat-input"
            placeholder={t.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
          >
            <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
