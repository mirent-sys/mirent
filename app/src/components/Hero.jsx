const t = {
  en: { title: 'Find your perfect stay', sub: 'Browse available units — no signup needed', search: 'Search by unit type or dates...' },
  fil: { title: 'Hanapin ang iyong unit', sub: 'Tingnan ang mga bakanteng unit — walang signup', search: 'Maghanap ng unit o petsa...' }
}

export default function Hero({ lang }) {
  return (
    <div style={{
      background: 'var(--navy)', padding: '28px 16px 24px',
      textAlign: 'center', borderBottom: '1px solid #1e3a8a'
    }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
        {t[lang].title}
      </h1>
      <p style={{ fontSize: 13, color: '#93c5fd', marginBottom: 16 }}>
        {t[lang].sub}
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 10, padding: '10px 14px', display: 'flex',
        alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 13
      }}>
        🔍 {t[lang].search}
      </div>
    </div>
  )
}