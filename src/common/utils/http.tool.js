import Axios from 'axios';
import env from '@/config/env.json';

class HttpTool {
  constructor(env) {
    this.baseUrl = env+'/api/';
  }
  changeBaseUrl(env) {
    this.baseUrl = env+'/api/';
  }
  post(path, data = null, config = {}) {
    const params = data || {};
    return Axios.post(path, params, {...config, baseURL: this.baseUrl})
      .then((res) => {
        console.log('post:', res);
        return res;
      }).catch((e) => {
        console.error(e);
        return e;
      });
  }
}

export default new HttpTool(env.env);
