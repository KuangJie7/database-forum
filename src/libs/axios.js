import axios from "axios"

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }
    getDefaultConfig(){
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return config
    }
    request(options) {
        const instantce = axios.create();
        options = Object.assign(options, this.getDefaultConfig());
        return instantce(options);
    }
}

export default HttpRequest