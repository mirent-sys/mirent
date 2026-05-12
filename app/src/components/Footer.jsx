import { useState } from 'react';
import './Footer.css';

const INFO_CONTENT = {
  about: {
    title: 'About MiRent',
    icon: '🏢',
    sections: [
      { heading: 'Who We Are', body: 'MiRent is a property rental management platform designed for condominium units in Metro Manila. We connect tenants with verified, high-quality living spaces in premier buildings.' },
      { heading: 'Our Buildings', body: 'We currently manage units in Gramercy Residences (BGC), Knightsbridge (KBP), and Milano Residences — all in prime locations with world-class amenities.' },
      { heading: 'Our Mission', body: 'To make finding and booking your perfect home as easy, transparent, and stress-free as possible.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    icon: '🔒',
    sections: [
      { heading: 'Data Collection', body: 'MiRent collects your name, email, and contact information solely to facilitate property inquiries and bookings. We do not collect data beyond what is necessary.' },
      { heading: 'Data Protection', body: 'All personal data is encrypted and stored securely. We do not sell or share your data with third parties without your explicit consent.' },
      { heading: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us at privacy@mirent.ph.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    icon: '📋',
    sections: [
      { heading: 'Acceptance', body: 'By using MiRent, you agree to use the platform for lawful property rental inquiries only. Misuse of the platform may result in account suspension.' },
      { heading: 'Bookings', body: 'All bookings are subject to unit availability and landlord approval. Confirmed rates are binding for the selected dates. Cancellation policies vary per unit.' },
      { heading: 'Amendments', body: 'MiRent reserves the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.' },
    ],
  },
  contact: {
    title: 'Contact Us',
    icon: '💬',
    sections: [
      { heading: 'Get in Touch', body: '📧 Email: hello@mirent.ph\n📞 Phone: +63 2 8XXX XXXX\n📍 Address: BGC, Taguig City, Metro Manila' },
      { heading: 'Office Hours', body: 'Monday – Saturday: 8:00 AM – 6:00 PM\nSunday: 10:00 AM – 4:00 PM' },
      { heading: 'Quick Support', body: 'Use the 💬 chat button at the bottom-right of the screen for immediate assistance from our team.' },
    ],
  },
};

export default function Footer() {
  const [infoPage, setInfoPage] = useState(null);
  const info = infoPage ? INFO_CONTENT[infoPage] : null;

  return (
    <>
      <footer className="mirent-footer">
        <div className="footer-top">
          {Object.keys(INFO_CONTENT).map(page => (
            <button
              key={page}
              className="footer-link"
              onClick={() => setInfoPage(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">© 2026 MiRent. All rights reserved.</span>
        </div>
      </footer>

      {/* Info Modal */}
      {info && (
        <div className="info-overlay" onClick={() => setInfoPage(null)}>
          <div className="info-modal" onClick={e => e.stopPropagation()}>
            <div className="info-modal-header">
              <span className="info-modal-icon">{info.icon}</span>
              <h2 className="info-modal-title">{info.title}</h2>
              <button className="info-modal-close" onClick={() => setInfoPage(null)} aria-label="Close">✕</button>
            </div>
            <div className="info-modal-body">
              {info.sections.map((sec, i) => (
                <div key={i} className="info-section">
                  <h3 className="info-section-heading">{sec.heading}</h3>
                  <p className="info-section-body">
                    {sec.body.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
