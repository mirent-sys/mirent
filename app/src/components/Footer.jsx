import './Footer.css';

export default function Footer() {
  return (
    <footer className="mirent-footer">
      <div className="footer-top">
        <a href="#about">About</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">© 2026 MiRent. All rights reserved.</span>
      </div>
    </footer>
  );
}
