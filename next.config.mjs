/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/auth/:path*',
                destination: 'http://localhost:5001/auth/:path*'
            },
            {
                source: '/movies/:path*',
                destination: 'http://localhost:5001/movies/:path*'
            },
            {
                source: '/:path*.jpg',
                destination: 'http://localhost:5001/:path*.jpg'
            }
        ]
    }
};

export default nextConfig;
