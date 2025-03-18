import express from "express";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import apiRoutes from "./controller";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", apiRoutes);

app.listen(process.env.PORT || port, async () => {
  await connectDb();

  return console.log(`Express is listening at http://localhost:${port}`);
});
