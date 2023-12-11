/* eslint-disable */
import React, { createContext, useContext, useMemo } from 'react';
import { channelsActions } from '../slices/index.js';
import store from '../slices/store.js';

export const WSocketContext = createContext(null);
export const useWSocket = () => useContext(WSocketContext);

const TIMEOUT_REQUEST = 5000;

const ChatProvider = ({ socket, children }) => {
  const emitNewMessage = ({ body, channelId, username }) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(TIMEOUT_REQUEST)
        .emit(
          'newMessage',
          { body, channelId, username },
          (error, response) => {
            response?.status === 'ok' ? resolve(response) : reject(error);
          },
        );
    });

  const emitAddChannel = (name) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(TIMEOUT_REQUEST)
        .emit('newChannel', { name }, (error, response) => {
          const newAddChannel = response.data.id;
          store.dispatch(channelsActions.setCurrentChannelId(newAddChannel));
          response?.status === 'ok' ? resolve(response) : reject(error);
        });
    });

  const emitRemoveChannel = (id) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(TIMEOUT_REQUEST)
        .emit('removeChannel', { id }, (error, response) => {
          response?.status === 'ok' ? resolve(response?.data) : reject(error);
        });
    });

  const emitRenameChannel = (id, name) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(TIMEOUT_REQUEST)
        .emit('renameChannel', { id, name }, (error, response) => {
          response?.status === 'ok' ? resolve(response?.data) : reject(error);
        });
    });
  const socketContextValue = useMemo(
    () => ({
      emitNewMessage,
      emitAddChannel,
      emitRemoveChannel,
      emitRenameChannel,
    }),
    [],
  );

  return (
    <WSocketContext.Provider value={socketContextValue}>
      {children}
    </WSocketContext.Provider>
  );
};
export default ChatProvider;
// export default WSocketProvider;
