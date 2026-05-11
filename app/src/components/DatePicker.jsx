import { useState } from 'react';
import { MONTHS, MSHORT } from '../data/units';
import './DatePicker.css';

export default function DatePicker({ checkIn, checkOut, onPickDate, onClear, onClose }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());

  function navMonth(dir) {
    let m = curMonth + dir;
    let y = curYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setCurMonth(m);
    setCurYear(y);
  }

  const firstDay = new Date(curYear, curMonth, 1).getDay();
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function getDayClass(d) {
    const dt = new Date(curYear, curMonth, d);
    const cls = ['dp-day'];
    if (dt < today) cls.push('past');
    if (checkIn && dt.getTime() === checkIn.getTime()) cls.push('sel-in');
    if (checkOut && dt.getTime() === checkOut.getTime()) cls.push('sel-out');
    if (checkIn && checkOut && dt > checkIn && dt < checkOut) cls.push('in-range');
    if (dt.getTime() === today.getTime()) cls.push('today');
    return cls.join(' ');
  }

  return (
    <div className="date-picker-inner">
      <div className="dp-head">
        <button className="dp-nav" onClick={() => navMonth(-1)}>‹</button>
        <span className="dp-month">{MONTHS[curMonth]} {curYear}</span>
        <button className="dp-nav" onClick={() => navMonth(1)}>›</button>
      </div>
      <div className="dp-grid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="dp-day-hdr">{d}</div>
        ))}
        {blanks.map((_, i) => <div key={`b${i}`} className="dp-day blank" />)}
        {days.map(d => {
          const dt = new Date(curYear, curMonth, d);
          const isPast = dt < today;
          return (
            <div
              key={d}
              className={getDayClass(d)}
              onClick={() => !isPast && onPickDate(curYear, curMonth, d)}
            >
              {d}
            </div>
          );
        })}
      </div>
      <div className="dp-actions">
        <span className="dp-hint">
          {checkIn && !checkOut ? 'Pick check-out' : 'Select dates'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="dp-clear" onClick={onClear}>Clear</button>
          <button className="dp-ok" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
