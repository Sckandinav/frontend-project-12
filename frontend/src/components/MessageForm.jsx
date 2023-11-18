import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as leoProfanity from 'leo-profanity';

import { useChatContext } from '../contexts';

const MessageForm = (currentChannelId) => {
  const { addMessage } = useChatContext();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const validationSchema = Yup.object().shape({
    message: Yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }, { setSubmitting, resetForm }) => {
      try {
        await addMessage({ message: leoProfanity.clean(message) });
        setSubmitting(true);
        resetForm();
      } catch (error) {
        setSubmitting(false);
        toast.error(t('errors.netWorkError'));
        console.error(error.message);
      } finally {
        inputRef.current.focus();
      }
    },
    validationSchema,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-3">
        <InputGroup>
          <Form.Control
            type="text"
            name="message"
            aria-label={t('headers.newMessage')}
            placeholder={t('placeholders.sendMessage')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={inputRef}
            autoFocus
          />
          <Button
            variant="group-vertical"
            type="submit"
            className="border-0"
            disabled={formik.isSubmitting || formik.values.message.length === 0}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width={20}
              height={20}
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
