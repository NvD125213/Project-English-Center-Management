import express from 'express';           // Dùng import thay vì require
import mongoose from 'mongoose';         // Dùng import cho mongoose
import dotenv from 'dotenv';     
import User from './models/user.js';
dotenv.config();  // Gọi hàm config từ dotenv

const app = express();
app.use(express.json());
// Kết nối đến MongoDB
const dbName = 'EnglishCenter'
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL + dbName);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

const newUser = new User({name: 'Ngô Văn Đức', log_Name: 'NvD123', email: 'ilove@gmail.com', password: '12345', phone: '094334453', role: 1})
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connection();
    console.log(`Server started on port ${port}`);
    await newUser.save()
});
