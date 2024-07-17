import { IMS_URL } from 'configs/Constants';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect, disconnect, receiveMessage } from 'redux/slices/websocket';

const useWebSocket = ({ room }) => {
  const url = `${IMS_URL}${room}`;
  const dispatch = useDispatch();
  const websocket = useRef(null);
  const [shouldReconnect, setShouldReconnect] = useState(true);

  useEffect(() => {
    let reconnectTimeout;

    const connectWebSocket = () => {
      websocket.current = new WebSocket(url);

      websocket.current.onopen = () => {
        dispatch(connect());
        console.log('WebSocket connected');
      };

      websocket.current.onclose = () => {
        dispatch(disconnect());
        console.log('WebSocket disconnected');
        if (shouldReconnect) {
          reconnectTimeout = setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
        }
      };

      websocket.current.onmessage = (event) => {
        dispatch(receiveMessage(event.data));
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
    };

    connectWebSocket();

    return () => {
      setShouldReconnect(false);
      clearTimeout(reconnectTimeout);
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [url, dispatch, shouldReconnect]);

  const sendMessage = (message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(message);
    }
  };

  return sendMessage;
};

export default useWebSocket;
