import { Router } from "express";
import AddOnUtilization from "../db/models/AddOnUtilization";
import Trip from "../db/models/Trip";
import TripGuest, { UserRole } from "../db/models/TripGuest";
import User from "../db/models/User";
import TripAddon from "../db/models/TripAddon";
import AddOnTemplate from "../db/models/AddOnTemplate";
import Tour from "../db/models/Tour";

const router = Router();

const offset = 0;

router.get("/details", async (req, res) => {
  const tripGuest = await TripGuest.findOne({
    where: { userRole: UserRole.GUEST },
    include: [{ model: Trip }],
    offset,
  });

  if (!tripGuest) {
    res.send({ trip: null, utilization: [] });
    return;
  }

  const utilization = await AddOnUtilization.sum("priceAtBookingInCents", {
    where: { tripId: tripGuest?.Trip.id },
  });

  const totalPrice = tripGuest.priceAtBookingInCents ?? 0 + utilization;

  res.send({
    ...tripGuest.toJSON(),
    utilization,
    totalPriceInCents: totalPrice,
  });
});

router.get("/addons", async (req, res) => {
  const trip = await Trip.findOne({
    offset,
  });

  const availableAddOns = await TripAddon.findAll({
    where: { tripId: trip?.id },
  });

  // const existingAddOns = await AddOnUtilization.findAll({
  //   where: { tripId: trip?.id },
  // });

  if (!availableAddOns) {
    res.send([]);
    return;
  }

  res.send(availableAddOns);
});

export default router;
