import mongoose, {Schema} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const User = mongoose.model('User', 
    new Schema({
        name: {
            type: String,
            required: true, // not null
        },
        log_Name: {
            type: String,
            required: true, 
            validate: {
                validator: (value) => value.length > 3,
                message: 'Tên đăng nhập phải lớn hơn 3 ký tự !'
            }
        },
        email: {
            type: String,
            required: true, 
            validate: {
                validator: (value) => isEmail,
                message: 'Định dạng của Email không đúng !'
            }
        },

        password: {
            type: String,
            required: true,

        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        },
        createAt: {
            type: Date,
            default: Date.now
        }

    })
)
export default User