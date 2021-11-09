import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

interface ChatAttributes {
  chatId: number;
  chatRoomId: number;
  read: boolean;
  message: string;
  source: number;
  uid: string;
}

export class Chat extends Model<ChatAttributes> {
  public chatId!: number;

  public chatRoomId!: number;

  public read!: boolean;

  public message!: string;

  public source!: number;

  public uid!: string;

  public static associations: {};
}

Chat.init(
  {
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ChatRoom",
        key: "chatRoomId",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(100),
    },
    source: {
      type: DataTypes.INTEGER,
    },
    uid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    modelName: "Chat",
    tableName: "Chat",
    sequelize,
    freezeTableName: true,
  }
);

Users.hasMany(Chat, {
  sourceKey: "uid",
  foreignKey: "uid",
});
Chat.belongsTo(Users, {
  targetKey: "uid",
  foreignKey: "uid",
});

ChatRoom.hasMany(Chat, {
  sourceKey: "chatRoomId",
  foreignKey: "chatRoomId",
});
Chat.belongsTo(ChatRoom, {
  targetKey: "chatRoomId",
  foreignKey: "chatRoomId",
});
