import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface SendRequestAttributes {
  id: string;
  requestId: number;
}

export class SendRequest extends Model<SendRequestAttributes> {
  public id!: string;
  public requestId!: number;

  public static associations: {};
}

SendRequest.init(
  {
    id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    modelName: "SendRequest",
    tableName: "SendRequest",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);
