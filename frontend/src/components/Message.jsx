import React from 'react';
import { useAuth } from '../contexts';
import cn from 'classnames';

const Message = ({ message }) => {
  const { getUserName } = useAuth();
  const currentUser = getUserName();
  const isCurrentUser = message.user === currentUser;

  return (
    <div
      className={`d-flex mb-2 justify-content-${
        isCurrentUser ? 'end' : 'start'
      }`}
    >
      <div>
        <div
          className={`p-3 py-2 text-break rounded-4 bg-${
            isCurrentUser ? 'light' : 'info'
          } border border-info`}
        >
          {' '}
          <b>
            {message.user}
            {': '}
          </b>
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default Message;
