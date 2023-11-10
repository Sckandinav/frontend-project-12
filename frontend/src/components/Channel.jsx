import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { getCurrentChannelId } from '../slices/selectors';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector(getCurrentChannelId);

  const classes = {
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    btn: true,
    'btn-secondary': channel.id === currentChannelId,
  };

  return (
    <li className="nav-item w-100">
      <button type="button" className={cn(classes)}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};
export default Channel;
