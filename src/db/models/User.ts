import {
  Column,
  CreatedAt,
  DataType,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "Users",
})
class User extends Model {
  @PrimaryKey
  @Column({
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @NotNull
  declare firstName: string;

  @NotNull
  declare lastName: string;

  @NotNull
  @Unique
  declare email: string;

  @NotNull
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default User;
