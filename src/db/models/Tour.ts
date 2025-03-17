import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "Tours",
  timestamps: true,
})
class Tour extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare numOfDays: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare numOfNights: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare priceInCents: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare country: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Tour;
