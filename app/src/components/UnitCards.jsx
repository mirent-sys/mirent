const t = {
  en: {
    label: 'Units', available: 'Open', partial: 'Partial',
    highFloor: 'High floor', midFloor: 'Mid floor', inquire: 'Inquire'
  },
  fil: {
    label: 'Mga unit', available: 'Libre', partial: 'Bahagya',
    highFloor: 'Mataas', midFloor: 'Gitna', inquire: 'Magtanong'
  }
}

const units = [
  { type: 'Studio', tower: 'Tower A', floor: 'highFloor', status: 'available' },
  { type: '1-Bedroom', tower: 'Tower B', floor: 'midFloor', status: 'partial' },
  { type: '2-Bedroom', tower: 'Tower A', floor: 'highFloor', status: 'available' },
]

export default function UnitCards({ lang, onInquire }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="section-label">{t[lang].label}</div>
      {units.map((unit, i) => (
        <div key={i} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '8px 10px', marginBottom: 6,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{unit.type}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>🏢 {unit.tower} · 🪜 {t[lang][unit.floor]}</div>
          </div>
          <span style={{
            fontSize: 10, padding: '2px 7px', borderRadius: 20, marginRight: 4,
            background: unit.status === 'available' ? '#14532d' : '#713f12',
            color: unit.status === 'available' ? '#86efac' : '#fde68a'
          }}>{t[lang][unit.status]}</span>
          <button onClick={onInquire} style={{
            background: 'var(--blue)', color: '#fff', border: 'none',
            padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500
          }}>{t[lang].inquire}</button>
        </div>
      ))}
    </div>
  )
}