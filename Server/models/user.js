import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import pkg from 'validator'; // Import toàn bộ module validator
const { isMobilePhone } = pkg; // Trích xuất isMobilePhone từ module validator

const UserSchema = new Schema({
    name: {
        type: String,
        required: true, // not null
    },
    log_Name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => value && value.length > 3,
            message: 'Tên đăng nhập phải lớn hơn 3 ký tự!'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email là duy nhất
        validate: {
            validator: (value) => isEmail(value),
            message: 'Định dạng của Email không đúng!'
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => isMobilePhone(value, 'vi-VN'),
            message: 'Số điện thoại không hợp lệ!'
        }
    },
    role: {
        type: Number,
        enum: [1, 2],
        required: true,
        default: 2
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
export default User;
