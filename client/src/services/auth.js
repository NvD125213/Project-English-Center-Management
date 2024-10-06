import api from './instance.js'

export const login = async(data) => {
    const response = await api.post('/user/login', data) 
    if(response.data.token) {
        localStorage.setItem('token', response.data.token)
    }
    return response.data
}

export const register = async(data) => {
    const response = await api.post('/user/register', data) 
    return response.data
}   

export const logout = () => {
    localStorage.removeItem('token');
};
