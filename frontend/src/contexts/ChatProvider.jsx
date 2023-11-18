/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatContext, useAuth } from '.';
import { getCurrentChannelId } from '../slices/selectors';
import { actions as channelsActions } from '../slices/channelsSlice';

const TIMEOUT_REQUEST = 5000;

const ChatProvider = ({ socket, children }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);

  const addMessage = async ({ message }) => {
    const messageData = {
      channelId: currentChannelId,
      text: message,
      username: user.username,
    };
    await socket.timeout(TIMEOUT_REQUEST).emit('newMessage', messageData);
  };

  const addChannel = async (channel) => {
    const { data } = await socket.timeout(TIMEOUT_REQUEST).emitWithAck('newChannel', channel);
    dispatch(channelsActions.setCurrentChannel(data.id));
  };

  const removeChannel = async (id) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('removeChannel', { id });
  };

  const renameChannel = async ({ id, name }) => {
    await socket.timeout(TIMEOUT_REQUEST).emit('renameChannel', { id, name });
  };

  const value = useMemo(() => ({
    addMessage, addChannel, removeChannel, renameChannel,
  }), [addChannel, addMessage, removeChannel, renameChannel]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
