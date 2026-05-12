import { useState, useRef, useEffect } from 'react';
import { BNAME, TYPE_LABEL, MSHORT } from '../data/units';
import { DEFAULT_GUESTS, mergeGuests, formatGuestSummary } from '../data/guests';
import DatePicker from './DatePicker';
import './SearchBar.css';

const BUILDINGS = [
  { val: '', label: 'Any building', icon: '🏢' },
  { val: 'gramercy', label: 'Gramercy Residences', icon: '🌆' },
  { val: 'knightsbridge', label: 'Knightsbridge (KBP)', icon: '🏙️' },
  { val: 'milano', label: 'Milano Residences', icon: '🌃' },
];

const TYPES = [
  { val: '', label: 'Any type', icon: '🏠' },
  { val: 'Studio', label: 'Studio', icon: '🛏' },
  { val: '1BR', label: '1-Bedroom', icon: '🛏' },
  { val: '2BR', label: '2-Bedroom', icon: '🛏' },
  { val: '3BR', label: '3-Bedroom', icon: '🛏' },
  { val: 'Parking', label: 'Parking slot', icon: '🚗' },
];

const GUEST_ROWS = [
  { key: 'adults',   label: 'Adults',   sub: 'Ages 13 or above', max: 30 },
  { key: 'children', label: 'Children', sub: 'Ages 2 – 12',      max: 10 },
  { key: 'infants',  label: 'Infants',  sub: 'Under 2',          max: 5  },
];

function GuestCounterRow({ label, sub, value, max, onDelta }) {
  const atMin = value <= 0;
  const atMax = value >= max;
  return (
    <div className="guest-row">
      <div className="guest-row-text">
        <span className="guest-row-label">{label}</span>
        <span className="guest-row-sub">{sub}</span>
      </div>
      <div className="guest-counters">
        <button
          type="button"
          className={`guest-cntr-btn${atMin ? ' disabled' : ''}`}
          disabled={atMin}
          aria-label={`Decrease ${label}`}
          onClick={() => onDelta(-1)}
        >
          –
        </button>
        <span className="guest-cntr-val">{value}</span>
        <button
          type="button"
          className={`guest-cntr-btn${atMax ? ' disabled' : ''}`}
          disabled={atMax}
          aria-label={`Increase ${label}`}
          onClick={() => onDelta(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function SearchBar({ variant = 'home', filters, onSearch }) {
  const [building, setBuilding] = useState(filters?.building || '');
  const [type, setType] = useState(filters?.type || '');
  const [checkIn, setCheckIn] = useState(filters?.checkIn || null);
  const [checkOut, setCheckOut] = useState(filters?.checkOut || null);
  const [guests, setGuests] = useState(() => mergeGuests(filters?.guests));
  const [openDD, setOpenDD] = useState(null); // 'building' | 'type' | 'guests' | 'dates'
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenDD(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (!filters) return;
    setBuilding(filters.building ?? '');
    setType(filters.type ?? '');
    setCheckIn(filters.checkIn ?? null);
    setCheckOut(filters.checkOut ?? null);
    setGuests(mergeGuests(filters.guests));
  }, [filters]);

  /** `leg`: 'in' | 'out' — from DatePicker segmented control */
  function pickDate(y, m, d, leg = 'in') {
    const dt = new Date(y, m, d);
    dt.setHours(0, 0, 0, 0);

    if (leg === 'in') {
      setCheckIn(dt);
      setCheckOut(prev => {
        if (!prev) return prev;
        const p = new Date(prev);
        p.setHours(0, 0, 0, 0);
        return dt.getTime() >= p.getTime() ? null : prev;
      });
      return;
    }

    if (!checkIn) return;
    const cin = new Date(checkIn);
    cin.setHours(0, 0, 0, 0);
    if (dt.getTime() <= cin.getTime()) return;
    setCheckOut(dt);
  }

  function clearDates() {
    setCheckIn(null);
    setCheckOut(null);
  }

  function fmtDate(d) {
    return d ? `${d.getDate()} ${MSHORT[d.getMonth()]}` : null;
  }

  function fmtDateRange() {
    if (checkIn && checkOut) return `${fmtDate(checkIn)} – ${fmtDate(checkOut)}`;
    if (checkIn) return `${fmtDate(checkIn)} – move out?`;
    return null;
  }

  function bumpGuest(key, delta) {
    const row = GUEST_ROWS.find(r => r.key === key);
    const max = row?.max ?? 10;
    setGuests(prev => {
      const next = { ...prev, [key]: prev[key] + delta };
      next[key] = Math.max(0, Math.min(max, next[key]));
      return next;
    });
  }

  function handleSearch() {
    setOpenDD(null);
    onSearch({ building, type, checkIn, checkOut, guests });
  }

  const guestSummary = formatGuestSummary(guests);
  const isEdit = variant === 'edit';

  return (
    <div ref={ref} className={`search-card${isEdit ? ' edit-card' : ''}`}>
      {/* Building */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'building' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'building' ? null : 'building')}>
          <span className="sf-label">Building</span>
          <span className={`sf-val${!building ? ' ph' : ''}`}>
            {building ? BNAME[building] : 'Any building'}
          </span>
        </div>
        {openDD === 'building' && (
          <div className="dropdown open">
            {BUILDINGS.map(b => (
              <div
                key={b.val}
                className={`dd-opt${building === b.val ? ' active' : ''}`}
                onClick={() => { setBuilding(b.val); setOpenDD(null); }}
              >
                <span className="dd-icon">{b.icon}</span>
                {b.label}
                <span className="dd-check">✓</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sc-div" />

      {/* Type */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'type' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'type' ? null : 'type')}>
          <span className="sf-label">Unit Type</span>
          <span className={`sf-val${!type ? ' ph' : ''}`}>
            {type ? TYPE_LABEL[type] : 'Any type'}
          </span>
        </div>
        {openDD === 'type' && (
          <div className="dropdown open">
            {TYPES.map(t => (
              <div
                key={t.val}
                className={`dd-opt${type === t.val ? ' active' : ''}`}
                onClick={() => { setType(t.val); setOpenDD(null); }}
              >
                <span className="dd-icon">{t.icon}</span>
                {t.label}
                <span className="dd-check">✓</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sc-div" />

      {/* Guests (replaces former check-in field) */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'guests' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'guests' ? null : 'guests')}>
          <span className="sf-label">Guests</span>
          <span className={`sf-val${!guestSummary ? ' ph' : ''}`}>
            {guestSummary || 'Add guests'}
          </span>
        </div>
        {openDD === 'guests' && (
          <div className="guest-picker open">
            {GUEST_ROWS.map(({ key, label, sub, max }) => (
              <GuestCounterRow
                key={key}
                label={label}
                sub={sub}
                value={guests[key]}
                max={max}
                onDelta={d => bumpGuest(key, d)}
              />
            ))}
            <div className="guest-done-wrap">
              <button
                type="button"
                className="guest-done-btn"
                onClick={() => setOpenDD('dates')}
              >
                Done &amp; Pick Dates →
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="sc-div" />

      {/* Move in / move out — one trigger, one dropdown, range on shared calendar */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'dates' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'dates' ? null : 'dates')}>
          <span className="sf-label">Move in / out</span>
          <span className={`sf-val${!fmtDateRange() ? ' ph' : ''}`}>{fmtDateRange() || 'Select dates'}</span>
        </div>
        {openDD === 'dates' && (
          <div className="date-picker open">
            <DatePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onPickDate={pickDate}
              onClear={clearDates}
              onClose={() => setOpenDD(null)}
            />
          </div>
        )}
      </div>

      <button className="search-btn" onClick={handleSearch}>
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Search
      </button>
    </div>
  );
}
