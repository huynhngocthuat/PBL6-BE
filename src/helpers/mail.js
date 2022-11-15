import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { errors } from 'constants';

dotenv.config();

const { ADMIN_EMAIL_ADDRESS, GOOGLE_APP_PASSWORD } = process.env;

const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const getTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: ADMIN_EMAIL_ADDRESS,
      pass: GOOGLE_APP_PASSWORD,
    },
  });

  return transporter;
};

const sendMail = async (to, subject, htmlContent) => {
  const transporter = getTransporter();
  try {
    const options = {
      from: ADMIN_EMAIL_ADDRESS,
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(options);
  } catch (error) {
    throw new Error(errors.EMAIL_NOT_SENT);
  }
};

export const sendEmailConfirm = async ({ email, confirmToken }) => {
  const html = `
    <h1>Confirm your email</h1>
    <p>Please click on the link below to confirm your email</p>
    <a href="${process.env.BASE_URL}/confirm-email/${confirmToken}">Confirm email</a>
  `;
  const res = await sendMail(email, 'Confirm email', html);
  return res;
};

export const sendVerifyCode = async ({ email, verifyCode }) => {
  const html = `
    <h1>Reset password</h1>
    <p>Please enter the code below to reset your password:</p>
    <p style="font-weight:600; font-size:24px">${verifyCode}</p>
    <p>This code will expire in 5 minutes</p>
  `;
  const res = await sendMail(email, 'Reset password', html);
  return res;
};

export default sendMail;
