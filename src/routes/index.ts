import { Router } from "express";
import trips from "./trips";

const router = Router();

router.use("/v1/trip", trips);

export default router;
