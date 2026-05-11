import { useState, useRef, useEffect } from 'react';
import { BNAME, TYPE_LABEL, MSHORT } from '../data/units';
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

export default function SearchBar({ variant = 'home', filters, onSearch }) {
  const [building, setBuilding] = useState(filters?.building || '');
  const [type, setType] = useState(filters?.type || '');
  const [checkIn, setCheckIn] = useState(filters?.checkIn || null);
  const [checkOut, setCheckOut] = useState(filters?.checkOut || null);
  const [openDD, setOpenDD] = useState(null); // 'building' | 'type' | 'in' | 'out'
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenDD(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function pickDate(y, m, d) {
    const dt = new Date(y, m, d);
    if (!checkIn || checkOut || dt <= checkIn) {
      setCheckIn(dt);
      setCheckOut(null);
    } else {
      setCheckOut(dt);
    }
  }

  function clearDates() {
    setCheckIn(null);
    setCheckOut(null);
  }

  function fmtDate(d) {
    return d ? `${d.getDate()} ${MSHORT[d.getMonth()]}` : null;
  }

  function handleSearch() {
    setOpenDD(null);
    onSearch({ building, type, checkIn, checkOut });
  }

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

      {/* Check-in */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'in' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'in' ? null : 'in')}>
          <span className="sf-label">Check-in</span>
          <span className={`sf-val${!checkIn ? ' ph' : ''}`}>{fmtDate(checkIn) || 'Add date'}</span>
        </div>
        {openDD === 'in' && (
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

      <div className="sc-div" />

      {/* Check-out */}
      <div className="sf-wrap">
        <div className={`sf${openDD === 'out' ? ' active' : ''}`} onClick={() => setOpenDD(openDD === 'out' ? null : 'out')}>
          <span className="sf-label">Check-out</span>
          <span className={`sf-val${!checkOut ? ' ph' : ''}`}>{fmtDate(checkOut) || 'Add date'}</span>
        </div>
        {openDD === 'out' && (
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
