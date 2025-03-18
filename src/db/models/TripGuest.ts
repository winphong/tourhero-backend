import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  PrimaryKey,
  UpdatedAt,
} from "sequelize-typescript";
import Trip from "./Trip.js";
import User from "./User.js";

export enum UserRole {
  GUEST = "GUEST",
  HOST = "HOST",
}

export enum BookingStatus {
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
}

export interface TravelDetails {
  firstName: string;
  lastName: string;
  email: string;
}

@Table({
  tableName: "TripGuests",
  timestamps: true,
})
class TripGuest extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => Trip)
  @Column({ type: DataType.UUID, allowNull: false })
  declare tripId: string;

  @BelongsTo(() => Trip)
  declare Trip: Trip;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;

  @BelongsTo(() => User)
  declare User: User;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [UserRole.GUEST, UserRole.HOST],
  })
  declare userRole: UserRole;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [
      BookingStatus.CANCELLED,
      BookingStatus.PENDING,
      BookingStatus.CONFIRMED,
    ],
    defaultValue: BookingStatus.PENDING,
  })
  declare bookingStatus: BookingStatus;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare priceAtBookingInCents: number | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare travelDetails: TravelDetails | null;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date | null;
}

export default TripGuest;
