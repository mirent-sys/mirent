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

/* Left side: 2 buildings */
const leftBuildings = [
  {
    key: 'gramercy',
    name: 'Gramercy Residences',
    location: 'BGC, Taguig',
    units: 48,
    priceFrom: '₱800',
    tag: 'Most Popular',
    tagColor: 'terra',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=120&h=120&fit=crop&crop=center',
  },
  {
    key: 'knightsbridge',
    name: 'Knightsbridge Peak',
    location: 'Kalayaan Ave, BGC',
    units: 32,
    priceFrom: '₱1,200',
    tag: 'Premium',
    tagColor: 'gold',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=120&fit=crop&crop=center',
  },
];

/* Right side: 1 building */
const rightBuildings = [
  {
    key: 'milano',
    name: 'Milano Residences',
    location: 'Makati City',
    units: 41,
    priceFrom: '₱900',
    tag: 'Spacious',
    tagColor: 'green',
    thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=120&fit=crop&crop=center',
  },
];

const TOP_PICKS_AGENCY = [
  {
    rank: 1,
    name: 'Casa Elegante',
    type: 'Studio',
    location: 'Gramercy, Makati',
    price: '₱2,800/night',
    tag: 'Top Rated',
    tagColor: 'terra',
    badge: '🏆',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=240&fit=crop&crop=center',
  },
  {
    rank: 2,
    name: 'Manalo Suites',
    type: '1-Bedroom Studio',
    location: 'Makati City',
    price: '₱1,500/night',
    tag: 'Best Value',
    tagColor: 'green',
    badge: '🥈',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=240&fit=crop&crop=center',
  },
  {
    rank: 3,
    name: 'Air Be in BETTY',
    type: 'Cozy Studio',
    location: 'Gate 3, Taguig',
    price: '₱1,100/night',
    tag: 'Cozy Pick',
    tagColor: 'blue',
    badge: '🥉',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=240&fit=crop&crop=center',
  },
  {
    rank: 4,
    name: 'NamNam Cabin',
    type: 'Penthouse Unit',
    location: 'Rockwell, Makati',
    price: '₱5,200/night',
    tag: 'Premium',
    tagColor: 'gold',
    badge: '⭐',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=240&fit=crop&crop=center',
  },
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

          {/* Left Side — Buildings: Gramercy + Knightsbridge */}
          <aside className="home-side-ads">
            <p className="side-ads-label">Buildings</p>
            {leftBuildings.map((b) => (
              <div
                key={b.key}
                className={`side-ad-card accent-${b.tagColor}`}
                onClick={() => onSearch({ building: b.key })}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSearch({ building: b.key })}
              >
                <img src={b.thumb} alt={b.name} className="side-ad-thumb" />
                <div className="side-ad-info">
                  <span className={`side-ad-tag tag-${b.tagColor}`}>{b.tag}</span>
                  <div className="side-ad-title">{b.name}</div>
                  <div className="side-ad-building">📍 {b.location}</div>
                  <div className="side-ad-price">from {b.priceFrom}/night</div>
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
                <span className="hss-num">MAKATI</span>
                <span className="hss-label">Metro Manila</span>
              </div>
              <div className="hss-sep" />
              <div className="hss-item">
                <span className="hss-num">⚡</span>
                <span className="hss-label">Instant Book</span>
              </div>
            </div>

            {/* ── Top Picks Agency Units ── */}
            <div className="home-top-picks">
              <div className="top-picks-header">
                <div className="top-picks-title-wrap">
                  <span className="top-picks-icon">🏅</span>
                  <span className="top-picks-title">Top Picks Agency Units</span>
                </div>
                <button className="top-picks-more" onClick={() => onSearch({})}>Show More →</button>
              </div>
              <div className="top-picks-scroll">
                {TOP_PICKS_AGENCY.map((unit) => (
                  <div
                    key={unit.rank}
                    className="tp-card"
                    onClick={() => onSearch({})}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && onSearch({})}
                  >
                    <div className="tp-img-wrap">
                      <img src={unit.image} alt={unit.name} className="tp-img" />
                      <div className="tp-rank-badge">#{unit.rank}</div>
                      <span className={`tp-tag tag-${unit.tagColor}`}>{unit.tag}</span>
                    </div>
                    <div className="tp-info">
                      <div className="tp-name">
                        <span className="tp-badge-emoji">{unit.badge}</span>
                        {unit.name}
                      </div>
                      <div className="tp-type">{unit.type}</div>
                      <div className="tp-location">📍 {unit.location}</div>
                      <div className="tp-price">{unit.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side — Building: Milano */}
          <aside className="home-side-ads">
            <p className="side-ads-label">Also Browse</p>
            {rightBuildings.map((b) => (
              <div
                key={b.key}
                className={`side-ad-card accent-${b.tagColor}`}
                onClick={() => onSearch({ building: b.key })}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSearch({ building: b.key })}
              >
                <img src={b.thumb} alt={b.name} className="side-ad-thumb" />
                <div className="side-ad-info">
                  <span className={`side-ad-tag tag-${b.tagColor}`}>{b.tag}</span>
                  <div className="side-ad-title">{b.name}</div>
                  <div className="side-ad-building">📍 {b.location}</div>
                  <div className="side-ad-price">from {b.priceFrom}/night</div>
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
