import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Chat } from "./chat";
import { Users } from "./users";

export interface ReadTableAttributes {
  uid: string;
  chatRoomId: number;
  chatId: number;
  isRead: boolean;
}

export class ReadTable extends Model<ReadTableAttributes> {
  public uid!: string;
  public chatRoomId!: number;
  public chatId!: number;
  public isRead!: boolean;
  public static associations: {};
}

ReadTable.init(
  {
    uid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "ReadTable",
    tableName: "ReadTable",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  },
);
Chat.hasMany(ReadTable, {
  sourceKey: "chatRoomId",
  foreignKey: "chatRoomId",
});
ReadTable.belongsTo(Chat, {
  targetKey: "chatRoomId",
  foreignKey: "chatRoomId",
});
Chat.hasMany(ReadTable, {
  sourceKey: "chatId",
  foreignKey: "chatId",
});
ReadTable.belongsTo(Chat, {
  targetKey: "chatId",
  foreignKey: "chatId",
});
Users.hasMany(ReadTable, {
  sourceKey: "uid",
  foreignKey: "uid",
});
ReadTable.belongsTo(Users, {
  targetKey: "uid",
  foreignKey: "uid",
});
