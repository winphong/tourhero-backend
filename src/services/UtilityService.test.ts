import { UtilityService } from "./UtilityService.js";
import type TripAddon from "../db/models/TripAddon.js";
import { expect, describe, it } from "bun:test";

describe("UtilityService", () => {
  describe("hasClashingAddOns", () => {
    it("should return false when there are no clashing add-ons", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "09:00:00",
          endTime: "10:00:00",
        },
        {
          id: "2",
          startTime: "11:00:00",
          endTime: "12:00:00",
        },
      ];
      //  | ----- |
      //  9      10
      //               | ----- |
      //              11      12

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeFalse();
    });

    it("should return true when add-ons overlap start", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "09:00:00",
          endTime: "11:00:00",
        },
        {
          id: "2",
          startTime: "10:00:00",
          endTime: "12:00:00",
        },
      ];
      //  | ------------- |
      //  9               11
      //       | ------------- |
      //      10               12

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeTrue();
    });

    it("should return true when add-ons overlap end", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "10:00:00",
          endTime: "12:00:00",
        },
        {
          id: "2",
          startTime: "9:00:00",
          endTime: "11:00:00",
        },
      ];
      //         | ----------- |
      //         10            12
      //  | ----------- |
      //  9            11

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeTrue();
    });

    it("should return true when one add-on is completely within another", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "09:00:00",
          endTime: "13:00:00",
        },
        {
          id: "2",
          startTime: "10:00:00",
          endTime: "11:00:00",
        },
      ];

      //  | ------------------ |
      //  9                   13
      //       | ------ |
      //      10        11

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeTrue();
    });

    it("should return false when add-ons are back-to-back", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "09:00:00",
          endTime: "10:00:00",
        },
        {
          id: "2",
          startTime: "10:00:00",
          endTime: "11:00:00",
        },
      ];

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeFalse();
    });

    it("should return false for empty array", () => {
      const result = UtilityService.hasClashingAddOns([]);
      expect(result).toBeFalse();
    });

    it("should return false for single add-on", () => {
      const tripAddons: Partial<TripAddon>[] = [
        {
          id: "1",
          startTime: "09:00:00",
          endTime: "10:00:00",
        },
      ];

      const result = UtilityService.hasClashingAddOns(
        tripAddons as TripAddon[]
      );
      expect(result).toBeFalse();
    });
  });
});
