import io, { Socket } from 'socket.io-client';

import { WebSocketActions, webSocketHelper } from './api.helpers';

let socket: Socket | undefined;

const createSocketConnection = (token?: string) => {
  if (socket) {
    if (socket.connected) return;
    socket.connect();
  }
  if (socket === undefined) {
    socket = io(webSocketHelper.WS_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    });

    listenSocket(WebSocketActions.CONNECT, () => {
      console.log(`Connected with socket ID: ${socket?.id}. `);
    });
    listenSocket(WebSocketActions.ERROR, (error) => {
      console.log(error);
    });
  }
};

const updateSocket = (action: WebSocketActions, data?: any | undefined) => {
  if (socket === undefined) return;
  console.log('socket update with action:', action, ' // data:', data);
  socket.emit(action, data);
};

const listenSocket = (
  action: WebSocketActions,
  callback: (data: any) => void,
) => {
  if (socket === undefined) return;
  socket.off(action);
  socket.on(action, callback);
};

const closeSocket = () => {
  if (socket === undefined) return;
  if (!socket.connected) return;
  socket.close();
};

const isConnected = () => {
  return socket?.connected;
};

const getSocket = () => {
  if (socket) return socket;
  createSocketConnection();
  console.log('WS', socket);
  return socket;
};

export {
  createSocketConnection,
  listenSocket,
  closeSocket,
  updateSocket,
  isConnected,
  getSocket,
};
