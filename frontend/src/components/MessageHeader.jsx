import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getAllChannels } from '../slices/selectors';

const MessageHeader = ({ channelMessages, currentChannelId }) => {
  const { t } = useTranslation();

  const channels = useSelector(getAllChannels);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentChannel && currentChannel.name}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.counter.count', { count: channelMessages.length })}
      </span>
    </div>
  );
};

export default MessageHeader;
