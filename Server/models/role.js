import mongoose, {Schema} from 'mongoose';

const Role = mongoose.model('Role', 
    new Schema({
        name: {
            type: String,
            required: true, // not null
        },
       
    })
)
export default Role