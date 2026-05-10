import { useState } from "react";
import Navbar      from "./components/Navbar";
import UnitCards   from "./components/UnitCards";
import Calendar    from "./components/Calendar";
import PromoBanner from "./components/PromoBanner";
import Chatbot     from "./components/Chatbot";

export default function App() {
  const [theme, setTheme]       = useState("light");
  const [lang, setLang]         = useState("en");
  const [loginOpen, setLoginOpen]   = useState(false);
  const [inquireOpen, setInquireOpen] = useState(false);
  const [inquireUnit, setInquireUnit] = useState("");
  const [loggedInAs, setLoggedInAs]   = useState(null);
  const [toast, setToast]       = useState(null);

  // ── helpers ──────────────────────────────────────────────
  const showToast = (msg, color = "#065f46") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const openInquire = (unitName) => {
    setInquireUnit(unitName);
    setInquireOpen(true);
  };

  // ── login handler ────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const pass  = e.target.pass.value;
    if (!email || !pass) { showToast("⚠️ Please fill in all fields.", "#92400e"); return; }
    setLoggedInAs(email.split("@")[0]);
    setLoginOpen(false);
    showToast("✅ Logged in successfully!");
  };

  // ── inquiry handler ──────────────────────────────────────
  const handleInquiry = (e) => {
    e.preventDefault();
    const name    = e.target.inqName.value.trim();
    const contact = e.target.inqContact.value.trim();
    const checkin = e.target.inqCheckin.value;
    const checkout= e.target.inqCheckout.value;
    if (!name || !contact || !checkin || !checkout) { showToast("⚠️ Please fill in all required fields.", "#92400e"); return; }
    setInquireOpen(false);
    showToast("✅ Inquiry sent! We will contact you shortly.");
  };

  return (
    <>
      <style>{`
        /* ── light/dark tokens ── */
        :root {
          --bg: #f3f0ff; --surface: #ffffff; --surface2: #f8f6ff;
          --border: #e5e0f8; --text: #1e1433; --text-muted: #6b6080;
          --card-bg: #ffffff; --chat-bg: #f3f0ff; --modal-bg: #ffffff;
        }
        [data-theme="dark"] {
          --bg: #0f0a1e; --surface: #1a1030; --surface2: #1f1538;
          --border: #2e2050; --text: #f0ebff; --text-muted: #9d8fc0;
          --card-bg: #1f1540; --chat-bg: #1a1030; --modal-bg: #1a1030;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', 'Nunito', sans-serif; }

        .app-shell {
          display: grid;
          grid-template-rows: 72px 1fr;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          transition: background 0.3s, color 0.3s;
        }
        .main-content {
          display: grid;
          grid-template-columns: 240px 1fr 220px;
        }

        /* ── modals ── */
        .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:500; align-items:center; justify-content:center; }
        .modal-overlay.open { display:flex; }
        .modal { background:var(--modal-bg); border-radius:20px; padding:28px; width:100%; max-width:420px; box-shadow:0 20px 60px rgba(0,0,0,.25); position:relative; animation: mIn .25s cubic-bezier(.4,0,.2,1); }
        @keyframes mIn { from{transform:scale(.92) translateY(20px);opacity:0} to{transform:none;opacity:1} }
        .modal-title { font-weight:900; font-size:1.25rem; margin-bottom:4px; }
        .modal-sub { font-size:0.83rem; color:var(--text-muted); margin-bottom:20px; }
        .form-group { margin-bottom:14px; }
        .form-label { display:block; font-weight:700; font-size:0.82rem; color:var(--text-muted); margin-bottom:5px; text-transform:uppercase; letter-spacing:.5px; }
        .form-input { width:100%; background:var(--surface2); border:1.5px solid var(--border); border-radius:10px; padding:10px 14px; font-size:0.9rem; color:var(--text); outline:none; transition:border-color .2s; }
        .form-input:focus { border-color:#7c3aed; }
        textarea.form-input { resize:vertical; min-height:80px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .modal-actions { display:flex; gap:10px; margin-top:20px; }
        .btn-primary  { flex:1; background:#7c3aed; color:#fff; border:none; border-radius:12px; padding:11px; font-weight:800; font-size:0.95rem; cursor:pointer; }
        .btn-primary:hover  { background:#6d28d9; }
        .btn-secondary { flex:1; background:var(--surface2); color:var(--text); border:1.5px solid var(--border); border-radius:12px; padding:11px; font-weight:700; font-size:0.95rem; cursor:pointer; }
        .modal-close-btn { position:absolute; top:16px; right:16px; background:var(--surface2); border:1px solid var(--border); border-radius:50%; width:30px; height:30px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1rem; }

        /* ── toast ── */
        .toast {
          position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(80px);
          border-radius:12px; padding:12px 24px; font-weight:700; font-size:0.9rem;
          z-index:1000; transition:transform .4s,opacity .4s; opacity:0; color:#fff;
          box-shadow:0 4px 20px rgba(0,0,0,.2);
        }
        .toast.show { transform:translateX(-50%) translateY(0); opacity:1; }
      `}</style>

      <div className="app-shell" data-theme={theme}>

        {/* NAVBAR */}
        <Navbar
          theme={theme}
          onToggleTheme={() => setTheme(t => t === "light" ? "dark" : "light")}
          lang={lang}
          onSetLang={setLang}
          onOpenLogin={() => setLoginOpen(true)}
          loggedInAs={loggedInAs}
        />

        {/* MAIN 3-COLUMN LAYOUT */}
        <div className="main-content">
          <UnitCards   lang={lang} onInquire={openInquire} />
          <Calendar    lang={lang} />
          <PromoBanner lang={lang} onInquire={openInquire} />
        </div>

        {/* CHATBOT */}
        <Chatbot lang={lang} />

        {/* ── LOGIN MODAL ── */}
        <div className={`modal-overlay${loginOpen ? " open" : ""}`} onClick={e => { if(e.target.classList.contains("modal-overlay")) setLoginOpen(false); }}>
          <div className="modal">
            <button className="modal-close-btn" onClick={() => setLoginOpen(false)}>✕</button>
            <div className="modal-title">Welcome back!</div>
            <div className="modal-sub">Sign in to your Mirent account</div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" name="email" type="email" placeholder="you@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" name="pass" type="password" placeholder="••••••••" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setLoginOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>

        {/* ── INQUIRE MODAL ── */}
        <div className={`modal-overlay${inquireOpen ? " open" : ""}`} onClick={e => { if(e.target.classList.contains("modal-overlay")) setInquireOpen(false); }}>
          <div className="modal">
            <button className="modal-close-btn" onClick={() => setInquireOpen(false)}>✕</button>
            <div className="modal-title">Send an Inquiry</div>
            <div className="modal-sub">Unit: {inquireUnit}</div>
            <form onSubmit={handleInquiry}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" name="inqName" type="text" placeholder="Juan dela Cruz" />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input className="form-input" name="inqContact" type="tel" placeholder="+63 9XX XXX XXXX" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <input className="form-input" name="inqCheckin" type="date" />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <input className="form-input" name="inqCheckout" type="date" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message (optional)</label>
                <textarea className="form-input" name="inqMsg" placeholder="Any special requests..."></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setInquireOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Send Inquiry</button>
              </div>
            </form>
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="toast show" style={{ background: toast.color }}>{toast.msg}</div>
        )}
      </div>
    </>
  );
}
