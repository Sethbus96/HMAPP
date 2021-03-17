import axios from 'axios';
import Vue from 'vue';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.get('token')}`,
    },
  });
}

const devInstance = createInstance('http://localhost:5000');

export default {
  install() {
    Vue.prototype.$axios = devInstance;
  },
}; // Check debug/build mode
