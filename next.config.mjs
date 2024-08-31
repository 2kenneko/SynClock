import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //２回実行されるのを防ぐ
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });
    
    return config;
  },
};

export default nextConfig;