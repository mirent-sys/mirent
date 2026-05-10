const t = {
  en: { label: 'Promos', title: 'Long stay — 7 nights', sub: 'Valid May–June 2026', badge: 'Active' },
  fil: { label: 'Mga promo', title: 'Matagal na stay — 7 gabi', sub: 'Hanggang Hunyo 2026', badge: 'Aktibo' }
}

export default function PromoBanner({ lang }) {
  return (
    <div>
      <div className="section-label">{t[lang].label}</div>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--gold-dim)',
        borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{ fontSize: 18 }}>🏷️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-light)' }}>{t[lang].title}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t[lang].sub}</div>
        </div>
        <span style={{ background: '#b8860b33', color: 'var(--gold-dim)', fontSize: 10, padding: '2px 7px', borderRadius: 20 }}>
          {t[lang].badge}
        </span>
      </div>
    </div>
  )
}