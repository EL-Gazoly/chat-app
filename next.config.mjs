/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/conversations',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['files.edgestore.dev'],
    }
    
};

export default nextConfig;
