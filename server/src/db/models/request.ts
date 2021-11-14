import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Users } from "./users";

interface RequestAttributes {
  requestId: number;
  to: string;
  state: string;
  from: string;
}

export class Request extends Model<RequestAttributes> {
  public requestId!: number;
  public to!: string;
  public state!: string;
  public from!: string;
  public static associations: {};
}

Request.init(
  {
    requestId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    to: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    modelName: "Request",
    tableName: "Request",
    timestamps: false,
    sequelize,
    freezeTableName: true,
  },
);

Users.hasMany(Request, {
  foreignKey: "from",
  sourceKey: "uid",
});
Request.belongsTo(Users, {
  foreignKey: "from",
  as: "info",
  targetKey: "uid",
});
