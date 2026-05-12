import { useState } from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';
import './HomePage.css';

export default function HomePage({ visible, onSearch }) {
  const [language, setLanguage] = useState('en');

  const taglines = {
    en: 'Find a place that feels like home.',
    fil: 'Mahanap ang lugar na parang tahanan mo.'
  };

  const labels = {
    browse: { en: 'Browse Units', fil: 'Tuklasin ang Mga Unit' }
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'fil' : 'en');

  // Sample ad thumbnails
  const ads = [
    { id: 1, title: 'Luxury BGC Condo', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop' },
    { id: 2, title: 'Modern Studio', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop' },
    { id: 3, title: 'Cozy 2BR Unit', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop' },
  ];

  return (
    <div className={`home-page${visible ? '' : ' hidden'}`}>
      <div className="home-content">
        {/* Language Toggle */}
        <div className="home-lang-selector">
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Filipino' : 'Switch to English'}
          >
            {language === 'en' ? 'EN' : 'FIL'}
          </button>
        </div>

        {/* Ads Section - Image Thumbnails */}
        <div className="home-ads-container">
          <div className="ads-carousel">
            {ads.map(ad => (
              <div key={ad.id} className="ad-thumbnail">
                <img src={ad.image} alt={ad.title} className="ad-image" />
                <div className="ad-overlay">
                  <span className="ad-title">{ad.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="home-logo-section">
          <div className="home-logo">Mi<span>Rent</span></div>
        </div>

        {/* Tagline */}
        <p className="home-tagline">{taglines[language]}</p>

        {/* Search Bar */}
        <div className="home-search-wrapper">
          <SearchBar variant="home" filters={{}} onSearch={onSearch} />
        </div>

        {/* Action Buttons */}
        <div className="home-actions">
          <button className="btn-home-primary" onClick={() => onSearch({})}>
            <span className="btn-icon">🔍</span>
            {labels.browse[language]}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="home-quick-stats">
          <span className="stat-item"><strong>14</strong> units</span>
          <span className="stat-sep">•</span>
          <span className="stat-item"><strong>3</strong> buildings</span>
          <span className="stat-sep">•</span>
          <span className="stat-item">from <strong>₱300</strong>/night</span>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
