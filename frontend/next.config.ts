import type { NextConfig } from "next";

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");
const apiIsLocal = ["localhost", "127.0.0.1", "::1"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    // Next blocks optimizing images from hosts that resolve to a private/
    // loopback IP (SSRF protection) unless explicitly allowed. The backend
    // runs on localhost in dev, so this is only enabled for that case — a
    // real deployment's API URL won't be a local address, so this stays off
    // in production.
    dangerouslyAllowLocalIP: apiIsLocal,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.21st.dev",
      },
      {
        // Uploaded project/service/blog images, served directly from the
        // Laravel backend's public/ directory.
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
    ],
  },
  experimental: {
    serverActions: {
      // Admin image uploads (project gallery, service/blog cover images) are
      // validated up to 5MB per file on the backend; Next's 1MB default body
      // limit for Server Actions rejects those before they ever reach that
      // validation, surfacing a raw framework error instead of a real one.
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
