
import nodemailer from 'nodemailer';
export const sendEmail=async (email, subject , text)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.EmailHost,
            port:465,
            service:process.env.EmailService,
            secure:true,
            auth:{
                user:process.env.EmailSenderUser,
                pass:process.env.EmailSenderPass
            }
        });

        await transporter.sendMail({
            from: process.env.EmailSenderUser,
            to: email,
            subject: subject,
            text: text,
          });
          
          console.log("email sent sucessfully");
        
    } catch (error) {
         console.log("email error: " + error);
    }
}