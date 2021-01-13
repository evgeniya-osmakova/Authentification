import { combineReducers } from 'redux';
import {
  authorization,
  registration,
  userLoading,
  authChecking,
  errors,
} from './processesState';
import userData from './userData';

export default combineReducers({
  authorization,
  registration,
  userLoading,
  errors,
  authChecking,
  userData,
});
