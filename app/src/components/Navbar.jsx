const t = {
  en: { login: 'Login' },
  fil: { login: 'Mag-login' }
}

export default function Navbar({ lang, setLang }) {
  return (
    <nav style={{
      background: 'var(--navy)', padding: '0 16px', height: '52px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #1e3a8a', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="/mirent-logo.png"
          alt="Mirent"
          style={{ height: 28, filter: 'brightness(0) invert(1)' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Mirent</span>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {['en', 'fil'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: lang === l ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '4px 10px', borderRadius: 20,
            fontSize: 12
          }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <button style={{
        background: 'var(--red)', color: '#fff', border: 'none',
        padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500
      }}>
        {t[lang].login}
      </button>
    </nav>
  )
}