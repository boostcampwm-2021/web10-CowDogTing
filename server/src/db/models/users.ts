import { DataTypes, Model } from "sequelize";
import { Team } from "./team";
import { sequelize } from "./index";

export interface UserAttributes {
  uid: string;
  password: string;
  location: string;
  github_id?: string | null;
  naver_id?: string | null;
  kakao_id?: string | null;
  image?: string | null;
  age: number;
  sex: string;
  gid?: number | null;
  info?: string | null;
}

export class Users extends Model<UserAttributes> {
  public uid!: string;
  public password!: string;
  public location!: string;
  public github_id?: string | null;
  public naver_id?: string | null;
  public kakao_id?: string | null;
  public image?: string | null;
  public age!: number;
  public sex!: string;
  public gid?: number | null;
  public info?: string | null;
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
  },
);

Team.hasMany(Users, {
  sourceKey: "gid",
  as: "member",
  foreignKey: "gid",
});
Users.belongsTo(Team, {
  foreignKey: "gid",
  as: "member",
  targetKey: "gid",
});
