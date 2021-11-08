import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

interface ChatAttributes {
  chatId: number;
  chatRoomId: number;
  read: boolean;
  message: string;
  source: string;
  uid: string;
}

export class Chat extends Model<ChatAttributes> {
  public chatId!: number;

  public chatRoomId!: number;

  public read!: boolean;

  public message!: string;

  public source!: string;

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
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(100),
    },
    source: {
      type: DataTypes.STRING(50),
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
