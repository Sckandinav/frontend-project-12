import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCurrentChannelId } from '../slices/selectors';
import { actions } from '../slices/channelsSlice';

const Channel = ({ channel, showModal }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();
  const { setCurrentChannel } = actions;
  const { t } = useTranslation();

  const variant = channel.id === currentChannelId ? 'info' : 'default';

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={variant}
          onClick={() => dispatch(setCurrentChannel(channel.id))}
          className="w-100 text-start text-truncate"
        >
          {`# ${channel.name}`}
        </Button>
        {channel.removable ? (
          <>
            <Dropdown.Toggle variant={variant} split className="border-0">
              <span className="visually-hidden">{t('buttons.channelActions')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('removing', channel)}>
                {t('buttons.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('renaming', channel)}>
                {t('buttons.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        ) : null}
      </Dropdown>
    </li>
  );
};

export default Channel;
