import { GroupQuestion } from "../models/index.js";
import HistoryResult from "../models/historyResult.js";
const HistoryResultController = {
    getHistoryById: async (req, res) => {
        const { userId, examId, historyId } = req.query;

        try {
            // 1. Tìm HistoryResult
            const historyResult = await HistoryResult.findOne({
                _id: historyId,
                user: userId,
                exam: examId
            }).populate({
                path: 'answers',
                populate: { path: 'question', select: 'title element options correctOption' }
            });

            if (!historyResult) {
                return res.status(404).json({ message: 'Không tìm thấy kết quả lịch sử!' });
            }

            // 2. Lấy danh sách Answer và câu hỏi
            const answers = historyResult.answers;

            // Tạo Map để phân nhóm câu hỏi theo GroupQuestion
            const groupedData = {};

            for (const answer of answers) {
                const groupQuestion = await GroupQuestion.findOne({
                    questions: answer.question._id
                }).select('part type elements questions');

                if (!groupQuestion) continue;

                const groupId = groupQuestion._id.toString();

                if (!groupedData[groupId]) {
                    groupedData[groupId] = {
                        groupQuestionId: groupId,
                        part: groupQuestion.part,
                        type: groupQuestion.type,
                        elements: groupQuestion.elements,
                        questions: []
                    };
                }

                // Thêm thông tin câu hỏi vào group
                groupedData[groupId].questions.push({
                    questionId: answer.question._id,
                    title: answer.question.title,
                    element: answer.question.element,
                    options: answer.question.options,
                    correctOption: answer.question.correctOption,  // Bổ sung correctOption
                    selectedOption: answer.selectedOption,
                    isCorrect: answer.isCorrect
                });
            }

            // 3. Format dữ liệu
            const result = {
                historyId: historyResult._id,
                userId: historyResult.user,
                examId: historyResult.exam,
                score: historyResult.score,
                correctAnswer: historyResult.correctAnswer,
                submittedAt: historyResult.submittedAt,
                groupedQuestions: Object.values(groupedData)
            };

            // 4. Trả về kết quả
            return res.status(200).json(result);

        } catch (error) {
            console.error('Lỗi khi lấy thông tin HistoryResult:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin lịch sử làm bài!' });
        }
    },
    getHistoryByUser: async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "Thiếu thông tin userId!" });
        }

        try {
            const histories = await HistoryResult.find({ user: userId })
                .populate({
                    path: 'exam',
                    populate: {
                        path: 'subject',
                        select: 'name'
                    }
                })
                .sort({ submittedAt: -1 });

            if (!histories.length) {
                return res.status(404).json({ message: "Không tìm thấy lịch sử thi!" });
            }

            // Format dữ liệu trả về
            const result = histories.map(history => ({
                historyId: history._id,
                examId: history.exam?._id,
                examTitle: history.exam?.name + "-" + history.exam?.subject?.name || "Không rõ",
                submittedAt: history.submittedAt,
                score: history.score,
                correctAnswer: history.correctAnswer
            }));

            return res.status(200).json(result);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch sử thi:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy lịch sử thi!' });
        }
    },
    getExamCompletionCountById: async (req, res) => {
        const { examId } = req.query;

        if (!examId) {
            return res.status(400).json({ message: "Thiếu thông tin examId!" });
        }

        try {
            const completionCount = await HistoryResult.countDocuments({ exam: examId });

            return res.status(200).json({
                examId,
                completionCount
            });
        } catch (error) {
            console.error("Lỗi khi đếm số lượt hoàn thành bài thi:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi đếm số lượt hoàn thành bài thi!" });
        }
    },
    getMonthlyExamCount: async (req, res) => {
        try {
            const result = await HistoryResult.aggregate([
                {
                    $project: {
                        year: { $year: "$submittedAt" },
                        month: { $month: "$submittedAt" }
                    }
                },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ]);

            // Lấy tất cả các năm và tháng có trong dữ liệu
            const groupedResult = result.reduce((acc, { _id: { year, month }, count }) => {
                if (!acc[year]) acc[year] = {};
                acc[year][month] = count; // Gán số lượng cho từng tháng trong mỗi năm
                return acc;
            }, {});

            // Đảm bảo mỗi năm có đủ 12 tháng
            const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
            const allResults = [];

            for (let year = currentYear - 1; year <= currentYear; year++) {
                for (let month = 1; month <= 12; month++) {
                    const count = groupedResult[year] && groupedResult[year][month] ? groupedResult[year][month] : 0; // Nếu không có dữ liệu cho tháng thì trả về 0
                    allResults.push({
                        _id: { year, month },
                        count
                    });
                }
            }

            res.json(allResults); // Trả về dữ liệu với đầy đủ 12 tháng
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error while fetching data." });
        }
    }

}

export default HistoryResultController