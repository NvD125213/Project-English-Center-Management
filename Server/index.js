import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'; // Đường dẫn đến file route user
import subjectRoutes from './routes/subject.js'
import examRoutes from './routes/exam.js'
import questionRoutes from './routes/question.js'
import historyRoutes from './routes/historyResult.js'
import blogRoutes from './routes/blog.js'
import menuRoutes from './routes/menu.js'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbName = 'EnglishCenter';
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL + dbName);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

// Route
app.use("/uploads", express.static("uploads"));

app.use('/api/user', userRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/blogs', blogRoutes)
app.use('/api/menu', menuRoutes);
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connection();
    console.log(`Server started on port ${port}`);
});
