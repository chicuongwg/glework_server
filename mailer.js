const nodemailer = require("nodemailer");

// Thiết lập transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP host của Gmail
    port: 587, // Cổng cho TLS
    secure: false, // Sử dụng false cho TLS
    auth: {
        user: process.env.EMAIL_USER, // Email bạn sử dụng để gửi
        pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
    },
});

// Hàm gửi email xác nhận
const sendConfirmationEmail = (to, confirmationLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Xác nhận tài khoản",
        text: `Nhấp vào liên kết này để xác nhận tài khoản của bạn: ${confirmationLink}`,
        html: `<p>Nhấp vào <a href="${confirmationLink}">đây</a> để xác nhận tài khoản của bạn.</p>`,
    };

    return transporter.sendMail(mailOptions);
};

// Hàm gửi email đặt lại mật khẩu
const sendResetPasswordEmail = async (email, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Đặt lại mật khẩu của bạn",
        text: `Nhấp vào liên kết này để đặt lại mật khẩu của bạn: ${resetLink}`,
        html: `<p>Nhấp vào <a href="${resetLink}">đây</a> để đặt lại mật khẩu của bạn.</p>`,
    };

    return transporter.sendMail(mailOptions);
};

// Xuất các hàm
module.exports = { sendConfirmationEmail, sendResetPasswordEmail };
