import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const UserController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if(!user) {
                return res.status(401).json({
                    message: 'Email hoặc mật khẩu không chính xác !'
                })
            }

            const checkPass = await bcrypt.compare(password, user.password);
            if(!checkPass) {
                return res.status(401).json({
                    message: 'Sai mật khẩu! Hãy nhập lại mật khẩu!'
                })
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                token: token,
                user: user
            })
        } catch(error) {
            res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
    },
    register: async (req, res) => {
        const { name, log_Name, email, password, phone } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const excitingUser = await User.findOne({ email });
            if (excitingUser) {
                return res.status(400).json({
                    message: 'Email đã được sử dụng!'
                });
            }

            const newUser = new User({
                name,
                log_Name,
                email,
                password: hashPassword,
                phone,
            });

            await newUser.save();
            res.status(201).json({ message: 'Người dùng đã đăng ký thành công.' });
        } catch (error) {
            res.status(500).json({
                message: 'Có lỗi xảy ra!',
                error: error
            });
        }
    },
    get: async (req, res) => {
        const users = await User.find();
        try {
            if(users.length == 0) {
                return res.status(400).json({
                    message: ' Danh sách người dùng rỗng!'
                })
            }
            return res.status(200).json({
                data: users
            })
        } catch(error) {
            return res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            })
        }
      
    },
    getByID: async (req, res) => {
        try {
            const user = await User.findById(req.params.id); // Sử dụng findById để tìm theo ID
            if(user) {
                return res.status(200).json({
                    ok: true,
                    data: user
                });
            }
            return res.status(404).json({ ok: false, message: "Người dùng không tồn tại!" }); // Thay đổi status code thành 404
        } catch(error) {
            return res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            });
        }
    },
    update: async (req, res) => {
        const {id} = req.params
        const updates = req.body

        try {
            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 10);
            }
            const userUpdate = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true});
            if (!userUpdate) {
                return res.status(404).json({ ok: false, message: "Người dùng không tồn tại!" });
            }
    
            return res.status(200).json({
                ok: true,
                data: userUpdate
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            });
        }
    },
    delete: async (req, res) => {
        try{
            const user = await User.findByIdAndDelete(req.params.id) 
            if(!user) {
                return res.status(404).json({ ok: false, message: "Người dùng không tồn tại!" });
            }
            return res.status(200).json({
                ok: true,
                message: 'Xóa thành công !'
            }); 
        } catch(error) {
            return res.status(500).json({
                message: 'Có lỗi xảy ra: ' + error
            });
        }

    }
};

export default UserController;
