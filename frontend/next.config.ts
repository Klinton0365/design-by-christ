import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images (uploaded project/service/blog covers, external assets) are
    // served as-is from their original URL instead of proxied through
    // Next's /_next/image optimizer. The backend lives on separate hosting
    // from the frontend, so this avoids keeping next/image's remote-host
    // allowlist in sync across environments.
    unoptimized: true,
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
