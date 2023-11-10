import { selectors as channelsSelectors } from './channelsSlice';
import { selectors as messagesSelectors } from './channelsSlice';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getMessages = (state) => messagesSelectors.selectAll(state);
