import { useState } from 'react'

const t = {
  en: {
    triggerTitle: 'Ask Mirent Assistant', triggerSub: 'Available 24/7 — answers in EN or FIL',
    panelTitle: 'Mirent Assistant', greeting: 'Hi! I can help you check availability, unit types, and how to book. What would you like to know?',
    placeholder: 'Type your question...', quickBtns: ['Available units', 'How to book', 'Rates'],
    botRates: 'Pricing is shared directly by agents. Tap "How to book" to connect with one.',
    botBook: 'To book, contact an agent directly. Tap the Inquire button on any unit.',
    botAvail: 'Check the calendar above for real-time availability. Green = open!',
    botDefault: 'For more details, please inquire via the unit cards above or contact an agent.'
  },
  fil: {
    triggerTitle: 'Tanungin ang Mirent Assistant', triggerSub: 'Bukas 24/7 — sumasagot sa EN o FIL',
    panelTitle: 'Mirent Assistant', greeting: 'Kumusta! Matutulungan kita tungkol sa availability, uri ng unit, at paraan ng pag-book.',
    placeholder: 'I-type ang iyong tanong...', quickBtns: ['Mga available na unit', 'Paano mag-book', 'Presyo'],
    botRates: 'Ang presyo ay ibinibigay ng mga ahente. I-tap ang "Paano mag-book" para makakonekta.',
    botBook: 'Para mag-book, makipag-ugnayan sa ahente. I-tap ang Magtanong sa anumang unit.',
    botAvail: 'Tingnan ang calendar para sa real-time na availability. Berde = libre!',
    botDefault: 'Para sa karagdagang detalye, makipag-ugnayan sa pamamagitan ng unit cards o ahente.'
  }
}

function getBotReply(text, lang) {
  const q = text.toLowerCase()
  const l = t[lang]
  if (q.includes('rate') || q.includes('price') || q.includes('presyo') || q.includes('magkano')) return l.botRates
  if (q.includes('book') || q.includes('reserve') || q.includes('mag-book')) return l.botBook
  if (q.includes('avail') || q.includes('bakante') || q.includes('unit')) return l.botAvail
  return l.botDefault
}

export default function Chatbot({ lang, open, setOpen }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const addMsg = (text, type) => setMessages(prev => [...prev, { text, type }])

  const sendMsg = (text) => {
    if (!text.trim()) return
    addMsg(text, 'user')
    setInput('')
    setTimeout(() => addMsg(getBotReply(text, lang), 'bot'), 500)
  }

  return (
    <>
      {!open && (
        <div onClick={() => setOpen(true)} style={{
          background: 'var(--surface)', border: '1px solid var(--gold-dim)',
          borderRadius: 12, padding: '14px 16px', margin: '0 16px 16px',
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer'
        }}>
          <div style={{
            width: 38, height: 38, background: '#1e3a8a', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0
          }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 2 }}>
              {t[lang].triggerTitle}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t[lang].triggerSub}</div>
          </div>
          <span style={{ color: 'var(--subtle)', fontSize: 18 }}>›</span>
        </div>
      )}

      {open && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, margin: '0 16px 16px', overflow: 'hidden'
        }}>
          <div style={{
            background: '#1e3a8a', padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', flex: 1 }}>
              {t[lang].panelTitle}
            </span>
            <button onClick={() => setOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
              width: 24, height: 24, borderRadius: 6, fontSize: 14
            }}>×</button>
          </div>

          <div style={{ padding: 12, minHeight: 140, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              maxWidth: '85%', padding: '8px 10px', borderRadius: 10,
              background: 'var(--surface2)', color: 'var(--text)', fontSize: 12, lineHeight: 1.5
            }}>
              {t[lang].greeting}
            </div>
            {messages.map((msg, i) => (
              <div key={i} style={{
                maxWidth: '85%', padding: '8px 10px', borderRadius: 10, fontSize: 12, lineHeight: 1.5,
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                background: msg.type === 'user' ? '#1e3a8a' : 'var(--surface2)',
                color: msg.type === 'user' ? '#dbeafe' : 'var(--text)'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 12px 10px' }}>
            {t[lang].quickBtns.map((btn, i) => (
              <button key={i} onClick={() => sendMsg(btn)} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                color: 'var(--muted)', fontSize: 11, padding: '5px 10px', borderRadius: 20
              }}>
                {btn}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, padding: '10px 12px', borderTop: '1px solid var(--border)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
              placeholder={t[lang].placeholder}
              style={{
                flex: 1, background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 10px', color: 'var(--text)', fontSize: 12
              }}
            />
            <button onClick={() => sendMsg(input)} style={{
              background: 'var(--blue)', border: 'none', color: '#fff',
              width: 34, height: 34, borderRadius: 8, fontSize: 16
            }}>›</button>
          </div>
        </div>
      )}
    </>
  )
}