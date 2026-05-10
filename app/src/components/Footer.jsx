const t = {
  en: { text: 'Mirent — Property operations platform', privacy: 'Privacy Policy', contact: 'Contact' },
  fil: { text: 'Mirent — Platform para sa mga may-ari ng unit', privacy: 'Patakaran sa Privacy', contact: 'Makipag-ugnayan' }
}

export default function Footer({ lang }) {
  return (
    <footer style={{
      background: 'var(--navy)', padding: '20px 16px',
      borderTop: '1px solid #1e3a8a', textAlign: 'center'
    }}>
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{t[lang].text}</p>
      <a href="#" style={{ color: '#3b82f6', fontSize: 12 }}>{t[lang].privacy}</a>
      <span style={{ color: '#334155', margin: '0 8px' }}>·</span>
      <a href="#" style={{ color: '#3b82f6', fontSize: 12 }}>{t[lang].contact}</a>
    </footer>
  )
}