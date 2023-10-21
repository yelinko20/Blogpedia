import nodemailer from "nodemailer";
import { env } from "../utils/validateEnv";

const sendEmail = async (
  to: string,
  html: string,
  subject: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    port: 456,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: env.EMAIL_USERNAME,
    to,
    html,
    subject,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
