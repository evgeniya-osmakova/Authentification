import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const authorization = handleActions({
  [actions.signInRequest]() {
    return 'requested';
  },
  [actions.signInFailure]() {
    return 'failed';
  },
  [actions.signInSuccess]() {
    return 'finished';
  },
  [actions.cleanStatus]() {
    return 'none';
  },
}, 'none');

export const registration = handleActions({
  [actions.registrationRequest]() {
    return 'requested';
  },
  [actions.registrationSuccess]() {
    return 'finished';
  },
  [actions.registrationFailure]() {
    return 'failed';
  },
  [actions.cleanStatus]() {
    return 'none';
  },
}, 'none');

export const userLoading = handleActions({
  [actions.loadUserRequest]() {
    return 'requested';
  },
  [actions.loadUserSuccess]() {
    return 'finished';
  },
  [actions.loadUserFailure]() {
    return 'failed';
  },
  [actions.cleanStatus]() {
    return 'none';
  },
}, 'none');

export const authChecking = handleActions({
  [actions.authCheckRequest]() {
    return 'requested';
  },
  [actions.authCheckSuccess]() {
    return 'finished';
  },
  [actions.authCheckFailure]() {
    return 'failed';
  },
  [actions.cleanStatus]() {
    return 'none';
  },
}, 'none');

export const errors = handleActions({
  [actions.registrationFailure](state) {
    return { ...state, registrationErr: true };
  },
  [actions.registrationRequest](state) {
    return { ...state, registrationErr: false };
  },
  [actions.signInFailure](state) {
    return { ...state, signInErr: true };
  },
  [actions.signInRequest](state) {
    return { ...state, signInErr: '' };
  },
  [actions.cleanStatus]() {
    return { registrationErr: false, signInErr: false };
  },
}, { registrationErr: false, signInErr: false });
