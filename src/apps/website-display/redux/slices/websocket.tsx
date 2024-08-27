// src/features/websocket/websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    room: '?',
    messages: [],
    status: 'disconnected',
  },
  reducers: {
    connect: (state) => {
      state.status = 'connected';
    },
    disconnect: (state) => {
      state.status = 'disconnected';
    },
    receiveMessage: (state, action) => {
      const response = JSON.parse(action.payload);
      state.room = response.room;
      state.messages = [
        ...state.messages,
        ...response.messages,
      ];
    },
  },
});

export const { connect, disconnect, receiveMessage } = websocketSlice.actions;

export const { reducer: websocketReducer } = websocketSlice;
