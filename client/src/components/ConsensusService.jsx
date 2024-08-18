import React, { useState } from 'react';
import { useHederaContext } from '../hooks/useHederaClient';
import { TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';

function ConsensusService() {
  const { client } = useHederaContext();
  const [topicId, setTopicId] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateTopic = async () => {
    if (!client) return;

    try {
      const transaction = await new TopicCreateTransaction().freezeWith(client);
      const txResponse = await transaction.execute(client);
      const receipt = await txResponse.getReceipt(client);
      setTopicId(receipt.topicId.toString());
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!topicId || !message || !client) return;

    try {
      const transaction = await new TopicMessageSubmitTransaction({
        topicId,
        message,
      }).freezeWith(client);

      const txResponse = await transaction.execute(client);
      await txResponse.getReceipt(client);
      setMessage('');
      console.log('Message submitted successfully');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div>
      <h2>Consensus Service</h2>
      <button onClick={handleCreateTopic}>Create Topic</button>
      {topicId && (
        <div>
          <p>Topic ID: {topicId}</p>
          <form onSubmit={handleSubmitMessage}>
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Submit Message</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ConsensusService;