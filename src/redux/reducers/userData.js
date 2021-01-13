import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const userData = handleActions({
  // eslint-disable-next-line camelcase
  [actions.signInSuccess](state, { payload: { access, refresh, client_id } }) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('client_id', client_id);
    return { ...state, isAuthenticated: true };
  },
  [actions.loadUserSuccess](state, { payload: { user } }) {
    return { isAuthenticated: true, user };
  },
  [actions.authCheckSuccess](state, { payload: { access } }) {
    console.log(access);
    localStorage.setItem('access', access);
    return { ...state };
  },
  [actions.authCheckFailure]() {
    localStorage.clear();
    return { isAuthenticated: false, user: {} };
  },
  [actions.loadUserFailure]() {
    return { isAuthenticated: false, user: {} };
  },
}, { isAuthenticated: null, user: {} });

export default userData;
