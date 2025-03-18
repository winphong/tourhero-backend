import _ from "lodash";
import { literal, Op, where } from "sequelize";
import AddOnUtilization from "../db/models/AddOnUtilization.js";
import TripAddon, { TripAddOnType } from "../db/models/TripAddon.js";

export class AddOnUtilizationRepo {
  /**
   * Get utilized addons by a user for the trip
   * @returns
   */
  static getUtilizedAddOnsForTrip = async ({ tripId }: { tripId: string }) => {
    return await AddOnUtilization.findAll({
      where: { tripId },
      include: [{ model: TripAddon }],
    });
  };

  static getAvailableAddOnsForTrip = async ({
    tripId,
    userId,
  }: {
    tripId: string;
    userId: string;
  }) => {
    const utilizedAddOnsForTrip =
      await AddOnUtilizationRepo.getUtilizedAddOnsForTrip({
        tripId,
      });

    const utilizedAddOnsForTripForUser = utilizedAddOnsForTrip.filter(
      (utilizedAddOn) => utilizedAddOn.userId === userId
    );

    const userRegisteredTours = utilizedAddOnsForTripForUser
      .filter((e) => e.TripAddOn.type === TripAddOnType.TIME_BASED)
      .map((e) => ({
        startTime: e.TripAddOn.startTime,
        endTime: e.TripAddOn.endTime,
      }));

    // const allTimeBasedTours = utilizedAddOnsForTrip.filter(
    //   (utilizedAddOn) =>
    //     utilizedAddOn.TripAddOn.type === TripAddOnType.TIME_BASED
    // );

    const timeClashFilter =
      userRegisteredTours.length !== 0
        ? {
            [Op.and]: userRegisteredTours.map(({ startTime, endTime }) => ({
              [Op.or]: [
                where(
                  literal(`CAST("startTime" AS TIME)`),
                  Op.gt,
                  literal(`CAST('${endTime}' AS TIME)`)
                ),
                where(
                  literal(`CAST("endTime" AS TIME)`),
                  Op.lt,
                  literal(`CAST('${startTime}' AS TIME)`)
                ),
              ],
              type: TripAddOnType.TIME_BASED,
              // TODO: Limit should be by per TripAddOn
              //   limit: { [Op.gt]: allTimeBasedTours.length },
            })),
          }
        : {
            type: TripAddOnType.TIME_BASED,
            // TODO: Limit should be by per TripAddOn
            // limit: { [Op.gt]: allTimeBasedTours.length },
          };

    const availableAddOnsForTrip = await TripAddon.findAll({
      where: {
        [Op.and]: [
          {
            tripId,
            id: {
              [Op.notIn]: utilizedAddOnsForTripForUser.map(
                (e) => e.tripAddOnId
              ),
            },
          },
          {
            [Op.or]: [
              { type: TripAddOnType.UNLIMITED },
              {
                type: TripAddOnType.NUMBER_BASED,
                limit: {
                  [Op.gt]: _.filter(
                    utilizedAddOnsForTrip,
                    (addOn) =>
                      addOn.TripAddOn.type === TripAddOnType.NUMBER_BASED
                  ).length,
                },
              },
              { ...timeClashFilter },
            ],
          },
        ],
      },
    });
    return availableAddOnsForTrip;
  };
}
