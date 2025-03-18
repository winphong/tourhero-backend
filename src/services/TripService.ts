import AddOnUtilization from "../db/models/AddOnUtilization.js";
import Trip from "../db/models/Trip.js";
import TripGuest, { UserRole } from "../db/models/TripGuest.js";
import Tour from "../db/models/Tour.js";
import { AddOnUtilizationRepo } from "../repository/AddOnUtilizationRepo.js";
import _ from "lodash";

export class TripService {
  static getPendingTripDetails = async (offset = 0) => {
    const tripGuest = await TripGuest.findOne({
      where: { userRole: UserRole.GUEST },
      include: [{ model: Trip, include: [{ model: Tour }] }],
      offset,
      order: [["id", "desc"]],
    });

    if (!tripGuest) {
      throw new Error("TripGuest not found");
    }

    const utilizationInCents = await AddOnUtilization.sum(
      "priceAtBookingInCents",
      {
        where: { tripId: tripGuest?.Trip.id, userId: tripGuest?.userId },
      }
    );

    const totalPriceInCents =
      (tripGuest.priceAtBookingInCents ??
        tripGuest.Trip.Tour.priceInCents ??
        0) + utilizationInCents;

    return { ...tripGuest.toJSON(), totalPriceInCents };
  };

  static getAvailableAddons = async (offset = 0) => {
    const tripGuest = await TripGuest.findOne({
      where: { userRole: UserRole.GUEST },
      include: [{ model: Trip }],
      offset,
      order: [["id", "desc"]],
    });

    const trip = tripGuest?.Trip;

    if (!trip) {
      throw new Error("Trip not found!");
    }

    const availableAddOnsForTrip =
      AddOnUtilizationRepo.getAvailableAddOnsForTrip({
        tripId: tripGuest.tripId,
        userId: tripGuest.userId,
      });

    return availableAddOnsForTrip;
  };
}
