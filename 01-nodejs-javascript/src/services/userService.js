const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({
            name,
            password: hashPassword,
            email,
            role: "user",
        });

        // Ẩn password khi trả về
        let { password: pw, ...userWithoutPassword } = result.toObject();
        return userWithoutPassword;
    } catch (error) {
        console.log(">>> Error in createUserService: ", error);
        return null;
    }
};

const loginService = async (email, password) => {
    try {
        // Không loại bỏ password ở đây, cần để so sánh
        const user = await User.findOne({ email });
        if (!user) {
            return { EC: 1, EM: "Email không tồn tại" };
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return { EC: 2, EM: "Mật khẩu không đúng" };
        }

        // Payload chỉ chứa thông tin user
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const access_token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || "1h" }
        );

        // Ẩn password trước khi trả về (nếu bạn muốn)
        const { password: pw, ...userWithoutPassword } = user.toObject();

        return {
            EC: 0,
            EM: "Login thành công",
            access_token,
            user: userWithoutPassword
        };
    } catch (error) {
        console.log(">>> Error in loginService: ", error);
        return null;
    }
};

module.exports = {
    createUserService,
    loginService,
};
