import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

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
