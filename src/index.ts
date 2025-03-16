import express from "express";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import User from "./db/models/User";

export const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, async () => {
  await connectDb();
  const users = await User.findAll();

  console.log("users", users);
  return console.log(`Express is listening at http://localhost:${port}`);
});
