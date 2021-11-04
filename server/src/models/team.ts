import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Users } from './users';

interface TeamAttributes {
    gid : number;
    image :string;
    name : string;
    description :string;
    time : Date;
    location : string;
}


export class Team extends Model<TeamAttributes>{
    public gid!: number;
    public image!:string;
    public name!: string;
    public description!:string;
    public time!: Date;
    public location!: string;
    public static associations : {};
}

Team.init(
    {
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        image: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        time:{
            type : DataTypes.DATE,
            allowNull:true
        },
        location: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        modelName : 'Team',
        tableName : 'Team',
        sequelize,
        freezeTableName : true,
    }
);



