import express from 'express';           // Dùng import thay vì require
import mongoose from 'mongoose';         // Dùng import cho mongoose
import dotenv from 'dotenv';     
import posts from './routes/post.js'
dotenv.config();  // Gọi hàm config từ dotenv

const app = express();
app.use(express.json());
// Kết nối đến MongoDB
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

app.use('/post', posts)

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connection();
    console.log(`Server started on port ${port}`);
});
