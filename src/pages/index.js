// src/pages/index.js
import { useState, useEffect } from 'react';
import { fetchHello } from '../services/api';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHello().then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}