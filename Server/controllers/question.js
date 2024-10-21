import { Exam, Question, GroupQuestion } from '../models/index.js';

const QuestionController = {
    create: async (req, res) => { 
        try {
            const { idExam, part } = req.query;            
            const { questions, audioUrl, imageUrl } = req.body;
    
            const exam = await Exam.findById(idExam).populate('questionGroups');
            if (!exam) {
                return res.status(404).json({ message: 'Bài thi không tồn tại' });
            }
    
            const questionIDs = [];
            let newGroup = null;  
    
            switch (parseInt(part)) {
                case 1: 
                case 2: 
                case 5:
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
                    break;
                case 3:
                case 4: 
                case 6:
                case 7:
                    const newGroup3and4 = new GroupQuestion({
                        part: parseInt(part),
                        type: 'group',  
                        elements: [
                            { typeUrl: 'audio', url: audioUrl },
                            { typeUrl: 'image', url: imageUrl }
                        ],
                        questions: []  
                    }); 
                    await newGroup3and4.save();
                    
                    for (const questionData of questions) {
                        const newQuestion = new Question({
                            title: questionData.title,
                            options: questionData.options,
                            correctOption: questionData.correctOption,
                            element: []
                        });
    
                        await newQuestion.save();
                        newGroup3and4.questions.push(newQuestion._id);
                    }
    
                    await newGroup3and4.save();
                    newGroup = newGroup3and4;
                    break;
                default: 
                    return res.status(400).json({ message: 'Không tồn tại part!' });
            }
    
            // Thêm vào bài thi
            exam.questionGroups.push(newGroup._id);
            await exam.save();
            
            // Trả về message và dữ liệu nhóm câu hỏi vừa tạo
            res.status(201).json({ 
                message: 'Thêm câu hỏi thành công', 
                data: newGroup // Trả về dữ liệu nhóm câu hỏi
            });
    
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống', error });
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

                    // Cập nhật từng câu hỏi
                    for (const questionData of questions) {
                        if (questionData._id) {
                            // Cập nhật câu hỏi nếu đã có
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
                            // Nếu không có _id, tạo mới
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

            // Lưu thay đổi nhóm câu hỏi và bài thi
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
            const filterGroup = exam.questionGroups.filter(group => group.part === parseInt(part))
            if(filterGroup.length === 0) {
                return res.status(404).json({
                    message: `Không tìm thấy câu hỏi trong nhóm ${part}`
                })
            }
            res.status(200).json({ questionGroups: filterGroup });
        } catch(error) {
            res.status(500).json({ message: 'Lỗi hệ thống', error });

        } 
    }
};

export default QuestionController;
