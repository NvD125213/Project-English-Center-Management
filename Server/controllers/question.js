import { Exam, Question, GroupQuestion } from '../models/index.js';

const QuestionController = {
    create: async (req, res) => { 
        try {
            const { idExam, part } = req.query;            
            const { questions } = req.body;
    
            if (!Array.isArray(questions)) {
                return res.status(400).json({ message: 'Không đúng định dạng nhóm câu hỏi!' });
            }
    
            const exam = await Exam.findById(idExam).populate('questionGroups');
            if (!exam) {
                return res.status(404).json({ message: 'Bài thi không tồn tại' });
            }
    
            const questionIDs = [];
            let newGroup = null;
    
            for (const questionData of questions) {
                const newQuestion = new Question({
                    title: questionData.title || '',
                    options: questionData.options,
                    correctOption: questionData.correctOption,
                    element: questionData.element || [] 
                });
                await newQuestion.save();
                questionIDs.push(newQuestion._id);
            }
    
            newGroup = new GroupQuestion({
                part: parseInt(part),
                type: 'single',
                questions: questionIDs
            });
            await newGroup.save();
    
            exam.questionGroups.push(newGroup._id);
            await exam.save();
    
            res.status(201).json({ 
                message: 'Thêm câu hỏi thành công', 
                data: newGroup 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thêm câu hỏi' });
        }
    },
    
    createWithGroups: async (req, res) => {
        try {
            const { idExam, part } = req.query;
            const { groups } = req.body; 
    
            if (!Array.isArray(groups)) {
                return res.status(400).json({ message: 'Danh sách nhóm câu hỏi không đúng định dạng' });
            }
    
            const exam = await Exam.findById(idExam);
            if (!exam) {
                return res.status(404).json({ message: 'Bài thi không tồn tại' });
            }
    
            const newGroupIds = []; 
    
            for (const groupData of groups) {
                const questionIds = [];
                for (const questionData of groupData.questions) {
                    const newQuestion = new Question({
                        title: questionData.title || '',
                        options: questionData.options || [],
                        correctOption: questionData.correctOption || '',
                        element: questionData.element || []
                    });
                    await newQuestion.save();
                    questionIds.push(newQuestion._id);
                }
    
                const newGroup = new GroupQuestion({
                    part: parseInt(part),
                    type: groupData.type || 'single', 
                    elements: groupData.elements || [], 
                    questions: questionIds 
                });
    
                await newGroup.save();
                newGroupIds.push(newGroup._id);
            }
    
            exam.questionGroups.push(...newGroupIds);
            await exam.save();
    
            res.status(201).json({
                message: 'Thêm các nhóm câu hỏi thành công',
                data: newGroupIds 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thêm nhóm câu hỏi' });
        }
    },
    
    
    update: async (req, res) => {
        try {
            const { idExam, part } = req.query;
            const { questions, audioUrl, imageUrl } = req.body;

            // Tìm bài thi và populate nhóm câu hỏi
            const exam = await Exam.findById(idExam).populate('questionGroups');
            if (!exam) {
                return res.status(404).json({ message: 'Bài thi không tồn tại' });
            }

            // Tìm nhóm câu hỏi theo part
            const groupToUpdate = exam.questionGroups.find(group => group.part === parseInt(part));
            if (!groupToUpdate) {
                return res.status(404).json({ message: `Không tồn tại nhóm câu hỏi cho part ${part}` });
            }

            // Duyệt qua từng part để cập nhật câu hỏi
            switch (parseInt(part)) {
                case 1:
                case 2:
                case 5:
                    // Cập nhật từng câu hỏi
                    for (const questionData of questions) {
                        if (questionData._id) {
                            // Nếu câu hỏi đã tồn tại, cập nhật nó
                            await Question.findByIdAndUpdate(
                                questionData._id,
                                {
                                    title: questionData.title || '',
                                    options: questionData.options,
                                    correctOption: questionData.correctOption,
                                    element: questionData.element || []
                                },
                                { new: true }
                            );
                        } else {
                            // Nếu câu hỏi không có _id, thêm mới câu hỏi
                            const newQuestion = new Question({
                                title: questionData.title || '',
                                options: questionData.options,
                                correctOption: questionData.correctOption,
                                element: []
                            });

                            if (questionData.audioUrl) {
                                newQuestion.element.push({ typeUrl: 'audio', url: questionData.audioUrl });
                            }
                            if (questionData.imageUrl) {
                                newQuestion.element.push({ typeUrl: 'image', url: questionData.imageUrl });
                            }

                            await newQuestion.save();
                            groupToUpdate.questions.push(newQuestion._id);
                        }
                    }
                    break;

                case 3:
                case 4:
                case 6:
                case 7:
                    groupToUpdate.element = [
                        { typeUrl: 'audio', url: audioUrl },
                        { typeUrl: 'image', url: imageUrl }
                    ];

                    for (const questionData of questions) {
                        if (questionData._id) {
                            await Question.findByIdAndUpdate(
                                questionData._id,
                                {
                                    title: questionData.title,
                                    options: questionData.options,
                                    correctOption: questionData.correctOption,
                                    element: questionData.element || []
                                },
                                { new: true }
                            );
                        } else {
                            const newQuestion = new Question({
                                title: questionData.title,
                                options: questionData.options,
                                correctOption: questionData.correctOption,
                                element: []
                            });

                            await newQuestion.save();
                            groupToUpdate.questions.push(newQuestion._id);
                        }
                    }
                    break;

                default:
                    return res.status(400).json({ message: 'Không tồn tại part!' });
            }
            await groupToUpdate.save();
            await exam.save();

            res.status(200).json({ message: 'Cập nhật câu hỏi thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống', error });
        }
    },
    getByExamAndPart: async(req, res) => {
        try {
            const { idExam, part } = req.query;

            const exam = await Exam.findById(idExam).populate({
                path: 'questionGroups',
                populate: {
                    path: 'questions'
                }
            })

            if(!exam) {
                return res.status(404).json({
                    message: 'Bài thi không tồn tại'
                })
            }
            
            const filterGroup1 = exam.questionGroups.filter(group => group.part === parseInt(part))
            if(filterGroup1.length === 0) {
                return res.status(404).json({
                    message: `Không tìm thấy câu hỏi trong nhóm ${part}`
                })
            }
            res.status(200).json({ questionGroups: filterGroup1 });
        } catch(error) {
            res.status(500).json({ message: 'Lỗi hệ thống', error });

        } 
    }
    
};

export default QuestionController;
