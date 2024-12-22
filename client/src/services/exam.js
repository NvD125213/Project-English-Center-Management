import axios from "axios";

export const getExamDetail = async (examId) => {
    const response = await axios.get(`http://localhost:5000/api/exam/getbyID/${examId}`);
    return response.data
}

export const submitExam = async (payload) => {
    const response = await axios.post("http://localhost:5000/api/exam/submitExam", payload);
    return response.data;
}