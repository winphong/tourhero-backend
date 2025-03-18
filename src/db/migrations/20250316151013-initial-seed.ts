"use strict";

import { v4 } from "uuid";
import { QueryInterface } from "sequelize";
import * as _ from "lodash";

const users = [
  {
    id: v4(),
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    createdAt: new Date().toISOString(),
  },
];

const tours = [
  {
    id: v4(),
    numOfDays: 5,
    numOfNights: 4,
    priceInCents: 300000,
    location: "Paris",
    country: "France",
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    numOfDays: 7,
    numOfNights: 6,
    priceInCents: 700000,
    location: "Tokyo",
    country: "Japan",
    createdAt: new Date().toISOString(),
  },
];

const trips = [
  {
    id: v4(),
    description: "Texas Kentucky",
    startDate: "2025-07-01",
    endDate: "2025-07-06",
    numOfDays: 5,
    numOfNights: 4,
    currency: "USD",
    tourId: tours[0].id,
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    description: "Michingan Lake!",
    startDate: "2025-08-15",
    endDate: "2025-08-22",
    numOfDays: 7,
    numOfNights: 6,
    currency: "USD",
    tourId: tours[0].id,
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    description: "Times Square",
    startDate: "2025-09-10",
    endDate: "2025-09-15",
    numOfDays: 5,
    numOfNights: 4,
    currency: "USD",
    tourId: tours[1].id,
    createdAt: new Date().toISOString(),
  },
];

const addOnTemplates = [
  {
    id: v4(),
    name: "SIM Card",
    description: "Prepaid SIM card for travel",
    type: "UNLIMITED",
    startTime: null,
    endTime: null,
    priceInCents: 3000,
    limit: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    name: "Single Room Upgrade",
    description: "Upgrade to a private single room",
    type: "NUMBER_BASED",
    startTime: null,
    endTime: null,
    priceInCents: 10000,
    limit: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    name: "City Tour 2-3 PM",
    description: "Guided city tour",
    type: "TIME_BASED",
    startTime: "14:00",
    endTime: "15:00",
    priceInCents: 5000,
    limit: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: v4(),
    name: "City Tour 12-6 PM",
    description: "Half day tour",
    type: "TIME_BASED",
    startTime: "12:00",
    endTime: "18:00",
    priceInCents: 5000,
    limit: 1,
    createdAt: new Date().toISOString(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert("Users", users, {
        transaction,
      });

      await queryInterface.bulkInsert("Tours", tours, {
        transaction,
      });

      await queryInterface.bulkInsert("Trips", trips, { transaction });

      await queryInterface.bulkInsert(
        "TripGuests",
        [
          {
            id: v4(),
            tripId: trips[0].id,
            userId: users[0].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[1].id,
            userId: users[0].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[2].id,
            userId: users[0].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[0].id,
            userId: users[1].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[1].id,
            userId: users[1].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[0].id,
            userId: users[2].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[1].id,
            userId: users[2].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[2].id,
            userId: users[1].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
          {
            id: v4(),
            tripId: trips[2].id,
            userId: users[2].id,
            userRole: "GUEST",
            priceAtBookingInCents: null,
            bookingStatus: "PENDING",
            createdAt: new Date().toISOString(),
          },
        ],
        { transaction }
      );

      await queryInterface.bulkInsert("AddOnTemplates", addOnTemplates, {
        transaction,
      });

      const tripAddOns = _.flatten(
        trips.map((trip) => {
          return addOnTemplates.map((template) => {
            return {
              id: v4(),
              tripId: trip.id,
              ..._.omit(template, ["id", "createdAt"]),
              createdAt: new Date().toISOString(),
            };
          });
        })
      );
      await queryInterface.bulkInsert("TripAddOns", tripAddOns, {
        transaction,
      });
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete("AddOnUtilizations", {}, { transaction });
      await queryInterface.bulkDelete("TripAddOns", {}, { transaction });
      await queryInterface.bulkDelete("TripGuests", {}, { transaction });

      await queryInterface.bulkDelete("AddOnTemplates", {}, { transaction });
      await queryInterface.bulkDelete("Trips", {}, { transaction });
      await queryInterface.bulkDelete("Tours", {}, { transaction });
      await queryInterface.bulkDelete("Users", {}, { transaction });
    });
  },
};
