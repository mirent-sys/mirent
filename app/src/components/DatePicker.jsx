import { useState, useEffect } from 'react';
import { MONTHS, MSHORT } from '../data/units';
import './DatePicker.css';

function fmtShort(d) {
  return d ? `${d.getDate()} ${MSHORT[d.getMonth()]}` : null;
}

export default function DatePicker({ checkIn, checkOut, onPickDate, onClear, onClose }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  /** Which date the calendar tap applies to */
  const [activeLeg, setActiveLeg] = useState('in');

  useEffect(() => {
    if (!checkIn) setActiveLeg('in');
  }, [checkIn]);

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

  function handleDayClick(d) {
    const dt = new Date(curYear, curMonth, d);
    if (dt < today) return;
    onPickDate(curYear, curMonth, d, activeLeg);
  }

  const hint = activeLeg === 'in'
    ? 'Tap a date to set move in'
    : 'Tap a date after move in for move out';

  return (
    <div className="date-picker-inner">
      <div className="dp-segment-wrap">
        <div className="dp-segment" role="tablist" aria-label="Choose move in or move out">
          <button
            type="button"
            role="tab"
            aria-selected={activeLeg === 'in'}
            className={`dp-seg-btn${activeLeg === 'in' ? ' active' : ''}`}
            onClick={() => setActiveLeg('in')}
          >
            Move in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLeg === 'out'}
            className={`dp-seg-btn${activeLeg === 'out' ? ' active' : ''}`}
            disabled={!checkIn}
            title={!checkIn ? 'Set move in first' : undefined}
            onClick={() => setActiveLeg('out')}
          >
            Move out
          </button>
        </div>
        <p className="dp-range-line" aria-live="polite">
          <span className={!checkIn ? 'ph' : ''}>{fmtShort(checkIn) || '—'}</span>
          <span className="dp-range-arrow">→</span>
          <span className={!checkOut ? 'ph' : ''}>{fmtShort(checkOut) || '—'}</span>
        </p>
      </div>

      <div className="dp-head">
        <button type="button" className="dp-nav" onClick={() => navMonth(-1)}>‹</button>
        <span className="dp-month">{MONTHS[curMonth]} {curYear}</span>
        <button type="button" className="dp-nav" onClick={() => navMonth(1)}>›</button>
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
              onClick={() => !isPast && handleDayClick(d)}
            >
              {d}
            </div>
          );
        })}
      </div>
      <div className="dp-actions">
        <span className="dp-hint">{hint}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" className="dp-clear" onClick={onClear}>Clear</button>
          <button type="button" className="dp-ok" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
