import React, { useState, useCallback, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  //const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/ws');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  /* Not used yet
  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('ws://localhost:8765'),
    []
  );
  */
 const handleClickChangeSocketUrl = () => null

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      {/*
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      */}
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>{message ? message.data : null}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDemo