const nodemailer = require("nodemailer");

// Set up transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP host of Gmail
    port: 587, // Port TLS
    secure: false, // Sử dụng false cho TLS
    auth: {
        user: process.env.EMAIL_USER, // Email bạn sử dụng để gửi
        pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
    },
});

// Send email confirmation
const sendConfirmationEmail = async (firstName, lastName, email, confirmationLink) => {
    // Tạo username từ lastName và firstName
    const userName = [lastName, firstName].join(' ');

    // Kiểm tra địa chỉ email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        console.error("Invalid email address:", email);
        return; // Hoặc xử lý lỗi theo cách khác
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Xác nhận tài khoản tại GleWork",
        text: `Chào ${userName},\n\nCảm ơn bạn đã đăng ký tài khoản tại GleWork! Để hoàn tất quá trình đăng ký và kích hoạt tài khoản, vui lòng nhấn vào liên kết dưới đây để xác thực email của bạn:\n\n${confirmationLink}\n\nNếu liên kết không hoạt động, bạn có thể sao chép và dán đường dẫn sau vào trình duyệt của mình:\n${confirmationLink}\n\nLiên kết xác thực này sẽ hết hạn sau 24 giờ. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.\n\nNếu có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua email support@glework.com hoặc số điện thoại 123-456-7890.\n\nTrân trọng,\nĐội ngũ hỗ trợ GleWork`,
        html: `
            <p>Chào <strong>${userName}</strong>,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>GleWork</strong>! Để hoàn tất quá trình đăng ký và kích hoạt tài khoản, vui lòng nhấn vào nút dưới đây để xác thực email của bạn:</p>
            <p><a href="${confirmationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Xác nhận tài khoản</a></p>
            <p>Liên kết xác thực này sẽ hết hạn sau <strong>24 giờ</strong>. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
            <p>Nếu có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với chúng tôi qua email <strong>glework.sp@gmail.com</strong> hoặc số điện thoại <strong>0907193123</strong>.</p>
            <p>Trân trọng,<br>Đội ngũ hỗ trợ GleWork</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// Send email to reset password
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
