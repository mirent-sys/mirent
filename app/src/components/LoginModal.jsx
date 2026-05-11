import { useState } from 'react';
import './Modal.css';

export default function LoginModal({ initialTab = 'login', onClose, onToast }) {
  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleSubmit() {
    if (!form.email || !form.password) {
      onToast('Please fill in all required fields.');
      return;
    }
    onToast(tab === 'login' ? 'Signed in successfully!' : 'Account created!');
    onClose();
  }

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="login-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="login-logo">Mi<span>Rent</span></div>
        <div className="login-sub">Welcome back! Ready to find your place?</div>

        <div className="modal-tabs">
          <button className={`modal-tab${tab === 'login' ? ' on' : ''}`} onClick={() => setTab('login')}>
            Sign in
          </button>
          <button className={`modal-tab${tab === 'register' ? ' on' : ''}`} onClick={() => setTab('register')}>
            Create account
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="btn-submit" onClick={handleSubmit}>Sign in</button>
            <div className="modal-divider">or continue with</div>
            <div className="social-login">
              <button className="slogin-btn" onClick={() => onToast('Google login coming soon!')}>🌐 Google</button>
              <button className="slogin-btn" onClick={() => onToast('Apple login coming soon!')}>🍎 Apple</button>
            </div>
            <div className="modal-foot">
              Forgot password? <a href="#" onClick={e => e.preventDefault()}>Reset it</a>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" type="text" placeholder="Juan dela Cruz"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min. 8 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="btn-submit" onClick={handleSubmit}>Create account</button>
            <div className="modal-foot">
              By signing up you agree to our <a href="#" onClick={e => e.preventDefault()}>Terms</a> &amp;{' '}
              <a href="#" onClick={e => e.preventDefault()}>Privacy</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
