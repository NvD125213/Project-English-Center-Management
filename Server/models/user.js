import mongoose, { Schema } from 'mongoose';
import validator from 'validator'; // Import thư viện validator

// Định nghĩa UserSchema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tên không được để trống'], // Thêm thông báo lỗi
    },
    log_Name: {
        type: String,
        required: [true, 'Tên đăng nhập không được để trống'], // Thêm thông báo lỗi
        unique: true,
        validate: {
            validator: (value) => value && value.length > 3,
            message: 'Tên đăng nhập phải lớn hơn 3 ký tự!',
        },
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Định dạng email sai',
        },
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại không được để trống'],
        validate: {
            validator: (value) => validator.isMobilePhone(value, 'vi-VN'),
            message: 'Sai định dạng số điện thoại',
        },
    },
    role: {
        type: Number,
        enum: [1, 2],
        required: [true, 'Vai trò không được để trống'],
        default: 2,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

export default User;
