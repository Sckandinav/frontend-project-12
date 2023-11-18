import React, { useState, useRef, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './Channel';
import { getAllChannels } from '../slices/selectors';
import renderModal from './modals/Modal';

const Channels = () => {
  const channels = useSelector(getAllChannels);
  const { t } = useTranslation();
  const channelsEndRef = useRef(null);

  useEffect(() => {
    channelsEndRef.current?.scrollIntoView();
  }, [channels]);

  const initialModal = {
    type: null,
    channel: null,
  };
  const [modalInfo, setModalInfo] = useState(initialModal);

  const showModal = (type, channel = null) => {
    setModalInfo({
      type,
      channel,
    });
  };

  const hideModal = () => {
    setModalInfo({
      type: null,
      channel: null,
    });
  };

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('headers.channels')}</b>
        <Button
          onClick={() => showModal('adding')}
          variant="outline-info"
          className="p-0 text-info-60 btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} showModal={showModal} />
        ))}
        <span ref={channelsEndRef} />
      </ul>
      {renderModal(modalInfo, hideModal, channels)}
    </Col>
  );
};

export default Channels;
