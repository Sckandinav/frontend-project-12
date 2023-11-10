import React from 'react';
import { useSelector } from 'react-redux';

import {
  getAllChannels,
  getCurrentChannelId,
  getMessages,
} from '../slices/selectors';

const MessageHeader = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getAllChannels);
  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );
  const messages = useSelector(getMessages);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {currentChannel.name}</b>
      </p>
      <span className="text-muted">{messages.length} сообщений</span>
    </div>
  );
};

export default MessageHeader;
