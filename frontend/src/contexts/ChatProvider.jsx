import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatContext } from '.';
import { actions as messagesActions } from '../slices/messagesSlice';
import { getCurrentChannelId } from '../slices/selectors';

const TIMEOUT_REQUEST = 5000;

const ChatProvider = ({ socket, children }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const { username } = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const addMessage = async ({ message }) => {
    const messageData = {
      channelId: currentChannelId,
      text: message,
      user: username,
    };

    await socket.timeout(TIMEOUT_REQUEST).emit('newMessage', messageData);
    await socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  };

  return (
    <ChatContext.Provider value={{ addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
