import { DataTypes, Model } from "sequelize";
import { Team } from "./team";
import { sequelize } from "./index";

interface UserAttributes {
  uid: string;
  password: string;
  location: string;
  github_id: string;
  naver_id: string;
  kakao_id: string;
  image: number;
  age: number;
  sex: string;
  gid: number;
  info: string;
}

export class Users extends Model<UserAttributes> {
  public uid!: string;
  public password!: string;
  public location!: string;
  public github_id!: string;
  public naver_id!: string;
  public kakao_id!: string;
  public image!: number;
  public age!: number;
  public sex!: string;
  public gid!: number;
  public info!: string;
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
      type: DataTypes.INTEGER,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING(100),
    },
    gid: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "Users",
    tableName: "Users",
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

Team.hasOne(Users, {
  sourceKey: "gid",
  as: "member",
  foreignKey: "gid",
});
Users.belongsTo(Team, {
  foreignKey: "gid",
  as: "member",
  targetKey: "gid",
});
