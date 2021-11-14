import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

export interface ParticipantAttributes {
  uid: string;
  chatRoomId: number;
}

export class Participant extends Model<ParticipantAttributes> {
  public uid!: string;
  public chatRoomId!: number;
  public static associations: {};
}

Participant.init(
  {
    uid: {
      type: DataTypes.STRING(30),
      references: {
        model: Users,
        key: "uid",
      },
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: ChatRoom,
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
  },
);
Users.hasMany(Participant, {
  foreignKey: "uid",
});
Participant.belongsTo(Users, {
  foreignKey: "uid",
});
Participant.belongsTo(ChatRoom, {
  foreignKey: "chatRoomId",
});
ChatRoom.hasMany(Participant, {
  foreignKey: "chatRoomId",
});
