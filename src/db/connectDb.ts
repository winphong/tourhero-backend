import { Sequelize } from "sequelize-typescript";
import models from "./models";
import User from "./models/User";
import Trip from "./models/Trip";
import Tour from "./models/Tour";
import AddOnTemplate from "./models/AddOnTemplate";
import TripGuest from "./models/TripGuest";
import TripAddon from "./models/TripAddon";
import AddOnUtilization from "./models/AddOnUtilization";

export const connectDb = async () => {
  if (!process.env.PG_CONNECTION_STRING) {
    throw new Error("Database connection is missing");
  }

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
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
