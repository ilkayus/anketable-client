import io, { Socket } from 'socket.io-client';

import { WebSocketActions, webSocketHelper } from '../helpers/app.helpers';

let socket: Socket;

const createSocketConnection = async (token?: string) => {
  if (socket === undefined) {
    socket = io(webSocketHelper.WS_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    });

    listenSocket(WebSocketActions.CONNECT, () => {
      console.log(`Connected with socket ID: ${socket.id}. `);
    });
  }
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

export { createSocketConnection, listenSocket, closeSocket };
