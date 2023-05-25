import Axios from "axios";

class HttpTool {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}
	post(path, data = null, config = {}) {
		let params = data || {};
		return Axios.post(path, params, { ...config, baseURL: 'api/' })
			.then(res => {
				console.log(`post:`, res);
				return res;
			}).catch(e => {
				console.error(e)
				return e;
			})
	}
}

export default new HttpTool();