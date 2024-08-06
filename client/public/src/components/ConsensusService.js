import React, { useState, useEffect } from 'react';
import { useHederaClient } from '../hooks/useHederaClient';

function ConsensusService() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [topicId, setTopicId] = useState('');
  const { client } = useHederaClient();

  useEffect(() => {
    if (topicId) {
      const subscription = client.subscribeToTopic(topicId, (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => subscription.unsubscribe();
    }
  }, [topicId, client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.submitMessage(topicId, message);
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const handleCreateTopic = async () => {
    try {
      const newTopicId = await client.createTopic();
      setTopicId(newTopicId);
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Consensus Service</h2>
      {!topicId && (
        <button
          onClick={handleCreateTopic}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Create Topic
        </button>
      )}
      {topicId && (
        <>
          <p className="mb-4">Topic ID: {topicId}</p>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
          <div>
            <h3 className="font-bold mb-2">Messages:</h3>
            <ul className="list-disc pl-5">
              {messages.map((msg, index) => (
                <li key={index} className="mb-1">{msg.content}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ConsensusService;