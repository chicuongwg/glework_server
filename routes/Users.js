const express = require("express");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail, sendResetPasswordEmail } = require("../mailer"); // Nhập hàm gửi email
const router = express.Router();
const db = require("../models");
const User = db.User;


router.post("/", async (req, res) => {
    const { firstName, lastName, dateOfBirth, phoneNumber, email, password } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Email must be a valid email address" });
    }

    // Convert DD-MM-YYYY to YYYY-MM-DD
    const [day, month, year] = dateOfBirth.split("-");
    const formattedDateOfBirth = `${year}-${month}-${day}`; 

    // Validate phone number
    if (!/^\+84\d{9,10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Phone number must be a valid Vietnamese number" });
    }

    try {
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.isConfirmed) {
            return res.status(409).json({ message: "User with this email already exists and is confirmed." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới hoặc cập nhật thông tin nếu người dùng đã tồn tại
        const newUser = existingUser
            ? await existingUser.update({
                firstName,
                lastName,
                dateOfBirth: formattedDateOfBirth, // Sử dụng định dạng ngày đã chuyển đổi
                phoneNumber,
                password: hashedPassword,
            })
            : await User.create({
                firstName,
                lastName,
                dateOfBirth: formattedDateOfBirth, // Sử dụng định dạng ngày đã chuyển đổi
                phoneNumber,
                email,
                password: hashedPassword,
            });

        // Tạo liên kết xác nhận
        const confirmationLink = `http://${process.env.HOST}:${process.env.PORT}/users/confirm/${newUser.id}`; // Sử dụng biến môi trường

        // Gửi email xác nhận
        await sendConfirmationEmail(firstName, lastName, email, confirmationLink); // Cập nhật để gửi tên người dùng

        res.status(201).json({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            dateOfBirth: newUser.dateOfBirth,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email,
            message: "Confirmation email sent."
        });
    } catch (error) {
        console.error("Error creating user:", error);

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ message: error.errors.map(e => e.message) });
        } else if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "Email already exists." });
        } else {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
});

router.get("/confirm/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Tìm người dùng theo ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Cập nhật trạng thái xác nhận (thêm cột `isConfirmed` trong bảng User)
        user.isConfirmed = true; // Giả sử bạn đã thêm cột `isConfirm¡ed`
        await user.save();

        // Redirect to the frontend login page
        res.redirect(`${process.env.FRONTEND_URL}/login`);
    } catch (error) {
        console.error("Error confirming user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Login
// Route đăng nhập
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ where: { email } });

        // Nếu không tìm thấy người dùng
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Kiểm tra xem người dùng đã xác nhận chưa
        if (!user.isConfirmed) {
            return res.status(403).json({ message: "Please confirm your email before logging in." });
        }

        // Nếu đăng nhập thành công, trả về thông tin người dùng (không bao gồm mật khẩu)
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            email: user.email,
            message: "Login successful."
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//QUên mật khẩu
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    // Validate input field
    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ where: { email } });

        // Nếu không tìm thấy người dùng
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Tạo liên kết đặt lại mật khẩu
        const resetLink = `http://${process.env.HOST}:${process.env.PORT}/users/reset-password/${user.id}`;

        // Gửi email xác nhận với liên kết đặt lại mật khẩu
        await sendResetPasswordEmail(email, resetLink);

        res.status(200).json({ message: "Reset password email sent." });
    } catch (error) {
        console.error("Error sending reset password email:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Route để đặt lại mật khẩu
// Route để hiển thị form (GET)
router.get("/reset-password/:userId", async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.send(`
        <form action="/users/reset-password/${userId}" method="POST">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <button type="submit">Reset Password</button>
        </form>
    `);
});

// Route để xử lý đặt lại mật khẩu (POST)
router.post("/reset-password/:userId", async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required." });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = router;
