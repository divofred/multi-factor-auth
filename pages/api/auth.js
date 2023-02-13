import ConnectDB from '@/database'; //Importing the Function for connecting MongoDB.
import User from '@/database/model'; // Importing the User Model
import { SignJWT, jwtVerify } from 'jose';
import cookie from 'cookie'; //Importing the Cookie Module

ConnectDB(); // Running the function
const Auth = async (req, res) => {
  const { method } = req; //Getting the type of request made
  const secret = process.env.SECRET; //Getting the secret
  switch (method) {
    case 'GET':
      try {
        const serialized = cookie.serialize('token', null, {
          httpOnly: true,
          maxAge: 1, //Deleting the cookie after 1 second
          path: '/',
        }); //Serializing the token
        res.setHeader('Set-Cookie', serialized); //Setting the cookie
        res.status(201).json({ success: true, message: 'Logout Successful' });
      } catch (error) {
        res.status(401).json({ success: false, message: error.message });
      }
      break;
    case 'PUT': //handler for PUT requests
      try {
        const check = await User.findOne({ email: req.body.email }); //Checking if the email exist
        if (check) {
          res
            .status(400)
            .json({ success: false, message: 'Email already exists!' });
        } else {
          await User.create(req.body); //Adding the user to the database
          res
            .status(201)
            .json({ success: true, message: 'Account created successfully' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: 'PUT request Error' });
      }
      break;
    case 'POST': //handler for POST requests
      try {
        const user = await User.findOne({ email: req.body.email }); //Checking if the email exist with a password
        if (user) {
          if (user.password === req.body.password) {
            //Checking the password provided is the same with the one in the databse
            res
              .status(200)
              .json({ success: true, message: 'Login successful' });
          } else {
            res
              .status(401)
              .json({ success: false, message: 'Invalid Email or Password' });
          }
        } else {
          res
            .status(401)
            .json({ success: false, message: 'Invalid Email or Password' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'POST request Error' });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, message: 'Unsupported CRUD operation' });
      break;
  }
};
export default Auth;
