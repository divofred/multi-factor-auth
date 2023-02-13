import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
const secret = process.env.SECRET; //Importing the secret
export const config = {
  //Setting the supported route
  matcher: ['/login', '/signup', '/protected'],
};
export default async function Middleware(req, res) {
  const token = req.cookies.get('token')?.value; //Getting the token form the cookie
  const url = new URL(req.url);
  const tokenChecker = async () => {
    if (token) {
      try {
        const verified = await jwtVerify(
          //Verifying the token
          token,
          new TextEncoder().encode(secret)
        );
        return verified;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  };
  if (url.pathname === '/protected') {
    //Checking the present url
    const checker = await tokenChecker();
    if (checker) {
      return null;
    } else {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  if (url.pathname === '/login' || url.pathname === '/signup') {
    const checker = await tokenChecker();
    if (checker) {
      return NextResponse.redirect(new URL('/protected', req.url));
    }
  }
  NextResponse.next();
}
