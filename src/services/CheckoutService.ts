import { Op, type Transaction } from "sequelize";
import AddOnUtilization from "../db/models/AddOnUtilization.js";
import TripAddon from "../db/models/TripAddon.js";
import TripGuest, { BookingStatus } from "../db/models/TripGuest.js";
import Tour from "../db/models/Tour.js";
import Trip from "../db/models/Trip.js";
import { UtilityService } from "./UtilityService.js";

export class CheckoutService {
  static create = async ({
    addOnIds,
    tripId,
    userId,
    transaction,
  }: {
    transaction: Transaction;
    addOnIds: string[];
    userId: string;
    tripId: string;
  }) => {
    const tour = await Tour.findOne({
      include: [
        {
          model: Trip,
          where: { id: tripId },
          required: true,
          attributes: [],
        },
      ],
      transaction,
    });

    if (!tour) {
      throw new Error("Tour not found!");
    }

    const tripAddOns = await TripAddon.findAll({
      where: { id: { [Op.in]: addOnIds } },
      transaction,
    });

    const hasClashingAddOns = UtilityService.hasClashingAddOns(tripAddOns);

    if (hasClashingAddOns) {
      throw new Error("Add Ons has clashing timing");
    }

    const utilizedAddOns = await AddOnUtilization.findAll({
      where: {
        tripAddOnId: { [Op.in]: addOnIds },
        tripId: tripId,
      },
      transaction,
    });

    const lockedInPrice = tour?.priceInCents;

    await TripGuest.update(
      {
        bookingStatus: BookingStatus.CONFIRMED,
        // This is only for the price of booking of the Tour (does not include add ons)
        priceAtBookingInCents: lockedInPrice,
      },
      { where: { tripId: tripId, userId: userId } }
    );

    if (tripAddOns.length !== 0) {
      await AddOnUtilization.bulkCreate(
        tripAddOns.map((tripAddOn) => {
          return {
            tripId: tripId,
            tripAddOnId: tripAddOn.id,
            userId: userId,
            priceAtBookingInCents: tripAddOn.priceInCents,
          };
        }),
        { transaction }
      );
    }

    return { tour, lockedInPrice, tripAddOns, utilizedAddOns };
  };
}
