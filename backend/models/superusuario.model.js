import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Super extends Model {}
Super.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },

    // informações necessárias para o serviço de recuperação de senha ;
    rec_token: { type: DataTypes.STRING, allowNull: true },
    rec_token_expira: { type: DataTypes.DATE, allowNull: true},
  },
  { sequelize: sequelize, timestamps: false },
);

export default Super;