/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

console.log(
  "NEXT_PUBLIC_FIREBASE_APIKEY in Next:",
  process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
);
