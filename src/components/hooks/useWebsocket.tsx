// src/hooks/useWebSocket.js
import { IMS_URL } from 'configs/Constants';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { connect, disconnect, receiveMessage } from 'redux/slices/websocket';

const useWebSocket = ({ address }) => {
  const url = `${IMS_URL}${address}`;
  const dispatch = useDispatch();
  const websocket = useRef(null);

  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = () => {
      dispatch(connect());
    };

    websocket.current.onclose = () => {
      dispatch(disconnect());
    };

    websocket.current.onmessage = (event) => {
      dispatch(receiveMessage(event.data));
    };

    return () => {
      websocket.current.close();
    };
  }, [url, dispatch]);

  const sendMessage = (message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(message);
    }
  };

  return sendMessage;
};

export default useWebSocket;
