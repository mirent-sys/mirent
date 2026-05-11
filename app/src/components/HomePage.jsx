import SearchBar from './SearchBar';
import './HomePage.css';

export default function HomePage({ visible, onSearch }) {
  return (
    <div className={`home-page${visible ? '' : ' hidden'}`}>
      <div className="home-bg">
        <div className="home-dots" />
      </div>
      <div className="home-content">
        <div className="home-eyebrow">
          <div className="home-eyebrow-dot" />
          <span className="home-eyebrow-text">
            <strong>14 units</strong> across 3 Makati buildings
          </span>
        </div>

        <div className="home-logo">Mi<span>Rent</span></div>
        <p className="home-tagline">Find a place that feels like <em>home.</em></p>

        <SearchBar variant="home" filters={{}} onSearch={onSearch} />

        <div className="home-stats">
          <span className="hs"><strong>14</strong> active listings</span>
          <span className="hs-sep">·</span>
          <span className="hs"><strong>3</strong> buildings</span>
          <span className="hs-sep">·</span>
          <span className="hs"><strong>₱300</strong> starting /night</span>
          <span className="hs-sep">·</span>
          <span className="hs">BGC · Makati</span>
        </div>
      </div>
    </div>
  );
}
