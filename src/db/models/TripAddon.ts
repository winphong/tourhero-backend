import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Trip from "./Trip";

@Table({
  tableName: "TripAddOns",
  timestamps: false,
})
class TripAddon extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare type: string; // UNLIMITED / TIME_BASED / NUMBER_BASED

  @Column({ type: DataType.STRING, allowNull: true })
  declare startTime: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare endTime: string | null;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare priceInCents: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare limit: number | null;

  @ForeignKey(() => Trip)
  @Column({ allowNull: false })
  declare tripId: string;

  @BelongsTo(() => Trip)
  declare Trip: Trip;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date | null;
}

export default TripAddon;
