const promos = [
  {
    id: 1,
    title: "Long stay — 7 nights",
    titleFil: "Matagal na stay — 7 gabi",
    valid: "Valid May–June 2026",
    details: [
      { icon: "🏷️", label: "Discount",       value: "10% off total rate" },
      { icon: "📅", label: "Minimum stay",   value: "7 consecutive nights" },
      { icon: "🏠", label: "Units",          value: "Studio, 1-BR, 2-BR" },
      { icon: "📝", label: "How to avail",   value: "Mention promo when inquiring" },
      { icon: "⚠️", label: "Terms",          value: "Not combinable with other promos" },
    ],
  },
  {
    id: 2,
    title: "Early Bird Promo",
    titleFil: "Early Bird Promo",
    valid: "Valid May–June 2026",
    details: [
      { icon: "🏷️", label: "Discount",       value: "15% off — book 30 days ahead" },
      { icon: "📅", label: "Minimum stay",   value: "3 nights" },
      { icon: "🏠", label: "Units",          value: "All units" },
      { icon: "📝", label: "How to avail",   value: "Book 30 days before check-in" },
      { icon: "⚠️", label: "Terms",          value: "Non-refundable downpayment" },
    ],
  },
  {
    id: 3,
    title: "Referral Bonus",
    titleFil: "Referral Bonus",
    valid: "Valid May–June 2026",
    details: [
      { icon: "🏷️", label: "Reward",         value: "₱500 off per referral" },
      { icon: "📅", label: "Minimum stay",   value: "2 nights" },
      { icon: "🏠", label: "Units",          value: "All units" },
      { icon: "📝", label: "How to avail",   value: "Share your referral code" },
      { icon: "⚠️", label: "Terms",          value: "Max 3 referrals per month" },
    ],
  },
];

const i18n = {
  en:  { title: "PROMOS", active: "Active", valid: "Valid May–June 2026", viewPromo: "View promo", close: "Close", inquireNow: "Inquire Now" },
  fil: { title: "MGA PROMO", active: "Aktibo", valid: "May hanggang Hunyo 2026", viewPromo: "Tingnan ang promo", close: "Isara", inquireNow: "Magtanong Ngayon" },
};

import { useState } from "react";

export default function PromoBanner({ lang, onInquire }) {
  const t = i18n[lang];
  const [activePromo, setActivePromo] = useState(null);

  return (
    <>
      <style>{`
        .promos-sidebar {
          background: var(--surface, #fff);
          border-left: 1px solid var(--border, #e5e0f8);
          padding: 20px 14px;
          overflow-y: auto;
        }
        .promos-title { font-size: 0.72rem; font-weight: 800; color: var(--text-muted,#6b6080); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px; }
        .promo-card { background: var(--card-bg,#fff); border: 2px dashed #fbbf24; border-radius: 14px; padding: 14px; margin-bottom: 12px; }
        .promo-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; }
        .promo-name { font-weight: 800; font-size: 0.9rem; line-height: 1.2; }
        .badge-active { background: #d1fae5; color: #065f46; border-radius: 20px; padding: 2px 9px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
        .promo-valid { font-size: 0.75rem; color: var(--text-muted,#6b6080); margin-bottom: 10px; }
        .view-promo-btn { width: 100%; background: #7c3aed; color: #fff; border: none; border-radius: 10px; padding: 8px 0; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background 0.2s, transform 0.15s; }
        .view-promo-btn:hover { background: #6d28d9; transform: translateY(-1px); }

        .promo-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:500; align-items:center; justify-content:center; }
        .promo-overlay.open { display:flex; }
        .promo-modal { background: var(--modal-bg,#fff); border-radius: 20px; padding: 28px; width: 100%; max-width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,.25); position: relative; }
        .promo-modal-icon { width:56px; height:56px; border-radius:14px; background:linear-gradient(135deg,#fbbf24,#f59e0b); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:14px; }
        .promo-modal-title { font-weight: 900; font-size: 1.25rem; margin-bottom: 4px; }
        .promo-modal-sub { font-size: 0.83rem; color: var(--text-muted,#6b6080); margin-bottom: 16px; }
        .promo-detail-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--border,#e5e0f8); font-size:0.88rem; }
        .promo-detail-row:last-child { border-bottom: none; }
        .promo-detail-icon { width:20px; text-align:center; color:#7c3aed; }
        .promo-modal-actions { display:flex; gap:10px; margin-top:16px; }
        .btn-primary { flex:1; background:#7c3aed; color:#fff; border:none; border-radius:12px; padding:11px; font-weight:800; font-size:0.95rem; cursor:pointer; }
        .btn-primary:hover { background:#6d28d9; }
        .btn-secondary { flex:1; background:var(--surface2,#f8f6ff); color:var(--text,#1e1433); border:1.5px solid var(--border,#e5e0f8); border-radius:12px; padding:11px; font-weight:700; font-size:0.95rem; cursor:pointer; }
        .modal-close-btn { position:absolute; top:16px; right:16px; background:var(--surface2,#f8f6ff); border:1px solid var(--border,#e5e0f8); border-radius:50%; width:30px; height:30px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; }
      `}</style>

      <aside className="promos-sidebar">
        <div className="promos-title">{t.title}</div>
        {promos.map(p => (
          <div className="promo-card" key={p.id}>
            <div className="promo-top">
              <div className="promo-name">{lang === "fil" ? p.titleFil : p.title}</div>
              <span className="badge-active">{t.active}</span>
            </div>
            <div className="promo-valid">{t.valid}</div>
            <button className="view-promo-btn" onClick={() => setActivePromo(p)}>{t.viewPromo}</button>
          </div>
        ))}
      </aside>

      {/* Promo Modal */}
      <div className={`promo-overlay${activePromo ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("promo-overlay")) setActivePromo(null); }}>
        {activePromo && (
          <div className="promo-modal">
            <button className="modal-close-btn" onClick={() => setActivePromo(null)}>✕</button>
            <div className="promo-modal-icon">🎉</div>
            <div className="promo-modal-title">{lang === "fil" ? activePromo.titleFil : activePromo.title}</div>
            <div className="promo-modal-sub">{t.valid} · {t.active}</div>
            {activePromo.details.map((d, i) => (
              <div className="promo-detail-row" key={i}>
                <span className="promo-detail-icon">{d.icon}</span>
                <span><strong>{d.label}:</strong> {d.value}</span>
              </div>
            ))}
            <div className="promo-modal-actions">
              <button className="btn-secondary" onClick={() => setActivePromo(null)}>{t.close}</button>
              <button className="btn-primary" onClick={() => { setActivePromo(null); onInquire("Promo Unit"); }}>{t.inquireNow}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
