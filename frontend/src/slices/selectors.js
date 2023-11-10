import { selectors as channelsSelectors } from './channelsSlice';
import { selectors as messagesSelectors } from './messagesSlice';

const getAllChannels = (state) => channelsSelectors.selectAll(state);

const getCurrentChannelId = (state) => state.channels.currentChannelId;

const getMessages = (state) => messagesSelectors.selectAll(state);

export { getAllChannels, getCurrentChannelId, getMessages };
