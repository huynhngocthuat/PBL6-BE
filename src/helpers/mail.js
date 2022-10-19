import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
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

const mailHost = "smtp.gmail.com";
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
      type: "OAuth2",
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
    console.log("sendMail error", error);
  }
};

export default sendMail;
