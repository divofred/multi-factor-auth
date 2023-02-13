import { SignJWT, jwtVerify } from 'jose';
import cookie from 'cookie';
const secret = process.env.SECRET;
export default async function Verify(req, res) {
  const OTP = req.cookies.OTPToken; //Getting the token form the cookie
  if (OTP) {
    try {
      const OTPVerify = await jwtVerify(
        //Verifying the token
        OTP,
        new TextEncoder().encode(secret)
      );
      console.log(OTPVerify.payload.OTP, req.body.OTP);

      if (OTPVerify.payload.OTP === req.body.OTP) {
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60 * 24; // 1day

        const token = await new SignJWT({ key: 'test' })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setExpirationTime(exp)
          .setIssuedAt(iat)
          .setNotBefore(iat)
          .sign(new TextEncoder().encode(secret)); //Generating the token

        const serialized = cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/',
        }); //Serializing the token

        const OTPserialized = cookie.serialize('OTPToken', null, {
          httpOnly: true,
          maxAge: 1,
          path: '/',
        }); //Serializing the token

        res.setHeader('Set-Cookie', [serialized, OTPserialized]); //Setting the cookie

        return res
          .status(200)
          .json({ success: true, message: 'OTP is correct' });
      }
      res.status(400).json({ success: false, message: 'OTP is not correct' });
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, message: 'Invalid OTP', error });
    }
  } else {
    res.status(403).json({ success: false, message: 'OTP does not exist' });
  }
}
