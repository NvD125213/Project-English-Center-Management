import Answer from "../models/answer.js";
import HistoryResult from "../models/historyResult.js";
import { Exam, Question, Subject } from "../models/index.js";

const ExamController = {
    get: async (req, res) => {
        try {
            const exams = await Exam.find().populate('subject')
            if (exams.length == 0) {
                return res.status(404).json({
                    message: 'Không tồn tại bài thi!'
                })
            }
            return res.status(200).json({
                data: exams
            })
        } catch (error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra!' + error
            })
        }
    },
    getByID: async (req, res) => {
        try {
            const exam = await Exam.findById(req.params.id)
                .populate({
                    path: 'questionGroups',
                    populate: { path: 'questions' }
                });


            if (!exam)
                return res.status(404).json({ error: 'Không thể tìm thấy bài thi!' });
            else {
                const listGroup = exam.questionGroups.map(group => group)
                return res.status(200).json(listGroup)
            }

        } catch (error) {
            res.status(400).json({ error: 'Có lỗi xảy ra! ' + error });
        }
    },

    create: async (req, res) => {
        try {
            const { name, subject } = req.body;
            const newExam = await new Exam({ name, subject })
            newExam.save();
            await Subject.findByIdAndUpdate(subject, { $push: { exams: newExam._id } })
            return res.status(201).json({
                message: 'Thêm thành công bài thi!',
                data: newExam
            })
        } catch (error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        try {
            const examUpdate = await Exam.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('subject')
            if (!id) {
                return res.status(404).json({ ok: false, message: "Bài thi không tồn tại!" });
            }
            return res.status(200).json({
                ok: true,
                data: examUpdate
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
    },
    delete: async (req, res) => {
        try {
            const exam = await Exam.findByIdAndDelete(req.params.id);
            if (!exam) {
                return res.status(404).json({ error: "Bài thi không tồn tại!" });
            }
            await Subject.updateOne(
                { _id: exam.subject },
                { $pull: { exams: exam._id } }
            );
            const updatedSubject = await Subject.findById(exam.subject).populate('exams');

            res.status(200).json({ message: 'Xóa thành công bài thi!', updatedSubject });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    submitExam: async (req, res) => {
        const { userId, examId, answers } = req.body; // Dữ liệu mới dạng groupQuestionId và selectedAnswers
        try {
            const submittedAnswers = [];

            // Duyệt qua từng groupQuestion
            for (const groupQuestionId in answers) {
                const groupData = answers[groupQuestionId];
                const { selectedAnswers } = groupData;

                // Lặp qua từng câu trả lời trong group
                for (const questionId in selectedAnswers) {
                    const selectedOption = selectedAnswers[questionId];
                    const question = await Question.findById(questionId);

                    if (!question) continue;

                    // Đối chiếu đáp án
                    const isCorrect = question.correctOption === selectedOption;

                    // Lưu câu trả lời vào Answer
                    const savedAnswer = await Answer.create({
                        question: questionId,
                        selectedOption,
                        isCorrect: isCorrect ? "true" : "false",
                        result: null
                    });

                    submittedAnswers.push(savedAnswer);
                }
            }

            // Tính tổng điểm và số câu trả lời đúng
            console.log(submittedAnswers)
            const correctAnswers = submittedAnswers.filter(ans => ans.isCorrect === "true").length;
            const totalScore = correctAnswers * 10;

            // Lưu kết quả vào HistoryResult
            const historyResult = await HistoryResult.create({
                user: userId,
                exam: examId,
                score: totalScore,
                correctAnswer: correctAnswers,
                submittedAt: new Date(),
                answers: submittedAnswers.map(ans => ans._id)
            });

            // Cập nhật kết quả vào từng Answer
            await Promise.all(
                submittedAnswers.map(ans =>
                    Answer.findByIdAndUpdate(ans._id, { result: historyResult._id })
                )
            );

            // Trả kết quả
            res.status(200).json({
                message: "Chúc mừng bạn đã hoàn thành bài thi!",
                score: totalScore,
                correctAnswers,
                historyId: historyResult._id
            });

        } catch (error) {
            console.error("Lỗi khi nộp bài:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi nộp bài thi" });
        }
    }

}

export default ExamController