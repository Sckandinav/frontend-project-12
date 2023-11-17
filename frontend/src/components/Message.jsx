import React from 'react';
import { useAuth } from '../contexts';

const Message = ({ message }) => {
  const { user } = useAuth();
  const isCurrentUser = message.username === user.username;

  return(
    <div
      className={`mb-2 p-3 py-2 text-break rounded-4 border border-info message bg-${
        isCurrentUser ? 'light' : 'info'
      }`}
    >
      <b>
        {message.username}
        {': '}
      </b>
      {message.text}
    </div>,
  );
};

export default Message;
