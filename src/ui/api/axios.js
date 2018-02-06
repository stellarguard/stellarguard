import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/'
});

export const get = wrap('get');
export const post = wrap('post');
export const put = wrap('put');
export const del = wrap('delete');

export default { get, post, put, delete: del };

function wrap(method) {
  return function() {
    return call(method, arguments);
  };
}

async function call(method, args) {
  try {
    return await apiClient[method].apply(apiClient, args);
  } catch (err) {
    throw err.response.data;
  }
}
