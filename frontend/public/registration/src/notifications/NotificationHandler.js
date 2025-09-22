// This component will connect to the WebSocket server and listen for messages. When a message is received, it will be displayed on the screen.

import React, { useEffect, useState } from 'react';

const NotificationHandler = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to WebSocket (ensure the URL matches your backend configuration)
    const ws = new WebSocket('ws://localhost:8000/ws/collaboration/');
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prevMessages => [...prevMessages, data.message]);
    };
    ws.onclose = () => console.log('WebSocket connection closed');
    return () => ws.close();
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: '#eee', padding: '10px', borderRadius: '5px' }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          {msg}
        </div>
      ))}
    </div>
  );
};

export default NotificationHandler;
