import { Router } from "express";
import AddOnUtilization from "../db/models/AddOnUtilization";
import Trip from "../db/models/Trip";
import TripGuest, { UserRole } from "../db/models/TripGuest";
import User from "../db/models/User";
import TripAddon from "../db/models/TripAddon";
import AddOnTemplate from "../db/models/AddOnTemplate";
import Tour from "../db/models/Tour";
import { Op } from "sequelize";
import { TripService } from "../services/TripService";

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
