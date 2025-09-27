// controllers/userController.js
const { createUserService, loginService } = require('../services/userService');
const User = require('../models/user');

// Đăng ký
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await createUserService(name, email, password);
        return res.status(200).json({ EC: 0, EM: "Tạo user thành công", data });
    } catch (error) {
        console.error(">>> Error in createUser:", error);
        return res.status(500).json({ EC: -1, EM: "Internal server error" });
    }
};

// Đăng nhập
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await loginService(email, password);
        return res.status(200).json(data);
    } catch (error) {
        console.error(">>> Error in handleLogin:", error);
        return res.status(500).json({ EC: -1, EM: "Internal server error" });
    }
};

// Lấy thông tin user (dùng middleware verifyToken trước khi vào đây)
const getUser = async (req, res) => {

    return res.status(200).json({ EC: 0, EM: "Lấy thông tin user thành công", data: req.user });

};

module.exports = {
    createUser,
    handleLogin,
    getUser,
};
