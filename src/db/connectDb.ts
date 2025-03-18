import { Sequelize } from "sequelize-typescript";
import User from "./models/User.js";
import Trip from "./models/Trip.js";
import Tour from "./models/Tour.js";
import AddOnTemplate from "./models/AddOnTemplate.js";
import TripGuest from "./models/TripGuest.js";
import TripAddon from "./models/TripAddon.js";
import AddOnUtilization from "./models/AddOnUtilization.js";
import pg from "pg";

export const connectDb = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DEV_PG_DB,
    username: process.env.DEV_PG_USER,
    password: process.env.DEV_PG_PASSWORD,
    host: process.env.DEV_PG_HOST,
    models: [
      User,
      Tour,
      Trip,
      AddOnTemplate,
      TripGuest,
      TripAddon,
      AddOnUtilization,
    ],
    dialectModule: pg,
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
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
