import mongoose, {Schema} from 'mongoose'

const Exam = mongoose.model('Exam', 
    new Schema({
      name: { type: String, required: true },
      subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
      questionGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupQuestion' }]  
    })
)

export default Exam