import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { webSocketHelper } from './api.helpers';
import type { WebSocketActions } from './api.helpers';

let socket: Socket | undefined;

const createSocketConnection = (token: string) => {
  socket = io(webSocketHelper.WS_URL, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
  });
  return socket;
};

const updateSocket = (action: WebSocketActions, data?: any | undefined) => {
  if (socket === undefined) return;
  // console.log('socket update with action:', action, ' // data:', data);
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

const isConnected = () => socket?.connected;

const getSocket = () => socket;

export {
  createSocketConnection,
  listenSocket,
  closeSocket,
  updateSocket,
  isConnected,
  getSocket,
};
