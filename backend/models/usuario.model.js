import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Usuario extends Model {}
Usuario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    dataNascimento: { type: DataTypes.STRING, allowNull: false },
    concordo:{type: DataTypes.BOOLEAN, allowNull: false},
    senha: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    cep: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false },
    formacao: { type: DataTypes.STRING, allowNull: false },

    // informações necessárias para o serviço de recuperação de senha ;
    rec_token: { type: DataTypes.STRING, allowNull: true },
    rec_token_expira: { type: DataTypes.DATE, allowNull: true },

    //as info abaixo sao para cadastro de interpretes somente, entao pode ser null
    experiencia: { type: DataTypes.STRING, allowNull: true },
    trabAtual: { type: DataTypes.BOOLEAN, allowNull: true },
    recomendacoes: { type: DataTypes.STRING, allowNull: true },
    interesse: { type: DataTypes.BOOLEAN, allowNull: true },

    //por fim sao os horarios. Tá em array de string, mas n sei se funciona ou como manipula isso depois. Fé em Deus
    segunda: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    terca: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    quarta: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    quinta: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    sexta: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    sabado: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  },
  { sequelize: sequelize, timestamps: false },
);

export default Usuario;
