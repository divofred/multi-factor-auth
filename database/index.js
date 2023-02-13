import mongoose from 'mongoose';

const ConnectDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected successfully');
    })
    .catch(err => {
      console.log(err.message);
    });
};

export default ConnectDB;
