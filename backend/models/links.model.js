import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Link extends Model {}
Link.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize: sequelize, timestamps: false },
);

export default Link;
