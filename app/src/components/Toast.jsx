import { useState, useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className={`toast${message ? ' show' : ''}`}>
      {message}
    </div>
  );
}
