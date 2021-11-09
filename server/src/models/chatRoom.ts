import { DataTypes, Model } from "sequelize";
import { Chat } from "./chat";
import { Participant } from "./participant";
import { sequelize } from "./index";
import { Users } from "./users";

interface ChatRoomAttributes {
  chatRoomId: number;
}

export class ChatRoom extends Model<ChatRoomAttributes> {
  public chatRoomId!: number;
  public static associations: {};
}

ChatRoom.init(
  {
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    modelName: "ChatRoom",
    tableName: "ChatRoom",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

ChatRoom.belongsToMany(Users, {
  as: "Participant",
  through: Participant,
  foreignKey: "chatRoomId",
});

Users.belongsToMany(ChatRoom, {
  as: "Participant",
  through: Participant,
  foreignKey: "uid",
});
