import express from "express";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";
import apiRoutes from "./controller/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tourhero-frontend.vercel.app"],
  })
);
app.use("/api", apiRoutes);

app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.listen(process.env.PORT || port, async () => {
  await connectDb();

  return console.log(`Express is listening at http://localhost:${port}`);
});
