import io, { Socket } from 'socket.io-client';

import { WebSocketActions, webSocketHelper } from './api.helpers';

let socket: Socket | undefined;

const createSocketConnection = (
  setConnected: React.Dispatch<React.SetStateAction<boolean>>,
  token?: string,
) => {
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
      setConnected(true);
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
  if (socket === undefined || !socket.connected) return false;
  return true;
};

const getSocket = () => socket;

export {
  createSocketConnection,
  listenSocket,
  closeSocket,
  updateSocket,
  isConnected,
  getSocket,
};
