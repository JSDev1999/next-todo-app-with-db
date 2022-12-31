/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  runtime: "nodejs",
  env: {
    PORT: 8088,
    DB_URL:
      "mongodb+srv://ramesh:ramesh@cluster0.gr728o1.mongodb.net/todo-app-db?retryWrites=true&w=majority",
    API_URL: "https://next-todo-app-with-db.vercel.app/",
  },
};

module.exports = nextConfig;
