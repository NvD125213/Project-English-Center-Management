import axios from "axios";

export const getDetailHistory = async (userId, examId, historyId) => {
    const response = await axios.get(
        `http://localhost:5000/api/history/historyResult`,
        {
            params: {
                userId: userId,
                examId: examId,
                historyId: historyId,
            },
        }
    );

    return response.data
}
