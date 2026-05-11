import { useState } from 'react';
import { BSHORT, TYPE_LABEL, MSHORT } from '../data/units';
import './Modal.css';

export default function InquiryModal({ unit, checkIn, checkOut, onClose, onToast }) {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  if (!unit) return null;

  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / 86400000) : null;
  const dateStr = checkIn && checkOut
    ? `${checkIn.getDate()} ${MSHORT[checkIn.getMonth()]} – ${checkOut.getDate()} ${MSHORT[checkOut.getMonth()]}`
    : 'Flexible dates';

  function handleSubmit() {
    if (!form.name || !form.email) {
      onToast('Please fill in all required fields.');
      return;
    }
    setSuccess(true);
    onToast('Inquiry sent! We\'ll contact you shortly.');
  }

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {success ? (
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <div className="success-title">Inquiry sent!</div>
            <div className="success-sub">
              We'll reach out to you within 24 hours to confirm your booking at {BSHORT[unit.b]}.
            </div>
          </div>
        ) : (
          <>
            <div className="modal-title">Inquire about this unit</div>
            <div className="modal-sub">Fill in your details and we'll get back to you.</div>

            <div className="modal-unit-info">
              <div className="mui-icon">{unit.icon}</div>
              <div>
                <div className="mui-name">{BSHORT[unit.b]} · {unit.f} floor · {unit.lbl}</div>
                <div className="mui-detail">{dateStr} {nights ? `· ${nights} night${nights > 1 ? 's' : ''}` : ''}</div>
              </div>
              <div className="mui-price">
                <div className="mui-rate">₱{unit.rate.toLocaleString()}</div>
                <div className="mui-ratesub">per night</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full name *</label>
              <input className="form-input" type="text" placeholder="Juan dela Cruz"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" type="tel" placeholder="+63 9XX XXX XXXX"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" rows={3} placeholder="Any special requests..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>

            <button className="btn-submit" onClick={handleSubmit}>
              Send Inquiry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
