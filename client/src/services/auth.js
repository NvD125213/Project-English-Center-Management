import api from './instance.js'

export const login = async (data) => {
    const response = await api.post('/user/login', data)
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
    }
    return response.data
}

export const register = async (data) => {
    const response = await api.post('/user/register', data)
    return response.data
}

export const logout = () => {
    localStorage.removeItem('token');
};
export const fetchUserProfile = async (token) => {
    try {
        const response = await api.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Có lỗi xảy ra khi gọi API.' };
    }
};
