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
import AddOnTemplate from "./AddOnTemplate";
import User from "./User";
import Trip from "./Trip";
import TripAddon from "./TripAddon";

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
  declare addOnId: string;

  @BelongsTo(() => TripAddon)
  declare AddOn: TripAddon;

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
