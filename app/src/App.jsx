import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import InquiryModal from './components/InquiryModal';
import LoginModal from './components/LoginModal';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';

export default function App() {
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({ building: '', type: '', checkIn: null, checkOut: null });
  const [inquireUnit, setInquireUnit] = useState(null);
  const [loginModal, setLoginModal] = useState(null); // null | 'login' | 'register'
  const [toast, setToast] = useState('');

  function handleSearch(f) {
    setFilters(f);
    setSearched(true);
  }

  function handleGoHome() {
    setSearched(false);
  }

  function showToast(msg) {
    setToast(msg);
  }

  return (
    <>
      <Navbar
        searched={searched}
        filters={filters}
        onSearch={handleSearch}
        onGoHome={handleGoHome}
        onLogin={tab => setLoginModal(tab)}
      />

      <HomePage visible={!searched} onSearch={handleSearch} />

      <ResultsPage
        visible={searched}
        filters={filters}
        onInquire={unit => setInquireUnit(unit)}
      />

      {inquireUnit && (
        <InquiryModal
          unit={inquireUnit}
          checkIn={filters.checkIn}
          checkOut={filters.checkOut}
          onClose={() => setInquireUnit(null)}
          onToast={showToast}
        />
      )}

      {loginModal && (
        <LoginModal
          initialTab={loginModal}
          onClose={() => setLoginModal(null)}
          onToast={showToast}
        />
      )}

      <Chatbot />

      <Toast message={toast} onDone={() => setToast('')} />
    </>
  );
}
