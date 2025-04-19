import { cameraLocationSelected } from "../action/app";
import * as Actions from "../actions";
import { appReducer } from "react-universal-ui";

const initialState = {
  user: {},
  showScreen: "overview",
};

export default appReducer((state = initialState, action) => {
  switch (action.type) {
    case Actions.UserProfile:
      return { ...state, user: action.user };
    case Actions.ShowScreen:
      return { ...state, showScreen: action.showScreen };
    default:
      return state;
  }
});
