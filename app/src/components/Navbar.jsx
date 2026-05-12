import { useState } from 'react';
import { BNAME, TYPE_LABEL, MSHORT } from '../data/units';
import { formatGuestSummary } from '../data/guests';
import SearchBar from './SearchBar';
import './Navbar.css';

export default function Navbar({ searched, filters, onSearch, onGoHome, onLogin }) {
  const [editOpen, setEditOpen] = useState(false);

  const bLabel = filters.building ? BNAME[filters.building] : 'All buildings';
  const tLabel = filters.type ? TYPE_LABEL[filters.type] : 'Any type';
  const dateLabel = filters.checkIn && filters.checkOut
    ? `${filters.checkIn.getDate()} ${MSHORT[filters.checkIn.getMonth()]} – ${filters.checkOut.getDate()} ${MSHORT[filters.checkOut.getMonth()]}`
    : 'Flexible dates';
  const guestLabel = formatGuestSummary(filters.guests);
  const dateGuestLabel = guestLabel ? `${dateLabel} · ${guestLabel}` : dateLabel;

  function handleSearch(f) {
    setEditOpen(false);
    onSearch(f);
  }

  return (
    <>
      <nav className={`main-nav${searched ? ' visible' : ''}`}>
        <div className="nav-logo" onClick={onGoHome}>
          Mi<span>Rent</span>
        </div>

        <div className="nav-pill" onClick={() => setEditOpen(v => !v)}>
          <div className="nav-pill-sections">
            <span className="nps">{bLabel}</span>
            <div className="nps-sep" />
            <span className="nps">{tLabel}</span>
            <div className="nps-sep" />
            <span className="nps nps-muted">{dateGuestLabel}</span>
          </div>
          <button
            className="btn-nav-edit"
            onClick={e => { e.stopPropagation(); setEditOpen(v => !v); }}
          >
            ✏ Edit
          </button>
        </div>

        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => onLogin('login')}>Sign in</button>
          <button className="btn-fill" onClick={() => onLogin('register')}>Register</button>
        </div>
      </nav>

      {searched && (
        <div className={`edit-panel${editOpen ? ' open' : ''}`}>
          <div className="edit-panel-inner">
            <div className="ep-label">Adjust your search</div>
            <SearchBar
              variant="edit"
              filters={filters}
              onSearch={handleSearch}
            />
          </div>
        </div>
      )}
    </>
  );
}
