import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export interface TeamAttributes {
  gid: number;
  image?: number | null;
  name: string;
  description?: string | null;
  location: string;
  leader: string;
}

export class Team extends Model<TeamAttributes> {
  public gid!: number;
  public image?: number;
  public name!: string;
  public description?: string;
  public location!: string;
  public leader!: string;
  public static associations: {};
}

Team.init(
  {
    gid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    leader: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    modelName: "Team",
    tableName: "Team",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  },
);
