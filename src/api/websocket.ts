import socketIO, { Socket } from 'socket.io-client';

import { webSocketHelper } from '../helpers/app.helpers';

let socket: Socket | undefined;

const createConnection = (token: string | undefined) => {
  if (socket === undefined) {
    socket = socketIO(webSocketHelper.WS_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    });

    listenSocket('connect', () => {
      console.log(`Connected with socket ID: ${socket?.id}. `);
    });
  }
};

const listenSocket = (id: string, callback: (data: any) => void) => {
  socket?.off(id);
  socket?.on(id, callback);
};

const closeSocket = () => {
  socket?.close();
};

export { createConnection, listenSocket, closeSocket };
