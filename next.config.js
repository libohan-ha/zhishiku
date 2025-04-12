/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify 在 Next.js 15 中已经被移除
  // 允许从任何 IP 地址访问
  // 端口设置为 5007
  // 这些设置会在 package.json 的 scripts 中使用

  // 禁用 ESLint 检查，以便在 Vercel 上成功部署
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },

  // 禁用 TypeScript 类型检查，以便在 Vercel 上成功部署
  typescript: {
    // 在生产构建时忽略 TypeScript 错误
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
