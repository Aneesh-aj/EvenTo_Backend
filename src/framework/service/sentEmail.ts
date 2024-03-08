import { IsentEmail } from "../../usecases/interface/service/sentEmail";
import nodemailer from 'nodemailer';

export class SentEmail implements IsentEmail {
  constructor() {}

  async sentEmailVerification(name:string, email: string, verification: string): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: 'tuser2287@gmail.com',
        pass: 'nbocstrrriufybdk',

      },
    });

    // Function to send verification email
    const sendVerificationEmail = async (name:string,toEmail: string, verificationCode: string) => {
      // Define email options
      const mailOptions = {
        from: 'tuser2287@gmail.com',        to: toEmail,
        subject: 'Email Verification',
        text: `Hello${name} ,\n\nYour verification code is: ${verificationCode}\n\nThanks, \nYour App Name`,
      };

      try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    // Example usage
    await sendVerificationEmail(name,email, verification);
  }
}
