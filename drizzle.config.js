/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:TWv1gl3OsyZL@ep-noisy-mountain-a52v77ai.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };