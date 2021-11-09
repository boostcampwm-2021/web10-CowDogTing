import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Participant } from "./participant";

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

ChatRoom.hasMany(Participant, {
  foreignKey: "chatRoomId",
  sourceKey: "chatRoomId",
});

Participant.belongsTo(ChatRoom, {
  foreignKey: "chatRoomId",
  targetKey: "chatRoomId",
});
