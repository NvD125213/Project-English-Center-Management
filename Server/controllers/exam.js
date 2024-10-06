import {Exam, Subject} from "../models/index.js";

const ExamController ={
    get: async (req, res) => {
       try {
            const exams = await Exam.find().populate('subject')
            if(exams.length == 0) {
                return res.status(404).json({
                    message: 'Không tồn tại bài thi!'
                })
            }
            return res.status(200).json({
                data: exams
            })
       } catch(error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra!' + error
            })
       }
    }, 
    getByID: async (req, res) => {
        try {
            const exam = await Exam.findById(req.params.id).populate('GroupQuestion');
            if (!exam) 
                return res.status(404).json({ error: 'Không thể tìm thấy bài thi!' });
            res.status(200).json(exam);
        } catch (error) {
            res.status(400).json({ error: 'Có lỗi xảy ra!' + error });
        }
    }, 
    create: async (req, res)=>{
        try {
            const { name, subject } = req.body;
            const newExam = await new Exam({name, subject})
            newExam.save();
            await Subject.findByIdAndUpdate(subject, {$push: {exams: newExam._id}})
            return res.status(201).json({
                message: 'Thêm thành công bài thi!',
                data: newExam
            })
        } catch(error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
    },
    update: async (req, res)=>{
        const {id} = req.params;
        const updates = req.body;
        try {
            const examUpdate = await Exam.findByIdAndUpdate(id, updates, {new: true, runValidators: true}).populate('subject')
            if (!id) {
                return res.status(404).json({ ok: false, message: "Bài thi không tồn tại!" });
            }
            return res.status(200).json({
                ok: true,
                data: examUpdate
            });
        } catch(error) {
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
    }    
    
}

export default ExamController