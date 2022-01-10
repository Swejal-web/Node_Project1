/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:3000/api/:slug*'
      }
    ];
  }
};
