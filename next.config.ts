import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    experimental: {
        reactCompiler: true,
    },
    allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "http://192.168.1.200:3000"],
};

export default nextConfig;
