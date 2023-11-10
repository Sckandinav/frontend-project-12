import axios from 'axios';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import routes from '../../routes';
import Channels from '../Channels';
import MessageHeader from '../MessageHeader';
import Messages from '../Messages';
import MessageForm from '../MessageForm';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

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
      dispatch(channelsActions.setCurrentChannel(currentChannelId));
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
            <MessageHeader />
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
