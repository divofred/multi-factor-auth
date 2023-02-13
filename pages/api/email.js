import nodemailer from 'nodemailer';
import { customAlphabet } from 'nanoid';

import { SignJWT } from 'jose';
import cookie from 'cookie';

const secret = process.env.SECRET;
const nanoid = customAlphabet('1234567890', 8);

export default async function Verify(req, res) {
  const OTP = nanoid();
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // 1day

  const OTPToken = await new SignJWT({ OTP })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret)); //Generating the token
  const serialized = cookie.serialize('OTPToken', OTPToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  }); //Serializing the token
  res.setHeader('Set-Cookie', serialized); //Setting the cookie

  const transporter = nodemailer.createTransport({
    service: 'gmail', //Specifying the service
    auth: {
      user: 'yourgmai@gmail.com', //Your Gmail
      pass: process.env.PASSWORD, //Your app password
    },
  });

  const mailOptions = {
    from: 'yourgmai@gmail.com',
    to: req.body.email, //Getting the user's email
    subject: 'One Time Password',
    html: `Here is your OTP: <b>${OTP}</b>`, //Sending the OTP
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(201).json({ success: true, message: info.response });
    }
  });
}
