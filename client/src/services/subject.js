import api from './instance.js'

export const get = async() => {
    const response = await api.get('/subject/getAll') 
    return response.data
}

export const create = async(subject) => {
    const response = await api.post('/subject/create', subject)
    return response.data
}

export const update = async(subject) => {
    const response = await api.put(`/subject/update/${subject._id}`, subject);
    return response.data;
}

export const remove = async(_id) => {
    const response = await api.delete(`/subject/delete/${_id}`);
    return response.data; 
  };
  