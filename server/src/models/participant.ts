import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

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
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
