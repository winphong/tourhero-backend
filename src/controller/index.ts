import { Router } from "express";
import trips from "./trips.js";
import checkout from "./checkout.js";

const router = Router();

router.use("/v1/trip", trips);
router.use("/v1/checkout", checkout);

export default router;
