import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface ImageAttributes {
  imageId: number;
  image: string;
}

export class Image extends Model<ImageAttributes> {
  public imageId: number;
  public image: string;
  public static associations: {};
}

Image.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    modelName: "Image",
    tableName: "Image",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);
