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
  tableName: "AddOnTemplates",
  timestamps: true,
})
class AddOnTemplate extends Model {
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

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default AddOnTemplate;
