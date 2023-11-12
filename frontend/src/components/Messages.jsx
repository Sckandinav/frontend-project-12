import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { getCurrentChannelId } from '../slices/selectors';

import { getMessages } from '../slices/selectors';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';

const Messages = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages);
  const channelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessageHeader
          channelMessages={channelMessages}
          currentChannelId={currentChannelId}
        />
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {channelMessages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
        </div>
        <MessageForm currentChannelId={currentChannelId} />
      </div>
    </Col>
  );
};

export default Messages;
