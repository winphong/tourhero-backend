import express from "express";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import User from "./db/models/User";
import Trip from "./db/models/Trip";
import TripGuest from "./db/models/TripGuest";
import AddOnUtilization from "./db/models/AddOnUtilization";
import apiRoutes from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, async () => {
  await connectDb();

  return console.log(`Express is listening at http://localhost:${port}`);
});
