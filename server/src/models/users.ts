import { DataTypes, Model } from "sequelize";
import { Chat } from "./chat";
import { ChatRoom } from "./chatRoom";
import { EnterRoom } from "./enterRoom";
import { Team } from "./team";
import { sequelize } from "./index";
import { Request } from "./request";
import { SendRequest } from "./sendRequest";

interface UserAttributes {
    uid: string;
    password: string;
    email: string;
    name: string;
    location: string;
    github_id: string;
    naver_id: string;
    kakao_id: string;
    image: string;
    age: number;
    sex: string;
    gid: number;
}


export class Users extends Model<UserAttributes>{
    public uid!: string;
    public password!: string;
    public email!: string;
    public name!: string;
    public location!: string;
    public github_id!: string;
    public naver_id!: string;
    public kakao_id!: string;
    public image!: string;
    public age!: number;
    public sex!: string;
    public gid!: number;

    public static associations: {};
}

Users.init(
    {
        uid: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        github_id: {
            type: DataTypes.STRING(30),
        },
        naver_id: {
            type: DataTypes.STRING(30),
        },
        kakao_id: {
            type: DataTypes.STRING(30),
        },
        image: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    },
    {
        modelName : 'Users',
        tableName : 'Users',
        sequelize,
        freezeTableName : true,
    }
);




Users.belongsToMany(ChatRoom, {
    through: EnterRoom
})
ChatRoom.belongsToMany(Users, {
    through: EnterRoom
})

Team.hasOne(Users, {
    sourceKey: 'gid',
    foreignKey: 'gid',
})
Users.belongsTo(Team, {
    foreignKey: 'gid',
})

