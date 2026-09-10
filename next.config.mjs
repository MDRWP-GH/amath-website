import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '..');

/** @type {import('next').NextConfig} */
const nextConfig = process.env.VERCEL
  ? {}
  : {
      // Monorepo: keep tracing root and turbopack root identical (Next.js requirement).
      outputFileTracingRoot: monorepoRoot,
      turbopack: {
        root: monorepoRoot,
      },
    };

export default nextConfig;
