import { useState } from 'react';
import { UNITS, AMENITY_ICONS, BNAME, BSHORT, MSHORT, GRAD, TYPE_LABEL } from '../data/units';
import './ResultsPage.css';

function checkAvail(unit, checkIn, checkOut) {
  if (!checkIn || !checkOut) return 'unknown';
  const inD = checkIn.getDate(), outD = checkOut.getDate();
  for (const [s, e] of unit.bk) {
    if (inD <= e && outD >= s) return 'unavailable';
  }
  return 'available';
}

export default function ResultsPage({ visible, filters, onInquire }) {
  const [sortVal, setSortVal] = useState('avail');
  const [filtAvail, setFiltAvail] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [appliedMin, setAppliedMin] = useState(null);
  const [appliedMax, setAppliedMax] = useState(null);
  const [filtType, setFiltType] = useState('');
  const [filtBuilding, setFiltBuilding] = useState('');
  const [openChip, setOpenChip] = useState(null);

  const { checkIn, checkOut, building, type } = filters;
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / 86400000) : null;

  let results = UNITS.filter(u => {
    const b = building || filtBuilding;
    const t = type || filtType;
    if (b && u.b !== b) return false;
    if (t && u.type !== t) return false;
    if (appliedMin !== null && u.rate < appliedMin) return false;
    if (appliedMax !== null && u.rate > appliedMax) return false;
    if (filtAvail !== 'all') {
      const avail = checkAvail(u, checkIn, checkOut);
      if (filtAvail === 'available' && avail !== 'available') return false;
      if (filtAvail === 'unknown' && avail === 'unavailable') return false;
    }
    return true;
  });

  const w = { available: 0, unknown: 1, unavailable: 2 };
  if (sortVal === 'avail') results.sort((a, b) => w[checkAvail(a, checkIn, checkOut)] - w[checkAvail(b, checkIn, checkOut)]);
  else if (sortVal === 'asc') results.sort((a, b) => a.rate - b.rate);
  else if (sortVal === 'desc') results.sort((a, b) => b.rate - a.rate);

  const availCount = results.filter(u => checkAvail(u, checkIn, checkOut) !== 'unavailable').length;
  const dateStr = nights
    ? ` · ${checkIn.getDate()} ${MSHORT[checkIn.getMonth()]} – ${checkOut.getDate()} ${MSHORT[checkOut.getMonth()]} (${nights}N)`
    : '';

  return (
    <div className={`results-page${visible ? ' visible' : ''}`}>
      <div className="results-topbar">
        <div className="results-topbar-inner">
          <span className="results-count">
            {availCount} available · {results.length} total{dateStr}
          </span>

          <div className="filter-chips">
            {/* Availability */}
            <div className={`filter-chip${openChip === 'avail' ? ' active' : ''}${filtAvail !== 'all' ? ' is-filtered' : ''}`}
              onClick={e => { e.stopPropagation(); setOpenChip(openChip === 'avail' ? null : 'avail'); }}>
              Availability
              <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              {openChip === 'avail' && (
                <div className="chip-dropdown">
                  {[['all','All units'],['available','Available only'],['unknown','Any / flexible dates']].map(([val, label]) => (
                    <div key={val} className={`cd-opt${filtAvail === val ? ' active' : ''}`}
                      onClick={e => { e.stopPropagation(); setFiltAvail(val); setOpenChip(null); }}>
                      {label}<span className="cd-check">✓</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className={`filter-chip${openChip === 'price' ? ' active' : ''}${appliedMin || appliedMax ? ' is-filtered' : ''}`}
              onClick={e => { e.stopPropagation(); setOpenChip(openChip === 'price' ? null : 'price'); }}>
              Price
              <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              {openChip === 'price' && (
                <div className="chip-dropdown" onClick={e => e.stopPropagation()}>
                  <div className="price-range-wrap">
                    <div className="price-range-label">Price per night (₱)</div>
                    <div className="price-inputs">
                      <input className="price-input" type="number" placeholder="Min" value={priceMin}
                        onChange={e => setPriceMin(e.target.value)} />
                      <span className="price-dash">–</span>
                      <input className="price-input" type="number" placeholder="Max" value={priceMax}
                        onChange={e => setPriceMax(e.target.value)} />
                    </div>
                    <button className="price-apply" onClick={() => {
                      setAppliedMin(priceMin ? parseInt(priceMin) : null);
                      setAppliedMax(priceMax ? parseInt(priceMax) : null);
                      setOpenChip(null);
                    }}>Apply</button>
                  </div>
                </div>
              )}
            </div>

            {/* Unit type */}
            <div className={`filter-chip${openChip === 'type' ? ' active' : ''}${filtType ? ' is-filtered' : ''}`}
              onClick={e => { e.stopPropagation(); setOpenChip(openChip === 'type' ? null : 'type'); }}>
              Unit type
              <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              {openChip === 'type' && (
                <div className="chip-dropdown">
                  {[['','All types'],['Studio','Studio'],['1BR','1-Bedroom'],['2BR','2-Bedroom'],['3BR','3-Bedroom'],['Parking','Parking']].map(([val, label]) => (
                    <div key={val} className={`cd-opt${filtType === val ? ' active' : ''}`}
                      onClick={e => { e.stopPropagation(); setFiltType(val); setOpenChip(null); }}>
                      {label}<span className="cd-check">✓</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Building */}
            <div className={`filter-chip${openChip === 'building' ? ' active' : ''}${filtBuilding ? ' is-filtered' : ''}`}
              onClick={e => { e.stopPropagation(); setOpenChip(openChip === 'building' ? null : 'building'); }}>
              Building
              <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              {openChip === 'building' && (
                <div className="chip-dropdown">
                  {[['','All buildings'],['gramercy','Gramercy'],['knightsbridge','Knightsbridge'],['milano','Milano']].map(([val, label]) => (
                    <div key={val} className={`cd-opt${filtBuilding === val ? ' active' : ''}`}
                      onClick={e => { e.stopPropagation(); setFiltBuilding(val); setOpenChip(null); }}>
                      {label}<span className="cd-check">✓</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <select className="sort-select" value={sortVal} onChange={e => setSortVal(e.target.value)}>
            <option value="avail">Sort: Availability</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="results-content">
        <div className="results-grid" onClick={() => setOpenChip(null)}>
          {results.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No units found</div>
              <div className="empty-sub">Try broadening your search — clear a filter or two.</div>
            </div>
          ) : results.map((u, i) => {
            const avail = checkAvail(u, checkIn, checkOut);
            const isUnavail = avail === 'unavailable';
            const grad = GRAD[u.type] || 'g-studio';
            return (
              <div
                key={u.id}
                className={`unit-card${isUnavail ? ' unavail' : ''}`}
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => !isUnavail && onInquire(u)}
              >
                <div className={`card-top ${grad}`}>
                  <div className="card-emoji-wrap">
                    <div className="card-emoji">{u.icon}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div className="card-type-badge">{TYPE_LABEL[u.type] || u.lbl}</div>
                      {u.sqm && <span className="card-sqm">{u.sqm}m²</span>}
                    </div>
                  </div>
                  <span className="badge-building">{BSHORT[u.b]}</span>
                  {avail === 'available' && (
                    <span className="badge-avail avail-yes">✓ Available</span>
                  )}
                  {avail === 'unavailable' && (
                    <span className="badge-avail avail-no">✗ Booked</span>
                  )}
                </div>
                <div className="card-body">
                  <div className="card-header">
                    <div className="card-name">{BSHORT[u.b]} · {u.f} floor</div>
                    <div className="card-location">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" stroke="none" />
                      </svg>
                      Makati City
                    </div>
                  </div>
                  <div className="card-amenities">
                    {(u.amenities || []).slice(0, 3).map(a => (
                      <div key={a} className="amenity-pill">
                        <span>{AMENITY_ICONS[a] || '·'}</span>{a}
                      </div>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="card-price-block">
                      <div className="card-price">₱{u.rate.toLocaleString()}</div>
                      <div className="card-price-unit">per night</div>
                    </div>
                    {nights && (
                      <div className="card-total-badge">₱{(u.rate * nights).toLocaleString()} total</div>
                    )}
                  </div>
                  <button
                    className="btn-inquire"
                    disabled={isUnavail}
                    onClick={e => { e.stopPropagation(); !isUnavail && onInquire(u); }}
                    style={{ marginTop: 10 }}
                  >
                    {isUnavail ? 'Not available' : 'Inquire now'}
                    {!isUnavail && (
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
