import config from '@/config/index'
import HttpRequest from '@/libs/axios'

const url = config.baseUrl;
const axios = new HttpRequest(url);
export default axios;
