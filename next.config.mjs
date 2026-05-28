/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'cdn.sanity.io' },
            { protocol: 'https', hostname: 'assets.aceternity.com' },
            { protocol: 'https', hostname: '**.amazonaws.com' },
            { protocol: 'https', hostname: '**.r2.dev' },
            { protocol: 'https', hostname: '**.vercel-storage.com' },
            { protocol: 'https', hostname: '**.googleusercontent.com' },
            { protocol: 'https', hostname: '**.supabase.co' },
        ],
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
