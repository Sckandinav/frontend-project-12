import React from 'react';
import { useSelector } from 'react-redux';

import { getMessages } from '../slices/selectors';
import Message from './Message';

const Messages = () => {
  const messages = useSelector(getMessages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
};

export default Messages;
