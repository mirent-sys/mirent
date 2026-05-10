import { useState } from "react";
import mirentLogo from "../assets/mirentlogo.svg";

const translations = {
  en: { login: "Login", langLabel: "EN" },
  fil: { login: "Mag-login", langLabel: "FIL" },
};

export default function Navbar({ theme, onToggleTheme, lang, onSetLang, onOpenLogin }) {
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[lang];

  return (
    <>
      <style>{`
        .navbar {
          background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 80px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 16px rgba(124,58,237,.3);
        }
        .navbar-logo { display: flex; align-items: center; text-decoration: none; }
        .navbar-logo img {
          height: 72px;
          width: auto;
          mix-blend-mode: screen;
          display: block;
        }
        .navbar-right { display: flex; align-items: center; gap: 12px; }

        .theme-toggle {
          width: 52px; height: 28px;
          background: rgba(255,255,255,0.25);
          border-radius: 14px;
          cursor: pointer;
          position: relative;
          border: none;
          transition: background 0.3s;
        }
        .theme-knob {
          position: absolute;
          top: 4px; left: 4px;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          pointer-events: none;
        }
        .theme-knob.dark { transform: translateX(24px); }

        .lang-wrapper { position: relative; }
        .lang-btn {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 20px;
          padding: 4px 14px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lang-btn:hover { background: rgba(255,255,255,0.25); }
        .lang-dropdown {
          display: none;
          position: absolute;
          top: 36px; right: 0;
          background: var(--navbar-drop-bg, #fff);
          border: 1px solid #e5e0f8;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,.15);
          min-width: 130px;
          z-index: 200;
        }
        .lang-dropdown.open { display: block; }
        .lang-option {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #1e1433;
          transition: background 0.15s;
        }
        .lang-option:hover { background: #f3f0ff; }
        .lang-option.active { color: #7c3aed; font-weight: 700; }

        .login-btn {
          background: #fff;
          color: #6d28d9;
          border: none;
          border-radius: 20px;
          padding: 6px 20px;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .login-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(124,58,237,.3); }
      `}</style>

      <nav className="navbar">
        <a className="navbar-logo" href="#">
          <img src={mirentLogo} alt="Mirent" />
        </a>
        <div className="navbar-right">
          <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
            <div className={`theme-knob${theme === "dark" ? " dark" : ""}`}>
              {theme === "dark" ? "☀️" : "🌙"}
            </div>
          </button>

          <div className="lang-wrapper">
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              {t.langLabel}
            </button>
            <div className={`lang-dropdown${langOpen ? " open" : ""}`}>
              <div className={`lang-option${lang === "en" ? " active" : ""}`} onClick={() => { onSetLang("en"); setLangOpen(false); }}>🇺🇸 English</div>
              <div className={`lang-option${lang === "fil" ? " active" : ""}`} onClick={() => { onSetLang("fil"); setLangOpen(false); }}>🇵🇭 Filipino</div>
            </div>
          </div>

          <button className="login-btn" onClick={onOpenLogin}>
            {t.login}
          </button>
        </div>
      </nav>
    </>
  );
}
