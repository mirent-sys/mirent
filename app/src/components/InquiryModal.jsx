import { useState } from 'react';
import { TYPE_LABEL, MSHORT } from '../data/units';

export default function InquiryModal({ unit, checkIn, checkOut, nights, onClose, onToast }) {
  const [fname, setFname]   = useState('');
  const [lname, setLname]   = useState('');
  const [phone, setPhone]   = useState('');
  const [email, setEmail]   = useState('');
  const [msg,   setMsg]     = useState('');
  const [sent,  setSent]    = useState(false);

  if (!unit) return null;

  const dateInfo = nights && checkIn && checkOut
    ? `${checkIn.getDate()} ${MSHORT[checkIn.getMonth()]} – ${checkOut.getDate()} ${MSHORT[checkOut.getMonth()]} · ${nights} night${nights !== 1 ? 's' : ''}`
    : 'Flexible dates';

  const submit = () => {
    if (!fname.trim() || !phone.trim() || !email.trim()) {
      onToast('⚠️ Please fill in all required fields.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="modal-overlay open" onClick={e => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {sent ? (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <div className="success-title">Inquiry sent!</div>
            <div className="success-sub">
              Hi <strong>{fname}</strong>, we received your inquiry for<br />
              <strong>{unit.bn} · {TYPE_LABEL[unit.type]}</strong>.<br /><br />
              We'll contact you at <strong>{phone}</strong> or <strong>{email}</strong> within 24 hours.
            </div>
            <button className="btn-submit" onClick={onClose} style={{ marginTop:'1.2rem' }}>Done</button>
          </div>
        ) : (
          <>
            <div className="modal-title">Inquire about this unit</div>
            <div className="modal-sub">We'll get back to you within 24 hours.</div>

            <div className="modal-unit-info">
              <div className="mui-icon">{unit.icon}</div>
              <div>
                <div className="mui-name">{unit.bn}</div>
                <div className="mui-detail">{unit.f} floor · {dateInfo}</div>
              </div>
              <div className="mui-price">
                <div className="mui-rate">₱{unit.rate.toLocaleString()}</div>
                <div className="mui-ratesub">/night</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First name</label>
                <input className="form-input" type="text" placeholder="Juan" value={fname} onChange={e => setFname(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Last name</label>
                <input className="form-input" type="text" placeholder="dela Cruz" value={lname} onChange={e => setLname(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Contact number</label>
              <input className="form-input" type="tel" placeholder="+63 917 xxx xxxx" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="juan@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Message (optional)</label>
              <textarea className="form-input" placeholder="Any questions or special requests?" value={msg} onChange={e => setMsg(e.target.value)} />
            </div>
            <button className="btn-submit" onClick={submit}>Send Inquiry →</button>
          </>
        )}
      </div>
    </div>
  );
}
