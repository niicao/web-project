import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Evento extends Model {}
Evento.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize: sequelize, timestamps: false },
);

export default Evento;
