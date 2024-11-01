import logger from "./logger.js";
import Link from "../models/links.model.js";
import Usuario from "../models/usuario.model.js";
import Evento from "../models/evento.model.js";
import Super from "../models/superusuario.model.js";
import sequelize from "../models/dbconfig.js";


async function checkDatabaseConnection() {

  try {
    await(sequelize.authenticate()); // Teste a conexão com o banco de dados
    logger.info('Conexão com o banco de dados estabelecida com sucesso!');

    await Link.sync(); 
    await Usuario.sync();
    await Evento.sync();
    await Super.sync();
     
    logger.info('Modelos sincronizados com o banco de dados!');
    
  } catch (error) {
    
    logger.fatal('Erro ao tentar se conectar ou sincronizar ao banco de dados:', error);
    // Trate o erro como necessário, como encerrando a aplicação ou mostrando uma mensagem de erro
    process.exit(1); // Encerra o processo Node.js com um código de erro (1)
  }
}

export default checkDatabaseConnection;