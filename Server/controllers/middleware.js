import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ Header
    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};