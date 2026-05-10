const units = [
  { id: 1, name: "Studio",    sub: "Tower A • High floor", status: "open" },
  { id: 2, name: "1-Bedroom", sub: "Tower B • Mid floor",  status: "partial" },
  { id: 3, name: "2-Bedroom", sub: "Tower A • High floor", status: "open" },
  { id: 4, name: "1-Bedroom", sub: "Tower B • Mid floor",  status: "partial" },
  { id: 5, name: "2-Bedroom", sub: "Tower A • High floor", status: "open" },
];

const i18n = {
  en:  { title: "UNITS", open: "Open", partial: "Partial", inquire: "Inquire" },
  fil: { title: "MGA UNIT", open: "Bukas", partial: "Bahagi", inquire: "Magtanong" },
};

export default function UnitCards({ lang, onInquire }) {
  const t = i18n[lang];

  return (
    <>
      <style>{`
        .unit-sidebar {
          background: var(--surface, #fff);
          border-right: 1px solid var(--border, #e5e0f8);
          padding: 20px 14px;
          overflow-y: auto;
        }
        .sidebar-title {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-muted, #6b6080);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 14px;
          padding-left: 4px;
        }
        .unit-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e5e0f8);
          border-radius: 14px;
          padding: 12px 14px;
          margin-bottom: 10px;
          transition: box-shadow 0.2s;
        }
        .unit-card:hover { box-shadow: 0 4px 16px rgba(124,58,237,.12); }
        .unit-name { font-weight: 800; font-size: 0.95rem; margin-bottom: 2px; }
        .unit-sub  { font-size: 0.78rem; color: var(--text-muted, #6b6080); margin-bottom: 8px; }
        .unit-footer { display: flex; align-items: center; justify-content: space-between; }

        .badge { border-radius: 20px; padding: 3px 10px; font-size: 0.72rem; font-weight: 700; }
        .badge-open    { background: #d1fae5; color: #065f46; }
        .badge-partial { background: #fef3c7; color: #92400e; }

        .inquire-btn {
          background: #14b8a6;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 5px 16px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .inquire-btn:hover { background: #0d9488; transform: translateY(-1px); }
      `}</style>

      <aside className="unit-sidebar">
        <div className="sidebar-title">{t.title}</div>
        {units.map(u => (
          <div className="unit-card" key={u.id}>
            <div className="unit-name">{u.name}</div>
            <div className="unit-sub">{u.sub}</div>
            <div className="unit-footer">
              <span className={`badge badge-${u.status}`}>
                {u.status === "open" ? t.open : t.partial}
              </span>
              <button className="inquire-btn" onClick={() => onInquire(`${u.name} – ${u.sub}`)}>
                {t.inquire}
              </button>
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
