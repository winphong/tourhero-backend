import { Router } from "express";
import trips from "./trips";
import checkout from "./checkout";

const router = Router();

router.use("/v1/trip", trips);
router.use("/v1/checkout", checkout);

export default router;
