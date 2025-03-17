import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
} from "sequelize-typescript";
import Tour from "./Tour";

@Table({
  tableName: "Trips",
  timestamps: true,
})
class Trip extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare endDate: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare numOfDays: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare numOfNights: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare currency: string;

  @ForeignKey(() => Tour)
  @Column({ type: DataType.UUID, allowNull: false })
  declare tourId: string;

  @BelongsTo(() => Tour)
  declare tour: Tour;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Trip;
