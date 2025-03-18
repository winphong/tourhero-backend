import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  CreatedAt,
} from "sequelize-typescript";
import User from "./User.js";
import Trip from "./Trip.js";
import TripAddon from "./TripAddon.js";

@Table({
  tableName: "AddOnUtilizations",
  timestamps: true,
  updatedAt: false,
})
class AddOnUtilization extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => Trip)
  @Column({ type: DataType.UUID, allowNull: false })
  declare tripId: string;

  @BelongsTo(() => Trip)
  declare Trip: Trip;

  @ForeignKey(() => TripAddon)
  @Column({ type: DataType.UUID, allowNull: false })
  declare tripAddOnId: string;

  @BelongsTo(() => TripAddon)
  declare TripAddOn: TripAddon;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;

  @BelongsTo(() => User)
  declare User: User;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare priceAtBookingInCents: number;

  @CreatedAt
  declare createdAt: Date;
}

export default AddOnUtilization;
