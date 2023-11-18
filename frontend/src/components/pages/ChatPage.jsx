import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';
import Channels from '../Channels';
import Messages from '../Messages';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import { useAuth } from '../../contexts';

const getAuthHeader = (currentUser) => {
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

const ChatPage = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  const headers = getAuthHeader(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(routes.dataApi, { headers });
        const { channels, messages, currentChannelId } = data || {};

        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          navigate(routes.loginPage);
        }
      }
    }
    fetchData();
  }, [dispatch, headers, logOut, navigate, t]);

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
