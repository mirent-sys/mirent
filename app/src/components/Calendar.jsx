import { useState } from 'react'

const t = {
  en: { label: 'Availability calendar', days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    legend: { vacant:'Vacant', booked:'Booked', hold:'On hold', pending:'Pending', checkout:'Checkout day', cleaning:'Cleaning', blocked:'Blocked' }},
  fil: { label: 'Calendar ng availability', days: ['Li','Lu','Ma','Mi','Hu','Bi','Sa'],
    legend: { vacant:'Bakante', booked:'Na-book na', hold:'Nakahold', pending:'Pending', checkout:'Araw ng checkout', cleaning:'Paglilinis', blocked:'Nablock' }}
}

const legendColors = {
  vacant: '#14532d', booked: '#7f1d1d', hold: '#713f12',
  pending: '#1e3a8a', checkout: '#7c2d12', cleaning: '#134e4a', blocked: '#1f2937'
}

const textColors = {
  vacant: '#86efac', booked: '#fca5a5', hold: '#fde68a',
  pending: '#93c5fd', checkout: '#fed7aa', cleaning: '#99f6e4', blocked: '#6b7280'
}

function seedMonth(y, m) {
  const pool = ['vacant','vacant','vacant','booked','hold','pending','checkout','cleaning','blocked']
  const days = new Date(y, m + 1, 0).getDate()
  const result = {}
  for (let d = 1; d <= days; d++) {
    const date = new Date(y, m, d)
    result[d] = date < new Date(2026, 4, 10) ? 'past' : pool[Math.floor(Math.random() * pool.length)]
  }
  return result
}

export default function Calendar({ lang }) {
  const [month, setMonth] = useState(4)
  const [year, setYear] = useState(2026)
  const [cache] = useState({})

  if (!cache[`${year}-${month}`]) cache[`${year}-${month}`] = seedMonth(year, month)
  const statuses = cache[`${year}-${month}`]

  const changeMonth = (dir) => {
    let m = month + dir, y = year
    if (m > 11) { m = 0; y++ }
    if (m < 0) { m = 11; y-- }
    setMonth(m); setYear(y)
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthLabel = new Date(year, month, 1).toLocaleString('default', { month: 'long' }) + ' ' + year

  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
        {t[lang].label}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => changeMonth(-1)} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', width: 30, height: 30, borderRadius: 8, fontSize: 16 }}>‹</button>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{monthLabel}</span>
          <button onClick={() => changeMonth(1)} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', width: 30, height: 30, borderRadius: 8, fontSize: 16 }}>›</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
          {t[lang].days.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'var(--subtle)', padding: '4px 0', fontWeight: 500 }}>{d}</div>
          ))}
          {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const d = i + 1
            const s = statuses[d] || 'vacant'
            const isPast = s === 'past'
            return (
              <div key={d} style={{
                aspectRatio: '1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 500, cursor: isPast ? 'not-allowed' : 'pointer',
                background: isPast ? 'transparent' : legendColors[s],
                color: isPast ? 'var(--subtle)' : textColors[s],
                opacity: isPast ? 0.4 : 1
              }}>{d}</div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 14 }}>
          {Object.entries(t[lang].legend).map(([key, label]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: legendColors[key], flexShrink: 0 }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}