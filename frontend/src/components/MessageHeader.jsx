import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  getAllChannels,
  getCurrentChannelId,
  getMessages,
} from '../slices/selectors';

const MessageHeader = ({ messages }) => {
  const { t } = useTranslation();

  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getAllChannels);
  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {currentChannel && currentChannel.name}</b>
      </p>
      <span className="text-muted">
        {t('messages.counter.count', { count: messages.length })}
      </span>
    </div>
  );
};
export default MessageHeader;
