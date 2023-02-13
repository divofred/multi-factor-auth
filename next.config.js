/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO_URI:
      'mongodb+srv://admin:password@mfa.example.mongodb.net/?retryWrites=true&w=majority',
    SECRET: 'OpenReplay',
    PASSWORD: 'yourapppassword',
  },
};

module.exports = nextConfig;
