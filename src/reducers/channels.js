import * as actionTypes from "../actions/types";

const initialChannelsState = {
  currentChannel: null,
  isLoading: true,
  isPrivateChannel: false
};

export const channelsReducer = (state = initialChannelsState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
        isLoading: false,
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload.isPrivateChannel,
        isLoading: false
      };
    default:
      return state;
  }
};