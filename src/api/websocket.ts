/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { webSocketHelper } from './api.helpers';
import type { WebSocketActions } from './api.helpers';

let socket: Socket | undefined;

const createSocketConnection = (token: string) => {
  if (socket === undefined) {
    socket = io(webSocketHelper.WS_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });
  } else {
    // @ts-ignore
    socket.auth.token = token;
    socket.connect();
  }
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
