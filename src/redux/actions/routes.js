const host = 'http://erp.apptrix.ru/api/clients';

export default {
  registrationUrl: () => [host, 'create/ '].join('/'),
  signInUrl: () => [host, 'token/'].join('/'),
  refresh: () => [host, 'token/refresh/'].join('/'),
  loadUser: (id) => [host, `${id}`].join('/'),
};
