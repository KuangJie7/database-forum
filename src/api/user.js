import axios from "@/libs/api.request"

export const login = ({userName, password}) => {
    const data = {
        membername: userName,
        password
    }
    return axios.request({
        url: 'login',
        data,
        method: 'post'
    })
}

export const register = ({userName, password}) => {
    const data = {
        membername: userName,
        password
    }
    return axios.request({
        url: 'register',
        data,
        method: 'post'
    })
}

export const getUserInfo = id => {
    const url = 'getUserInfo'+'?memberid='+id
    return axios.request({
        url,
        method: 'get'
    })
}

