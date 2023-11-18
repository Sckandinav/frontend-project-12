import React from 'react';

import getModal from './index';

const renderModal = (modalInfo, hideModal, channels) => {
  if (modalInfo.type === null) {
    return null;
  }
  const Modal = getModal(modalInfo.type);

  return <Modal modalInfo={modalInfo} hideModal={hideModal} channels={channels} />;
};

export default renderModal;
