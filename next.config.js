/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify 在 Next.js 15 中已经被移除
  // 允许从任何 IP 地址访问
  // 端口设置为 5007
  // 这些设置会在 package.json 的 scripts 中使用
};

module.exports = nextConfig;
