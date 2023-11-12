import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { getCurrentChannelId } from '../slices/selectors';
import { actions } from '../slices/channelsSlice';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();
  const { setCurrentChannel } = actions;

  const classes = {
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    btn: true,
    'btn-secondary': channel.id === currentChannelId,
  };

  return (
    <li className="nav-item w-100">
      <button
        onClick={() => dispatch(setCurrentChannel(channel.id))}
        type="button"
        className={cn(classes)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};
export default Channel;
