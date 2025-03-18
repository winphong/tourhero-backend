"use strict";

import { type QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "Users",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          firstName: { type: DataType.STRING, allowNull: false },
          lastName: { type: DataType.STRING, allowNull: false },
          email: { type: DataType.STRING, allowNull: false, unique: true },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: { allowNull: true, type: DataType.DATE },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "Tours",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          numOfDays: { allowNull: false, type: DataType.INTEGER },
          numOfNights: { allowNull: false, type: DataType.INTEGER },
          priceInCents: { allowNull: false, type: DataType.INTEGER },
          location: { allowNull: false, type: DataType.STRING },
          country: { allowNull: false, type: DataType.STRING },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: { allowNull: true, type: DataType.DATE },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "Trips",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          description: { allowNull: false, type: DataType.STRING },
          startDate: { allowNull: false, type: DataType.DATE },
          endDate: { allowNull: false, type: DataType.DATE },
          numOfDays: { allowNull: false, type: DataType.INTEGER },
          numOfNights: { allowNull: false, type: DataType.INTEGER },
          tourId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Tours", key: "id" },
          },
          currency: { allowNull: false, type: DataType.STRING },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: { allowNull: true, type: DataType.DATE },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "TripGuests",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          tripId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Trips", key: "id" },
          },
          userId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Users", key: "id" },
          },
          userRole: {
            allowNull: false,
            type: DataType.STRING, // Guest / Host
          },
          bookingStatus: {
            allowNull: false,
            type: DataType.STRING,
            defaultValue: "PENDING",
          },
          priceAtBookingInCents: { allowNull: true, type: DataType.INTEGER },
          travelDetails: {
            type: DataType.JSONB,
            allowNull: true,
          },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: {
            allowNull: true,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
        },
        { transaction }
      );

      await queryInterface.addIndex("TripGuests", ["tripId", "userId"], {
        name: "trip_user_unique_pair",
        unique: true,
        transaction,
      });

      await queryInterface.createTable(
        "AddOnTemplates",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          name: { allowNull: false, type: DataType.STRING },
          description: { allowNull: true, type: DataType.STRING },
          type: { allowNull: false, type: DataType.STRING }, // UNLIMITED / TIME_BASED / NUMBER_BASED
          startTime: { allowNull: true, type: DataType.STRING },
          endTime: { allowNull: true, type: DataType.STRING },
          priceInCents: { allowNull: false, type: DataType.INTEGER },
          limit: { allowNull: true, type: DataType.INTEGER },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: { allowNull: true, type: DataType.DATE },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "TripAddOns",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          tripId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Trips", key: "id" },
          },
          name: { allowNull: false, type: DataType.STRING },
          description: { allowNull: true, type: DataType.STRING },
          type: { allowNull: false, type: DataType.STRING }, // UNLIMITED / TIME_BASED / NUMBER_BASED
          startTime: { allowNull: true, type: DataType.STRING },
          endTime: { allowNull: true, type: DataType.STRING },
          priceInCents: { allowNull: false, type: DataType.INTEGER },
          limit: { allowNull: true, type: DataType.INTEGER },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
          updatedAt: { allowNull: true, type: DataType.DATE },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "AddOnUtilizations",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
          },
          tripId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Trips", key: "id" },
          },
          tripAddOnId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "TripAddOns", key: "id" },
          },
          userId: {
            allowNull: false,
            type: DataType.UUID,
            references: { model: "Users", key: "id" },
          },
          priceAtBookingInCents: { allowNull: false, type: DataType.INTEGER },
          createdAt: {
            allowNull: false,
            type: DataType.DATE,
            defaultValue: DataType.NOW,
          },
        },
        { transaction }
      );
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("AddOnUtilizations", { transaction });
      await queryInterface.dropTable("TripAddOns", { transaction });
      await queryInterface.dropTable("TripGuests", { transaction });

      await queryInterface.dropTable("AddOnTemplates", { transaction });
      await queryInterface.dropTable("Trips", { transaction });
      await queryInterface.dropTable("Tours", { transaction });
      await queryInterface.dropTable("Users", { transaction });
    });
  },
};
