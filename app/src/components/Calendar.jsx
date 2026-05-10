import { useState } from "react";

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Sample status map for May 2026
const STATUS_MAP = {
  "2026-4": {
    4:"available",5:"available",6:"available",7:"available",
    11:"available",12:"available",13:"available",14:"available",
    15:"booked",16:"booked",17:"booked",
    18:"available",19:"available",
    20:"today",
    21:"pending",22:"pending",
    23:"available",24:"available",
    25:"booked",26:"booked",
    27:"available",28:"available",29:"available",30:"available",31:"available",
    1:"unavailable",2:"unavailable",3:"unavailable",
  }
};

function getDayStatus(year, month, day) {
  const key = `${year}-${month}`;
  const m = STATUS_MAP[key];
  if (m && m[day]) return m[day];
  const seed = (year * 12 + month + day) % 5;
  return ["available","booked","pending","available","unavailable"][seed];
}

const i18n = {
  en:  { title: "AVAILABILITY CALENDAR", available: "Available", booked: "Booked", pending: "Pending", today: "Today", unavailable: "Unavailable" },
  fil: { title: "KALENDARYO NG AVAILABILITY", available: "Available", booked: "Inireserba", pending: "Nakabinbin", today: "Ngayon", unavailable: "Hindi Available" },
};

export default function Calendar({ lang }) {
  const [date, setDate] = useState(new Date(2026, 4, 1));
  const t = i18n[lang];
  const today = new Date();

  const year  = date.getFullYear();
  const month = date.getMonth();
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + dir);
    setDate(d);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ empty: true, key: `e${i}` });
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    cells.push({ day: d, status: isToday ? "today" : getDayStatus(year, month, d), key: `d${d}` });
  }

  return (
    <>
      <style>{`
        .cal-main { padding: 24px; background: var(--bg, #f3f0ff); }
        .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .cal-title { font-size: 0.72rem; font-weight: 800; color: var(--text-muted,#6b6080); letter-spacing: 1.5px; text-transform: uppercase; }
        .month-nav { display: flex; align-items: center; gap: 14px; }
        .nav-arrow {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--surface,#fff); border: 1px solid var(--border,#e5e0f8);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; color: var(--text,#1e1433); transition: background 0.2s, transform 0.15s;
        }
        .nav-arrow:hover { background: #7c3aed; color: #fff; transform: scale(1.08); }
        .month-label { font-weight: 800; font-size: 1.1rem; min-width: 110px; text-align: center; }

        .calendar { background: var(--surface,#fff); border-radius: 16px; overflow: hidden; border: 1px solid var(--border,#e5e0f8); }
        .cal-weekdays { display: grid; grid-template-columns: repeat(7,1fr); background: var(--surface2,#f8f6ff); border-bottom: 1px solid var(--border,#e5e0f8); }
        .cal-weekday { text-align: center; padding: 10px 0; font-weight: 700; font-size: 0.78rem; color: var(--text-muted,#6b6080); }
        .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 1px; background: var(--border,#e5e0f8); }

        .cal-cell {
          min-height: 90px; display: flex; align-items: flex-start; justify-content: flex-end;
          padding: 10px 12px; font-weight: 700; font-size: 1rem; color: var(--text-muted,#6b6080);
        }
        .cal-cell.empty    { background: var(--bg,#f3f0ff); }
        .cal-cell.available  { background: #bbf7d0; color: #065f46; }
        .cal-cell.booked     { background: #fecaca; color: #7f1d1d; }
        .cal-cell.pending    { background: #fef3c7; color: #78350f; }
        .cal-cell.today      { background: #7c3aed; color: #fff; }
        .cal-cell.unavailable{ background: #e5e7eb; color: #9ca3af; }

        .legend { display: flex; gap: 18px; margin-top: 14px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-muted,#6b6080); font-weight: 600; }
        .legend-dot { width: 14px; height: 14px; border-radius: 4px; }
        .dot-available   { background: #bbf7d0; }
        .dot-booked      { background: #fecaca; }
        .dot-pending     { background: #fef3c7; }
        .dot-today       { background: #7c3aed; }
        .dot-unavailable { background: #e5e7eb; }
      `}</style>

      <main className="cal-main">
        <div className="cal-header">
          <div className="cal-title">{t.title}</div>
          <div className="month-nav">
            <button className="nav-arrow" onClick={() => changeMonth(-1)}>‹</button>
            <div className="month-label">{MONTHS[month]} {year}</div>
            <button className="nav-arrow" onClick={() => changeMonth(1)}>›</button>
          </div>
        </div>

        <div className="calendar">
          <div className="cal-weekdays">
            {WEEKDAYS.map(d => <div className="cal-weekday" key={d}>{d}</div>)}
          </div>
          <div className="cal-grid">
            {cells.map(c =>
              c.empty
                ? <div className="cal-cell empty" key={c.key} />
                : <div className={`cal-cell ${c.status}`} key={c.key}>{c.day}</div>
            )}
          </div>
        </div>

        <div className="legend">
          {[["available",t.available],["booked",t.booked],["pending",t.pending],["today",t.today],["unavailable",t.unavailable]].map(([k,label]) => (
            <div className="legend-item" key={k}>
              <div className={`legend-dot dot-${k}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
