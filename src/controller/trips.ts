import { Router } from "express";
import { TripService } from "../services/TripService.js";

const router = Router();

router.get("/details", async (req, res) => {
  const offset = req.query.offset;
  const response = await TripService.getPendingTripDetails(
    offset ? Number(offset) : 0
  );

  res.send(response);
});

router.get("/addons", async (req, res) => {
  const offset = req.query.offset;
  const availableAddOnsForTrip = await TripService.getAvailableAddons(
    offset ? Number(offset) : 0
  );

  if (!availableAddOnsForTrip) {
    res.send([]);
    return;
  }

  res.send(availableAddOnsForTrip);
});

export default router;
