import mongoose, { Schema } from 'mongoose'

const HistoryResult = mongoose.model('HistoryResult',
    new Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
        score: { type: Number, default: 0 },
        correctAnswer: { type: Number, default: 0 },
        submittedAt: { type: Date, default: Date.now },
        answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    })
)
export default HistoryResult