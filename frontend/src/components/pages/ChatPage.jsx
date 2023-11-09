import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import routes from '../../routes';
import Channels from '../Channels';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(routes.data, {
        headers: getAuthHeader(),
      });
      const { channels, messages, currentChannelId } = data || {};

      dispatch(channelsActions.addChannels(channels));
      //dispatch(channelsActions.setCurrentChannel(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button className="p-0 text-primary btn btn-group-vertical"></Button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># random</b>
              </p>
              <span className="text-muted">XXXX сообщений</span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5 "
            ></div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <Form.Control
                  type="text"
                  name="body"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2"
                  // onChange={formik.handleChange}
                  // value={formik.values.username}
                  // autoComplete='username'
                  // isInvalid={authFailed}
                  // autoFocus
                  // ref={inputRef}
                />
                <Button
                  type="submit"
                  className="btn btn-group-vertical"
                ></Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
