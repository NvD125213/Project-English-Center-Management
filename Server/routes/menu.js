import express from 'express';
import { createMenu, getMenus, getMenuById, updateMenu, deleteMenu, findMenuBySubMenuId } from '../controllers/menu.js';

const router = express.Router();

// Tạo mới Menu
router.post('/create', createMenu);

// Lấy danh sách Menu
router.get('/getAll', getMenus);

// Lấy Menu theo ID
router.get('/getById/:id', getMenuById);

// Cập nhật Menu
router.put('/update/:id', updateMenu);

// Xóa Menu
router.delete('/delete/:id', deleteMenu);
router.get('/findMenuBySubMenuId/:id', findMenuBySubMenuId)

export default router;
