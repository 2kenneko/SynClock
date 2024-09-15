import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double rendering in development mode
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  webpack(config) {
    // Add alias for paths
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    
    // Add rule for handling mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/i, // mp3 files
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });
    
    return config;
  },
};

export default nextConfig;
