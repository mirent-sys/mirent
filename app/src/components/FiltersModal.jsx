import { ALL_AMENITIES, AMENITY_ICONS } from '../data/units';

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  );
}

function Counter({ value, min, onChange, label, sub }) {
  return (
    <div className="guest-counter">
      <div className="guest-label">
        {label}
        {sub && <div className="filter-section-sub">{sub}</div>}
      </div>
      <div className="guest-controls">
        <button className="btn-counter" disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <span className="guest-count">{value}</span>
        <button className="btn-counter" onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export default function FiltersModal({
  open,
  guestAdults, setGuestAdults,
  guestChildren, setGuestChildren,
  guestInfants, setGuestInfants,
  petsOn, setPetsOn,
  accessibleOn, setAccessibleOn,
  parkingOn, setParkingOn,
  selectedAmenities, toggleAmenity,
  filtFloor, setFiltFloor,
  onClearAll, onApply, onClose,
}) {
  const floorOpts = [
    { val:'any',  label:'Any floor' },
    { val:'low',  label:'Low (1–15)' },
    { val:'mid',  label:'Mid (16–35)' },
    { val:'high', label:'High (36+)' },
  ];

  return (
    <div className={`filters-overlay${open ? ' open' : ''}`} onClick={e => { if (e.target.classList.contains('filters-overlay')) onClose(); }}>
      <div className="filters-modal">
        <div className="filters-modal-header">
          <div className="filters-modal-title">More Filters</div>
          <button className="btn-close-filters" onClick={onClose}>✕</button>
        </div>

        <div className="filters-modal-body">
          {/* Guests */}
          <div className="filter-section">
            <div className="filter-section-title">Guests</div>
            <Counter label="Adults"   sub="Ages 13+"  value={guestAdults}   min={1} onChange={setGuestAdults} />
            <Counter label="Children" sub="Ages 2–12" value={guestChildren} min={0} onChange={setGuestChildren} />
            <Counter label="Infants"  sub="Under 2"   value={guestInfants}  min={0} onChange={setGuestInfants} />
          </div>

          {/* Special requirements */}
          <div className="filter-section">
            <div className="filter-section-title">Special Requirements</div>
            <div className="toggle-row">
              <div className="toggle-label">
                🐾 Pets allowed
                <span>Show only pet-friendly units</span>
              </div>
              <Toggle checked={petsOn} onChange={setPetsOn} />
            </div>
            <div className="toggle-row">
              <div className="toggle-label">
                ♿ Accessible unit
                <span>Wheelchair-friendly access</span>
              </div>
              <Toggle checked={accessibleOn} onChange={setAccessibleOn} />
            </div>
            <div className="toggle-row">
              <div className="toggle-label">
                🅿️ With parking slot
                <span>Unit comes with dedicated parking</span>
              </div>
              <Toggle checked={parkingOn} onChange={setParkingOn} />
            </div>
          </div>

          {/* Amenities */}
          <div className="filter-section">
            <div className="filter-section-title">Amenities</div>
            <div className="amenity-grid">
              {ALL_AMENITIES.map(a => (
                <div
                  key={a}
                  className={`amenity-check${selectedAmenities.has(a) ? ' checked' : ''}`}
                  onClick={() => toggleAmenity(a)}
                >
                  <span className="amenity-check-icon">{AMENITY_ICONS[a] || '·'}</span>
                  <span className="amenity-check-label">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floor preference */}
          <div className="filter-section">
            <div className="filter-section-title">Floor Preference</div>
            <div className="floor-pills">
              {floorOpts.map(opt => (
                <div
                  key={opt.val}
                  className={`floor-pill${filtFloor === opt.val ? ' active' : ''}`}
                  onClick={() => setFiltFloor(opt.val)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filters-modal-footer">
          <button className="btn-clear-all" onClick={onClearAll}>Clear all</button>
          <button className="btn-apply-filters" onClick={onApply}>Show results</button>
        </div>
      </div>
    </div>
  );
}
