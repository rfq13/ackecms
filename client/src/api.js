import GLOBAL_CONSTANTS from './GlobalConstants';

const api = {
  get(url) {
    return {
      url: `${GLOBAL_CONSTANTS.backend_host}${url}`,
      method: 'GET',
    };
  },
  post(url, data) {
    return {
      url: `${GLOBAL_CONSTANTS.backend_host}${url}`,
      method: 'POST',
      data,
    };
  },
  put(url, data) {
    return {
      url: `${GLOBAL_CONSTANTS.backend_host}${url}`,
      method: 'PUT',
      data,
    };
  },
  delete(url) {
    return {
      url: `${GLOBAL_CONSTANTS.backend_host}${url}`,
      method: 'DELETE',
    };
  },
};

export default api;
