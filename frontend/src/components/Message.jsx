import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="text-break mb-2">
      <b>{message.user}</b>
      {': '}
      {message.text}
    </div>
  );
};

export default Message;
