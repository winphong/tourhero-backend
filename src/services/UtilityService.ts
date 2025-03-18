import type TripAddon from "../db/models/TripAddon";

export class UtilityService {
  static hasClashingAddOns = (tripAddOn: TripAddon[]): boolean => {
    for (let i = 0; i < tripAddOn.length; i++) {
      for (let j = i + 1; j < tripAddOn.length; j++) {
        const tripAddOnA = tripAddOn[i];
        const tripAddOnB = tripAddOn[j];

        const startA = this.timeToMinutes(tripAddOnA.startTime!);
        const endA = this.timeToMinutes(tripAddOnA.endTime!);
        const startB = this.timeToMinutes(tripAddOnB.startTime!);
        const endB = this.timeToMinutes(tripAddOnB.endTime!);

        if (startA < endB && endA > startB) {
          console.log(
            `Clash detected: Trip ${tripAddOnA.id} overlaps with Trip ${tripAddOnB.id}`
          );
          return true;
        }
      }
    }

    return false;
  };

  private static timeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + (seconds || 0) / 60;
  }
}
