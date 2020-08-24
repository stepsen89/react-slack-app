import { combineReducers } from "redux";
import { userReducer } from './user';
import { channelsReducer } from './channels';

const rootReducer = combineReducers({
  user: userReducer,
  channels: channelsReducer
});

export default rootReducer;
