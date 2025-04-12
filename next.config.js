/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 允许从任何 IP 地址访问
  // 端口设置为 5007
  // 这些设置会在 package.json 的 scripts 中使用
};

module.exports = nextConfig;
