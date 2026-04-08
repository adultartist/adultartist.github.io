/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 如果部署到 github pages <username>.github.io 根目錄則不需設定 basePath
  // 但如果你有特殊要求可以設定 basePath / assetPrefix 等等
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
