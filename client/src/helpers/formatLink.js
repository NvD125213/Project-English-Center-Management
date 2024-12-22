export const formatLink = (name) => {
    return name
        .toLowerCase() // Chuyển về chữ thường
        .normalize("NFD") // Chuẩn hóa Unicode thành dạng tổ hợp (decomposed)
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu (accent marks)
        .replace(/\s+/g, '-') // Thay khoảng trắng giữa các từ bằng dấu '-'
        .replace(/[^a-z0-9-]/g, ''); // Loại bỏ ký tự không hợp lệ
};
