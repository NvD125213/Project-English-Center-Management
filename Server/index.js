import express from 'express';           
import mongoose from 'mongoose';         
import dotenv from 'dotenv';  
import userRoutes from './routes/user.js'; // Đường dẫn đến file route user
import subjectRoutes from './routes/subject.js'
import examRoutes from './routes/exam.js'
import cors from 'cors'
dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors()) 

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
app.use('/api/user', userRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/exam', examRoutes);


const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connection();
    console.log(`Server started on port ${port}`);
});
