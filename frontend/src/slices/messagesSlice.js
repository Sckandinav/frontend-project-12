import { current, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const id = action.payload;
      const mapessagesIds = Object.values(state.entities)
        .filter((e) => e.channelId === id)
        .map(({ id }) => id);
      messagesAdapter.removeMany(state, mapessagesIds);
    });
  },
});

export const { actions } = messagesSlice;
