import React from 'react';
import { useAuth } from '../contexts';

const Message = ({ message }) => {
  const { user } = useAuth();
  const isCurrentUser = message.username === user.username;

  return (
    <div className={`d-flex mb-2 justify-content-${isCurrentUser ? 'end' : 'start'}`}>
      <div>
        <div
          className={`p-3 py-2 text-break rounded-4 bg-${
            isCurrentUser ? 'light' : 'info'
          } border border-info`}
        >
          {' '}
          <b>
            {message.username}
            {': '}
          </b>
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default Message;
