import { IsentEmail } from "../../usecases/interface/service/sentEmail";
import nodemailer from 'nodemailer';

export class SentEmail implements IsentEmail {
  constructor() {}

  async sentEmailVerification(name:string, email: string, verification: string): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user:process.env.MAILER_EMAIL,
        pass:process.env.MAILER_PASSWORD,

      },
    });

    const sendVerificationEmail = async (name:string,toEmail: string, verificationCode: string) => {
      // Define email options
      const mailOptions = {
        from: process.env.MAILER_EMAIL,        to: toEmail,
        subject: 'Email Verification',
        text: `Hello${name} ,\n\nYour verification code is: ${verificationCode}\n\nThanks, \nEvenTo`,
      };

      try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.error('Error sending email:', error);
         return error
      }
    };

    await sendVerificationEmail(name,email, verification);
  }
}
