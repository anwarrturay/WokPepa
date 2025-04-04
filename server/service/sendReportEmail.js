const nodemailer = require("nodemailer")
require("dotenv").config();

const sendReportEmail = async(email, reportType, description)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Verify SMTP connection before sending email
    await transporter.verify();
    console.log("SMTP connection verified");

    let mailOptions = {
        from: `"User Report:" <${process.env.EMAIL_USER}>`,
        to: "anwarrturay03@gmail.com",
        replyTo: email,
        subject: `New Report - ${reportType}`,
        html: `
            <h2>New Report Submitted</h2>
            <p><strong>Report Type:</strong> ${reportType}</p>
            <p><strong>Description:</strong></p>
            <p>${description}</p>
            <hr />`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Report email sent successfully.");
        return true;
    } catch (error) {
        console.error("Error sending report email:", error);
        return false;
    }
}

module.exports = sendReportEmail;