import React, { useState } from 'react';
import { useHederaContext } from '../contexts/HederaContext';
import { TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import '../style/ConsensusService.css';

function ConsensusService() {
  const { client } = useHederaContext();
  const [topicId, setTopicId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleCreateTopic = async () => {
    if (!client) {
      setError('Hedera client is not initialized');
      return;
    }

    try {
      const transaction = await new TopicCreateTransaction().freezeWith(client);
      const signTx = await transaction.sign(client.operatorKey);
      const txResponse = await signTx.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setTopicId(receipt.topicId.toString());
      setError(null);
    } catch (error) {
      setError('Error creating topic: ' + error.message);
      console.error('Error creating topic:', error);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!topicId || !message || !client) {
      setError('Topic ID, message, or client is missing');
      return;
    }

    try {
      const transaction = await new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(message)
        .freezeWith(client);

      const signTx = await transaction.sign(client.operatorKey);
      const txResponse = await signTx.execute(client);
      await txResponse.getReceipt(client);
      setMessage('');
      setError(null);
      console.log('Message submitted successfully');
    } catch (error) {
      setError('Error submitting message: ' + error.message);
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div className="consensus-service">
      <h2>Consensus Service</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="create-topic-button" onClick={handleCreateTopic}>Create Topic</button>
      {topicId && (
        <div className="topic-section">
          <p>Topic ID: {topicId}</p>
          <form className="message-form" onSubmit={handleSubmitMessage}>
            <input
              className="message-input"
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="submit-message-button" type="submit">Submit Message</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ConsensusService;