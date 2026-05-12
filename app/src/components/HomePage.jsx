import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { DEFAULT_GUESTS } from '../data/guests';
import './HomePage.css';

const HOME_SEARCH_FILTERS = Object.freeze({
  building: '',
  type: '',
  checkIn: null,
  checkOut: null,
  guests: { ...DEFAULT_GUESTS },
});

const heroAds = [
  {
    id: 1,
    title: 'Luxury BGC Condo',
    subtitle: '2-Bedroom · Gramercy Residences',
    price: '₱2,500/night',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=200&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'Modern Studio Unit',
    subtitle: 'Studio · Knightsbridge Peak',
    price: '₱1,200/night',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=200&fit=crop&crop=center',
  },
  {
    id: 3,
    title: 'Cozy Family Suite',
    subtitle: '3-Bedroom · Milano Residences',
    price: '₱3,800/night',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=200&fit=crop&crop=center',
  },
];

const leftAds = [
  { title: 'Studio Unit',  building: 'Gramercy',      price: '₱800/night',   tag: 'Available', tagColor: 'green' },
  { title: '1BR Suite',    building: 'Knightsbridge',  price: '₱1,500/night', tag: 'Featured',  tagColor: 'terra' },
  { title: 'Parking Slot', building: 'Milano',         price: '₱300/night',   tag: 'New',       tagColor: 'blue'  },
];

const rightAds = [
  { title: '2BR Corner',    building: 'Gramercy',     price: '₱2,200/night', tag: 'Hot Deal',  tagColor: 'terra' },
  { title: 'Studio Deluxe', building: 'Milano',        price: '₱950/night',   tag: 'Available', tagColor: 'green' },
  { title: '3BR Penthouse', building: 'Knightsbridge', price: '₱4,500/night', tag: 'Premium',   tagColor: 'gold'  },
];

export default function HomePage({ visible, onSearch, onLogin }) {
  const [language, setLanguage] = useState('en');
  const [currentAd, setCurrentAd] = useState(0);

  const labels = { browse: { en: 'Browse Units', fil: 'Tuklasin ang Mga Unit' } };
  const toggleLanguage = () => setLanguage(l => (l === 'en' ? 'fil' : 'en'));

  useEffect(() => {
    const t = setInterval(() => setCurrentAd(p => (p + 1) % heroAds.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`home-page${visible ? '' : ' hidden'}`}>
      <div className="home-content">

        {/* ── Top bar: lang toggle + auth buttons ── */}
        <div className="home-topbar">
          <div className="home-lang-selector">
            <button
              className="lang-toggle"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Filipino' : 'Switch to English'}
            >
              {language === 'en' ? 'EN' : 'FIL'}
            </button>
          </div>
          <div className="home-auth-btns">
            <button className="btn-ghost-home" onClick={() => onLogin?.('login')}>Sign in</button>
            <button className="btn-fill-home"  onClick={() => onLogin?.('register')}>Register</button>
          </div>
        </div>

        {/* ── 3-Column: side ads + center ── */}
        <div className="home-3col">

          {/* Left Side Ads */}
          <aside className="home-side-ads">
            <p className="side-ads-label">Featured Units</p>
            {leftAds.map((ad, i) => (
              <div key={i} className="side-ad-card" onClick={() => onSearch({ building: ad.building.toLowerCase().replace(/ .*/,'') })}>
                <span className={`side-ad-tag tag-${ad.tagColor}`}>{ad.tag}</span>
                <div className="side-ad-title">{ad.title}</div>
                <div className="side-ad-building">{ad.building}</div>
                <div className="side-ad-price">{ad.price}</div>
              </div>
            ))}
          </aside>

          {/* ── Center: hero → logo → tagline → search ── */}
          <div className="home-center">

            {/* Hero Sliding Ad */}
            <div className="hero-ad">
              {heroAds.map((ad, i) => (
                <div key={ad.id} className={`hero-slide${i === currentAd ? ' active' : ''}`}>
                  <img src={ad.image} alt={ad.title} className="hero-slide-img" />
                  <div className="hero-slide-overlay">
                    <span className="hero-slide-title">{ad.title}</span>
                    <span className="hero-slide-sub">{ad.subtitle}</span>
                    <span className="hero-slide-price">{ad.price}</span>
                  </div>
                </div>
              ))}
              <div className="hero-dots">
                {heroAds.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot${i === currentAd ? ' active' : ''}`}
                    onClick={() => setCurrentAd(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="home-logo-section">
              <div className="home-logo">Mi<span>Rent</span></div>
            </div>

            {/* Tagline */}
            <p className="home-tagline">
              {language === 'en' ? (
                <>Find a place that feels like <span className="home-tagline-accent">home</span>.</>
              ) : (
                <>Mahanap ang lugar na parang <span className="home-tagline-accent">tahanan</span> mo.</>
              )}
            </p>

            {/* Search */}
            <div className="home-search-section">
              <div className="home-search-wrapper">
                <SearchBar variant="home" filters={HOME_SEARCH_FILTERS} onSearch={onSearch} />
              </div>
              <div className="home-actions">
                <button className="btn-home-primary" onClick={() => onSearch({})}>
                  <span className="btn-icon">🔍</span>
                  {labels.browse[language]}
                </button>
              </div>
              <div className="home-quick-stats">
                <span className="stat-item"><strong>14</strong> units</span>
                <span className="stat-sep">•</span>
                <span className="stat-item"><strong>3</strong> buildings</span>
                <span className="stat-sep">•</span>
                <span className="stat-item">from <strong>₱300</strong>/night</span>
              </div>
            </div>

          </div>

          {/* Right Side Ads */}
          <aside className="home-side-ads">
            <p className="side-ads-label">Today's Picks</p>
            {rightAds.map((ad, i) => (
              <div key={i} className="side-ad-card" onClick={() => onSearch({})}>
                <span className={`side-ad-tag tag-${ad.tagColor}`}>{ad.tag}</span>
                <div className="side-ad-title">{ad.title}</div>
                <div className="side-ad-building">{ad.building}</div>
                <div className="side-ad-price">{ad.price}</div>
              </div>
            ))}
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
