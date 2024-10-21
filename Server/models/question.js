import mongoose, {Schema} from "mongoose";

const Question = mongoose.model('Question', 
    new Schema({
        title: {type: String},
        element: [
            {
                typeUrl: { type: String, enum: ['audio', 'image']},
                url: { type: String }
            }
        ],
        options: [
            {
                option: { type: String },
                text: { type: String } 
            }
        ],
        correctOption: {type: String},
        createAt: {
            type: Date,
            default: Date.now
        },
    })
)

const GroupQuestion = mongoose.model('GroupQuestion', 
    new Schema({
        part: { type: Number, required: true, min: 1, max: 7 },
        type: { type: String, enum: ['single', 'group'], required: true },
        elements: [
            {
                typeUrl: { type: String, enum: ['image', 'audio']},
                url: {type: String}
            }
        ],
        questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]

    })
)

export {
    Question,
    GroupQuestion
}

