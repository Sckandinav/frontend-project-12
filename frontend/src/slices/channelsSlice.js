import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();

const defaultCurrentChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultCurrentChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export default channelsSlice.reducer;
