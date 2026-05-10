const t = {
  en: { label: 'Active promos', title: 'Long stay discount — 7 nights', sub: 'Valid May–June 2026. Contact agent to book.', badge: 'Active' },
  fil: { label: 'Mga aktibong promo', title: 'Diskwento sa matagal na stay — 7 gabi', sub: 'Maaari hanggang Hunyo 2026. Makipag-ugnayan sa ahente.', badge: 'Aktibo' }
}

export default function PromoBanner({ lang }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
        {t[lang].label}
      </div>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--gold-dim)',
        borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{
          width: 36, height: 36, background: '#b8860b22', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          fontSize: 20
        }}>🏷️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)', marginBottom: 2 }}>
            {t[lang].title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {t[lang].sub}
          </div>
        </div>
        <div style={{
          background: '#b8860b33', color: 'var(--gold-dim)', fontSize: 11,
          padding: '3px 8px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0
        }}>
          {t[lang].badge}
        </div>
      </div>
    </div>
  )
}