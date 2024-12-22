import mongoose, { Schema } from 'mongoose'

const Answer = mongoose.model('Answer',
    new Schema({
        question: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true
        },
        selectedOption: {
            type: String
        },
        isCorrect: { type: String },
        result: { type: mongoose.Schema.Types.ObjectId, ref: 'HistoryResult' }
    })
)

export default Answer
