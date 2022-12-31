/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  runtime: "nodejs",
  env: {
    PORT: 8088,
    DB_URL:
      "mongodb+srv://ramesh:ramesh@cluster0.gr728o1.mongodb.net/todo-app-db?retryWrites=true&w=majority",
    API_URL: "https://next-todo-app-with-db.vercel.app/",
  },
};

module.exports = nextConfig;
