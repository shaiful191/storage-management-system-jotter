import nodemailer from "nodemailer";

const sendMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

   
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password OTP - Jotter",
    text: `Your reset password code is: ${otp}`,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Email sending failed");
      }
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }

};

export default sendMail;
