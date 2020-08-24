import * as actionTypes from "../actions/types";

const initialChannelsState = {
  currentChannel: null,
  isLoading: true,
};

export const channelsReducer = (state = initialChannelsState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        currentChannel: action.payload.currentChannel,
        isLoading: false,
      };
    default:
      return state;
  }
};