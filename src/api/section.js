import axios from "@/libs/api.request"

export const getSection = () => {
    return axios.request({
        url: 'getSection',
        method: 'get'
    })
}

export const getThread = ({name, id}) => {
    const queryString = name+'='+id;
    const url = 'getThread'+'?'+queryString;
    return axios.request({
        url,
        method: 'get'
    })
}

export const addReply = data => {
    return axios.request({
        url: 'addReply',
        method: 'post',
        data
    })
}
