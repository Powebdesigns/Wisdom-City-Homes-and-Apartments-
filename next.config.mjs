/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true // TODO: set to false once `pnpm exec tsc --noEmit` is clean,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
