import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from './routes';

export const registrationRequest = createAction('REGISTRATION_REQUEST');
export const registrationSuccess = createAction('REGISTRATION_SUCCESS');
export const registrationFailure = createAction('REGISTRATION_FAILURE');

export const signInRequest = createAction('SIGN_IN_REQUEST');
export const signInSuccess = createAction('SIGN_IN_SUCCESS');
export const signInFailure = createAction('SIGN_IN_FAILURE');

export const loadUserRequest = createAction('USER_LOADING_REQUEST');
export const loadUserSuccess = createAction('USER_LOADING_SUCCESS');
export const loadUserFailure = createAction('USER_LOADING_FAILURE');

export const authCheckRequest = createAction('AUTH_CHECKING_REQUEST');
export const authCheckSuccess = createAction('AUTH_CHECKING_SUCCESS');
export const authCheckFailure = createAction('AUTH_CHECKING_FAILURE');

export const cleanStatus = createAction('STATUS_CLEAN');

const timeout = 10000;

axios.interceptors.request.use((req) => {
  const access = localStorage.getItem('access');
  req.headers.Authorization = (access) ? `Bearer ${access}` : '';
  req.headers['Content-Type'] = 'application/json';
  req.headers.Accept = 'application/json';
  req.timeout = timeout;
  return req;
});

export const refreshData = () => async (dispatch) => {
  dispatch(authCheckRequest());
  if (localStorage.getItem('refresh')) {
    const body = JSON.stringify({ refresh: localStorage.getItem('refresh') });
    try {
      const url = routes.refresh();
      const response = await axios.post(url, body);
      dispatch(authCheckSuccess(response.data));
      // eslint-disable-next-line no-use-before-define
      dispatch(loadUser());
    } catch (err) {
      dispatch(authCheckFailure());
    }
  } else {
    dispatch(authCheckFailure());
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  if (localStorage.getItem('client_id')) {
    try {
      const url = routes.loadUser(localStorage.getItem('client_id'));
      const response = await axios.get(url);
      dispatch(loadUserSuccess({ user: response.data }));
    } catch (err) {
      if (err.response.status === 401) {
        await refreshData()(dispatch);
      } else {
        dispatch(loadUserFailure({ err }));
      }
    }
  } else {
    dispatch(loadUserFailure());
  }
};

export const signIn = ({ username }, { password }) => async (dispatch) => {
  dispatch(signInRequest());
  try {
    const url = routes.signInUrl();
    const response = await axios.post(url, { username, password });
    // eslint-disable-next-line camelcase
    const { access, refresh, client_id } = response.data;
    dispatch(signInSuccess({ access, refresh, client_id }));
    dispatch(loadUser());
  } catch (err) {
    dispatch(signInFailure({ err }));
  }
};

export const registration = ({ email }, { password }, { name }, { surname },
  // eslint-disable-next-line camelcase
  { phone }, { invited_by }, { country_key }) => async (dispatch) => {
  dispatch(registrationRequest());
  try {
    const url = routes.registrationUrl();
    await axios.post(url, {
      user: { email, password },
      phone,
      invited_by,
      name,
      surname,
      country_key,
    });
    dispatch(registrationSuccess());
  } catch (err) {
    dispatch(registrationFailure({ err }));
  }
};
