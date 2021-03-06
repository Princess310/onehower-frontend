import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export const API_ROOT = 'https://api.onehower.com/';
export const WEB_ROOT = 'http://localhost:3000/';

const fetchDao = {
  doGet(url, params) {
    return this.request('GET', url, params);
  },

  doPost(url, params) {
    return this.request('POST', url, params);
  },

  doPut(url, params) {
    return this.request('PUT', url, params);
  },

  doDelete(url, params) {
    return this.request('DELETE', url, params);
  },

  doUploadFile(url, params) {
    return this.request('POST', url, params, true);
  },

  getWebRoot() {
    return WEB_ROOT;
  },

  getDomain() {
    return window.document.domain;
  },

  paramsParse(params) {
    const arr = [];

    Object.keys(params).forEach((key) => {
      arr.push(`${key}=${params[key]}`);
    });

    return `&${arr.join('&')}`;
  },

  request(method, u, params, file) {
    const self = this;
    let url = API_ROOT + u;
    const config = {
      method,
      headers: {},
      credentials: 'same-origin',
    };

    const token = localStorage.getItem('access_token');
    if (token !== '') {
      config.headers['X-Access-Token'] = token;
    }

    if ((method === 'GET') && typeof params !== 'undefined') {
      url += self.paramsParse(params);
    }

    // only post method to add body config
    if ((method !== 'GET') && typeof params !== 'undefined') {
      if (file) {
        const formData = new FormData();
        formData.append('file', params.file);
        config.body = formData;
      } else {
        config.body =  JSON.stringify(params);
        // change the Content-Type for mime
        config.headers['Content-Type'] = 'application/json';
      }
    }

    return new Promise((resolve, reject) => {
      fetch(url, config)
      .then(self.checkStatus)
      .then(self.parseJSON)
      .then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  parseJSON(response) {
    return response.json();
  },
};

export default fetchDao;
