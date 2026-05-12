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
  { title: 'Studio Unit',  building: 'Gramercy',     price: '₱800/night',   tag: 'Available', tagColor: 'green',
    thumb: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=120&h=120&fit=crop&crop=center' },
  { title: '1BR Suite',    building: 'Knightsbridge', price: '₱1,500/night', tag: 'Featured',  tagColor: 'terra',
    thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=120&h=120&fit=crop&crop=center' },
  { title: 'Parking Slot', building: 'Milano',        price: '₱300/night',   tag: 'New',       tagColor: 'blue',
    thumb: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=120&h=120&fit=crop&crop=center' },
];

const BUILDINGS_EXPLORER = [
  {
    key: 'gramercy',
    name: 'Gramercy Residences',
    location: 'BGC, Taguig City',
    units: 48,
    priceFrom: '₱800',
    tag: 'Most Popular',
    tagColor: 'terra',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=180&fit=crop&crop=center',
  },
  {
    key: 'knightsbridge',
    name: 'Knightsbridge Peak',
    location: 'Kalayaan Ave, BGC',
    units: 32,
    priceFrom: '₱1,200',
    tag: 'Premium',
    tagColor: 'gold',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=180&fit=crop&crop=center',
  },
  {
    key: 'milano',
    name: 'Milano Residences',
    location: 'Makati City',
    units: 41,
    priceFrom: '₱900',
    tag: 'Spacious',
    tagColor: 'green',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=180&fit=crop&crop=center',
  },
];

const rightAds = [
  { title: '2BR Corner',    building: 'Gramercy',     price: '₱2,200/night', tag: 'Hot Deal',  tagColor: 'terra', bldKey: 'gramercy',
    thumb: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=120&h=120&fit=crop&crop=center' },
  { title: 'Studio Deluxe', building: 'Milano',        price: '₱950/night',   tag: 'Available', tagColor: 'green', bldKey: 'milano',
    thumb: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=120&h=120&fit=crop&crop=center' },
  { title: '3BR Penthouse', building: 'Knightsbridge', price: '₱4,500/night', tag: 'Premium',   tagColor: 'gold',  bldKey: 'knightsbridge',
    thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=120&fit=crop&crop=center' },
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
              <div
                key={i}
                className={`side-ad-card accent-${ad.tagColor}`}
                onClick={() => onSearch({ building: ad.building.toLowerCase().split(' ')[0] })}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSearch({ building: ad.building.toLowerCase().split(' ')[0] })}
              >
                <img src={ad.thumb} alt={ad.title} className="side-ad-thumb" />
                <div className="side-ad-info">
                  <span className={`side-ad-tag tag-${ad.tagColor}`}>{ad.tag}</span>
                  <div className="side-ad-title">{ad.title}</div>
                  <div className="side-ad-building">{ad.building}</div>
                  <div className="side-ad-price">{ad.price}</div>
                </div>
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

            </div>

            {/* ── Stats Strip ── */}
            <div className="home-stats-strip">
              <div className="hss-item">
                <span className="hss-num">120+</span>
                <span className="hss-label">Units</span>
              </div>
              <div className="hss-sep" />
              <div className="hss-item">
                <span className="hss-num">3</span>
                <span className="hss-label">Buildings</span>
              </div>
              <div className="hss-sep" />
              <div className="hss-item">
                <span className="hss-num">BGC</span>
                <span className="hss-label">Metro Manila</span>
              </div>
              <div className="hss-sep" />
              <div className="hss-item">
                <span className="hss-num">⚡</span>
                <span className="hss-label">Instant Book</span>
              </div>
            </div>

            {/* ── Building Explorer ── */}
            <div className="home-building-explorer">
              {BUILDINGS_EXPLORER.map(b => (
                <div
                  key={b.key}
                  className="hbe-card"
                  onClick={() => onSearch({ building: b.key })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && onSearch({ building: b.key })}
                >
                  <div className="hbe-img-wrap">
                    <img src={b.image} alt={b.name} className="hbe-img" />
                    <span className={`hbe-tag tag-${b.tagColor}`}>{b.tag}</span>
                  </div>
                  <div className="hbe-info">
                    <div className="hbe-name">{b.name}</div>
                    <div className="hbe-location">📍 {b.location}</div>
                    <div className="hbe-meta">
                      <span className="hbe-units">{b.units} units</span>
                      <span className="hbe-price">from {b.priceFrom}/night</span>
                    </div>
                  </div>
                  <div className="hbe-arrow">›</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side Ads */}
          <aside className="home-side-ads">
            <p className="side-ads-label">Today's Picks</p>
            {rightAds.map((ad, i) => (
              <div
                key={i}
                className={`side-ad-card accent-${ad.tagColor}`}
                onClick={() => onSearch({ building: ad.bldKey })}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSearch({ building: ad.bldKey })}
              >
                <img src={ad.thumb} alt={ad.title} className="side-ad-thumb" />
                <div className="side-ad-info">
                  <span className={`side-ad-tag tag-${ad.tagColor}`}>{ad.tag}</span>
                  <div className="side-ad-title">{ad.title}</div>
                  <div className="side-ad-building">{ad.building}</div>
                  <div className="side-ad-price">{ad.price}</div>
                </div>
              </div>
            ))}
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
