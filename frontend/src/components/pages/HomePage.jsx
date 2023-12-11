/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Channels from '../Channels.jsx';
import Messages from '../Messages.jsx';
import ShowModal from '../modals/index.jsx';
import { messagesActions, channelsActions } from '../../slices/index.js';
import { AuthContext } from '../../contexts/AuthProvider.js';
import routes from '../../routes.js';

const getAuthHeader = (data) => {
  if (data && data.token) {
    return { Authorization: `Bearer ${data.token}` };
  }
  return {};
};

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate(routes.login(), { replace: false });
        return;
      }
      try {
        const userData = {
          headers: getAuthHeader(user),
        };
        const {
          data: { channels, messages, currentChannelId },
        } = await axios.get(routes.dataPath(), userData);
        dispatch(channelsActions.addManyChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addManyMessages(messages));
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          logout();
          navigate(routes.login(), { replace: false });
        }
        console.log(error);
        toast.error(t('toasts.connectError'));
      }
    };
    fetchData();
  }, [dispatch, logout, user, navigate, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <Messages />
        </div>
      </div>
      <ShowModal />
    </div>
  );
};

export default HomePage;
