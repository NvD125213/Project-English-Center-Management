import UserController from "../controllers/user.js";
import express from 'express';

const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getAll', UserController.get);
router.get('/getByID/:id', UserController.getByID);
router.put('/update/:id', UserController.update)
router.delete('/delete/:id', UserController.delete)

export default router;
