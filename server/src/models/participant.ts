import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface ParticipantAttributes {
  uid: string;
  chatRoomId: number;
}

export class Participant extends Model<ParticipantAttributes> {
  public uid!: string;
  public chatRoomId: number;
  public static associations: {};
}

Participant.init(
  {
    uid: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Users",
        key: "uid",
      },
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "ChatRoom",
        key: "chatRoomId",
      },
    },
  },
  {
    modelName: "Participant",
    tableName: "Participant",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);
