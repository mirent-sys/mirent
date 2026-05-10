const t = {
  en: {
    label: 'Available units', available: 'Available', partial: 'Partially available',
    highFloor: 'High floor', midFloor: 'Mid floor', inquire: 'Inquire about this unit'
  },
  fil: {
    label: 'Mga available na unit', available: 'Available', partial: 'Bahagyang available',
    highFloor: 'Mataas na palapag', midFloor: 'Gitnang palapag', inquire: 'Magtanong tungkol sa unit na ito'
  }
}

const units = [
  { type: 'Studio Unit', tower: 'Tower A', floor: 'highFloor', status: 'available' },
  { type: '1-Bedroom Unit', tower: 'Tower B', floor: 'midFloor', status: 'partial' },
  { type: '2-Bedroom Unit', tower: 'Tower A', floor: 'highFloor', status: 'available' },
]

export default function UnitCards({ lang, onInquire }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
        {t[lang].label}
      </div>
      {units.map((unit, i) => (
        <div key={i} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: 14, marginBottom: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{unit.type}</span>
            <span style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 20,
              background: unit.status === 'available' ? '#14532d' : '#713f12',
              color: unit.status === 'available' ? '#86efac' : '#fde68a'
            }}>
              {t[lang][unit.status]}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
            🏢 {unit.tower} &nbsp;&nbsp; 🪜 {t[lang][unit.floor]}
          </div>
          <button onClick={onInquire} style={{
            width: '100%', background: 'var(--blue)', color: '#fff', border: 'none',
            padding: 9, borderRadius: 8, fontSize: 13, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            💬 {t[lang].inquire}
          </button>
        </div>
      ))}
    </div>
  )
}