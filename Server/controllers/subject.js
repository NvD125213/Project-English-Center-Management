import {Subject} from "../models/index.js";

const SubjectController ={
    get: async (req, res) => {
        const subjects = await Subject.find().populate('exams')

        try {
            if(subjects.length == 0) {
                return res.status(400).json({
                    message: 'Danh sách chủ đề trống!'
                });
                 
            }
            
            return res.status(200).json({
                data: subjects
            })
            
        } catch(error) {
            res.status(500).json({
                message: 'Có lỗi xảy ra!' + error,
                
            });
        }
    }, 
    getByID: async (req, res) => {
        try {
            const subject = await Subject.findById(req.params.id).populate('exams');
            if (!subject) 
                return res.status(404).json({ error: 'Không thể tìm thấy chủ đề!' });
            res.status(200).json(subject);
        } catch (error) {
            res.status(400).json({ error: 'Có lỗi xảy ra!' + error });
        }
    }, 
    create: async (req, res)=>{
        const { name } = req.body;
    
        try {
            const subject = new Subject({ name });
            await subject.save();
            res.status(201).json(subject);
        } catch (error) {
            res.status(400).json({ error: 'Lỗi' });
        }
    },
    update: async (req, res)=>{
        const {id} = req.params;
        const updates = req.body;
        try {
            const subjectUpdate = await Subject.findByIdAndUpdate(id, updates, {new: true, runValidators: true})
            if (!id) {
                return res.status(404).json({ ok: false, message: "Chủ đề không tồn tại!" });
                
            }
            return res.status(200).json({
                ok: true,
                data: subjectUpdate
            });
        } catch(error) {
            return res.status(400).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
    },
    delete: async (req, res)=>{
        try{
            const subject = await Subject.findByIdAndDelete(req.params.id) 
            if(!subject) {
                return res.status(404).json({ ok: false, message: "Chủ đề không tồn tại!" });
            }
            return res.status(200).json({
                ok: true,
                message: 'Xóa thành công !'
            }); 
        } catch(error) {
            return res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            });
        }

    }
    
}

export default SubjectController