import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputValue, timestamp: new Date().toISOString() }),
      });
      
      const result = await response.json();
      setStatus(result.message);
      setInputValue('');
    } catch (error) {
      setStatus('Error submitting data');
      console.error(error);
    }
  };

  const handleRetrieve = async () => {
    try {
      const response = await fetch('/api/retrieve');
      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Data Submission</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter data to submit"
          required
        />
        <button type="submit">Submit</button>
      </form>
      
      <p>{status}</p>
      
      <button onClick={handleRetrieve} style={{ marginTop: '1rem' }}>
        Retrieve Submissions
      </button>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Submitted Data:</h2>
        <ul>
          {submissions.map((item, index) => (
            <li key={index}>
              {item.data} - {new Date(item.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}