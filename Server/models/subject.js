import mongoose, {Schema} from 'mongoose'

const Subject = mongoose.model('Subject', 
    new Schema({
        name: {type: String, required: true},
        createAt: {
            type: Date,
            default: Date.now
        }
    })
)

export default Subject