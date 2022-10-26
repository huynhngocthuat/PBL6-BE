/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { errors } from 'constants';

dotenv.config();

const {
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET,
  ADMIN_EMAIL_ADDRESS,
  GOOGLE_MAILER_REFRESH_TOKEN,
} = process.env;

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const getAccessToken = async () => {
  const accessToken = await myOAuth2Client.getAccessToken();
  return accessToken.token;
};

const getTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: getAccessToken(),
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

const sendEmailConfirm = async ({ email, confirmToken }) => {
  const html = `
    <h1>Confirm your email</h1>
    <p>Please click on the link below to confirm your email</p>
    <a href="${process.env.BASE_URL}/confirmEmail/${confirmToken}">Confirm email</a>
  `;
  const res = await sendMail(email, 'Confirm email', html);
  return res;
};

export default sendMail;

export { sendEmailConfirm };
