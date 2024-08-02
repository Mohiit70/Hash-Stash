import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConsensusService() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/consensus/subscribe');
    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return () => eventSource.close();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/consensus/submit', { message });
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div>
      <h2>Consensus Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConsensusService;
