import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { useChatContext } from '../../contexts';
import { toast } from 'react-toastify';

const Remove = ({ modalInfo, hideModal }) => {
  const { removeChannel } = useChatContext();
  const { channel } = modalInfo;

  const { t } = useTranslation();
  const rollbar = useRollbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await removeChannel(channel.id);
      hideModal();
      toast.success(t('toastify.channelRemoved'));
    } catch (error) {
      toast.error(t('errors.netWorkError'));
      rollbar.error('RemoveChannel', error.message);
    }
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('headers.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('messages.removeWarning')}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 gap-2 d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>
              {t('buttons.canсel')}
            </Button>
            <Button variant="danger" type="submit">
              {t('buttons.remove')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
