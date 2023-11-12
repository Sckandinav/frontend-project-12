import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { getMessages } from '../slices/selectors';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';

const Messages = () => {
  const messages = useSelector(getMessages);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessageHeader messages={messages} />
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
