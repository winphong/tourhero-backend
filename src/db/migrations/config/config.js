import "dotenv/config";

module.exports = {
  development: {
    dialect: "postgres",
    port: 5432,
    host: process.env.DEV_PG_HOST,
    database: process.env.DEV_PG_DB,
    username: process.env.DEV_PG_USER,
    password: process.env.DEV_PG_PASSWORD,
    dialectOptions: {
      ...(process.env.NODE_ENV !== "development"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {}),
    },
  },
  test: {
    dialect: "postgres",
    port: 5432,
    host: process.env.DEV_PG_HOST,
    database: process.env.DEV_PG_DB,
    username: process.env.DEV_PG_USER,
    password: process.env.DEV_PG_PASSWORD,
  },
  production: {
    dialect: "postgres",
    port: 5432,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  },
};
