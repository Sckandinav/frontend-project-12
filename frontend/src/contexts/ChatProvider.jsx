import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatContext } from '.';
import { useAuth } from '.';
import { getCurrentChannelId } from '../slices/selectors';
import { actions as channelsActions } from '../slices/channelsSlice';

const TIMEOUT_REQUEST = 5000;

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);
  const { getUserName } = useAuth();
  const username = getUserName();

  const addMessage = async ({ message }) => {
    const messageData = {
      channelId: currentChannelId,
      text: message,
      user: username,
    };
    await socket.timeout(TIMEOUT_REQUEST).emit('newMessage', messageData);
  };

  const addChannel = async (channel) => {
    const { data } = await socket
      .timeout(TIMEOUT_REQUEST)
      .emitWithAck('newChannel', channel);
    dispatch(channelsActions.setCurrentChannel(data.id));
  };

  const removeChannel = async (id) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('removeChannel', { id });
  };
  const renameChannel = async ({ id, name }) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('renameChannel', { id, name });
  };
  return (
    <ChatContext.Provider
      value={{ addMessage, addChannel, removeChannel, renameChannel }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
