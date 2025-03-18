import express from "express";
import cors from "cors";
import { connectDb } from "../src/db/connectDb.js";
import apiRoutes from "../src/controller/index.js";

const app = express();

const initDbConnection = async () => {
  try {
    await connectDb();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process if DB fails to connect
  }
};

// Ensure database connection before handling requests
initDbConnection();
// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Health Check
app.get("/ping", (req: any, res: any) => {
  res.send("pong!");
});

// Routes
app.use("/api", apiRoutes);

// Export the app as a function to be used in Vercel's serverless environment
export default async (req: any, res: any) => {
  return app(req, res);
};
