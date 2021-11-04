import { DataTypes, Model } from "sequelize";
import { EnterRoom } from "./enterRoom";
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

Users.belongsToMany(ChatRoom, {
  through: EnterRoom,
});
ChatRoom.belongsToMany(Users, {
  through: EnterRoom,
});
