import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import routes from '../../routes';
import Channels from '../Channels';
import Messages from '../Messages';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import { useAuth } from '../../contexts';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
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
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};
export default ChatPage;
