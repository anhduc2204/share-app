import * as Actions from "../actions";

export function userProfile(user) {
  return { type: Actions.UserProfile, user };
}

export function showScreen(showScreen) {
  return { type: Actions.ShowScreen, showScreen };
}