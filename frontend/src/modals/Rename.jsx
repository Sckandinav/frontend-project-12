import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import * as leoProfanity from 'leo-profanity';

import { useChatContext } from '../../contexts';

const Rename = ({ modalInfo, hideModal, channels }) => {
  const { renameChannel } = useChatContext();
  const { channel } = modalInfo;
  const channelsNames = channels.map((channel) => channel.name);

  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .transform((value) => leoProfanity.clean(value))
      .notOneOf(channelsNames, t('errors.notOneOf')),
  });

  const formik = useFormik({
    initialValues: { id: channel.id, name: channel.name },
    onSubmit: async ({ id, name }, { setSubmitting }) => {
      try {
        await renameChannel({ id, name: leoProfanity.clean(name) });
        setSubmitting(true);
        hideModal();
        toast.success(t('toastify.channelRenamed'));
      } catch (error) {
        setSubmitting(false);
        toast.error(t('errors.netWorkError'));
        console.error(error.message);
      }
    },
    validationSchema,
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('headers.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">
              {t('headers.channelName')}
            </Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
              ref={inputRef}
              disabled={formik.isSubmitting}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 gap-2 d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal}>
              {t('buttons.canсel')}
            </Button>
            <Button variant="info" type="submit" disabled={formik.isSubmitting}>
              {t('buttons.send')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;
