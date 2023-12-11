import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentChannelId } from '../slices/channelsSelectors.js';

const ChannelItem = ({
  channel,
  onSelectChannel,
  onRemoveChannel,
  onRenameChannel,
}) => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const isCurrentChannel = currentChannelId === channel.id;

  const handleSelectChannel = () => {
    onSelectChannel(channel.id);
  };

  const handleRemoveChannel = () => {
    onRemoveChannel(channel.id);
  };

  const handleRenameChannel = () => {
    onRenameChannel(channel.id);
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={handleSelectChannel}
        type="button"
        className="w-100 rounded-0 text-start btn text-truncate"
        variant={isCurrentChannel ? 'primary' : null}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        variant={isCurrentChannel ? 'primary' : null}
        className="flex-grow-0"
        id="dropdown-split-basic"
        split
      >
        <span className="visually-hidden">{t('modal.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>
          {t('modal.removeChannel')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>
          {t('modal.renameChannel')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelItem;
