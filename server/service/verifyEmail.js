const nodemailer = require("nodemailer");

const verifyEmail = async (to, subject, verificationLink)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_USER,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        let mailOptions = {
            from: `"WokPepa" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: `
                <div style="font-family: 'Montserrat', sans-serif; padding: 40px; background-color: #f9f9f9; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);">
                    
                        <h2 style="margin-bottom: 20px; font-size: 24px; color: #2A5D9E;">
                            Verify Your Email Address
                        </h2>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            Thank you for signing up. To get started, please confirm your email address by clicking the button below:
                        </p>

                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationLink}" 
                                style="background-color: #2A5D9E; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
                                Verify Email
                            </a>
                        </div>

                        <p style="font-size: 14px; color: #555;">
                            This verification link is valid for <strong>1 hour</strong>. If the button above doesn't work, you can also copy and paste the following link into your browser:
                        </p>

                        <p style="font-size: 14px; color: #555; word-break: break-all;">
                            <a href="${verificationLink}" style="color: #2A5D9E;">${verificationLink}</a>
                        </p>

                        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />

                        <p style="font-size: 12px; color: #999;">
                            This message was sent from <strong>${process.env.CLIENT_URL}</strong>. If you did not request this, you can safely ignore it.
                        </p>
                    </div>
                </div>

            `
        }
    
        await transporter.sendMail(mailOptions)
        console.log("Verification Link sent Successfully: ", verificationLink)
    }catch(err){
        console.error("Error sending verifcation Link", {
            message: err.message,
            cause: err.cause
        })
    }

}



module.exports = verifyEmail;