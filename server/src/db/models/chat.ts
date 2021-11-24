import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

interface ChatAttributes {
  chatId?: number;
  chatRoomId: number;
  message?: string;
  src?: string | null;
  uid: string;
}

export class Chat extends Model<ChatAttributes> {
  public chatId!: number;
  public chatRoomId!: number;
  public message!: string;
  public src!: string | null;
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
    message: {
      type: DataTypes.STRING(100),
    },
    src: {
      type: DataTypes.STRING(100),
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
    timestamps: false,
    freezeTableName: true,
  },
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
