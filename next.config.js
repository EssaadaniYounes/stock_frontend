/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');
module.exports = nextTranslate({
  reactStrictMode: false,
  images: {
    domains: ['localhost', '127.0.0.1']
  },
  webpack: (config, { isServer, webpack }) => {
    return config;
  }
})