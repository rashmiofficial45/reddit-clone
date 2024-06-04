/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG: true,
        remotePatterns:[
            {
            hostname:'avatar.vercel.sh',
            port:""
            },
            {
            hostname:'utfs.io',
            port:""
            }
    ],
    }
};

export default nextConfig;
