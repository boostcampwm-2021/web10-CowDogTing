import { DataTypes, Model } from "sequelize";
import { ChatRoom } from "./chatRoom";
import { sequelize } from "./index";
import { Users } from "./users";

interface EnterRoomAttributes {
    uid : string;
    chatRoomId : number;
}


export class EnterRoom extends Model<EnterRoomAttributes>{
    public uid!: string;
    public chatRoomId : number;
    public static associations: {};
}

EnterRoom.init(
    {
        uid: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true
        },
        chatRoomId : {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        modelName : 'ChatRoom',
        tableName : 'ChatRoom',
        sequelize,
        freezeTableName : true,
    }
);


