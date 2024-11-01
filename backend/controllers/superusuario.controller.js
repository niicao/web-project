import model from "../models/superusuario.model.js";
import logger from "../src/logger.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import validator from "validator";

async function findAll(request, response) {
  logger.info(`Recebida requisição para findAll. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findAll();
    response.status(200).json(res);
  } catch (err) {
    logger.error(`Erro ao obter todos os superUsuários: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter superUsuários' });
  }
}

async function findById(request, response) {
  logger.info(`Recebida requisição para findById. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findByPk(request.params.id);
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json({ error: 'Super Usuário não encontrado' });
    }
  } catch (err) {
    logger.error(`Erro ao obter Super Usuário por ID: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter Super Usuário' });
  }
}

async function findByEmail(email) {

  logger.info(`Recebida requisição para findByEmail`);

    const res = await model.findOne({ where: { email: email } });
    if (res) {
      return res;
    } else {
      throw Error('superusuario não encontrado por e-mail');
    }
}



async function insert_rec_token(email) {

  logger.info(`Recebida requisição para insert_token. Método: ${request.method}, URL: ${request.url}`);
    
    // Validando informações requeridas 

    email = email.trim().toLowerCase();
    const token = crypto.randomBytes(20).toString('hex');

    if (!validator.isEmail(email)) {

      logger.error('Email inválido.');
      throw new Error('Email inválido.');
    }

    if (token.length < 6) {

      logger.error('Token inválido.');
      throw new Error('Token inválido.');
    }

    const expirationDate = new Date() + 1;

    // Atualizar o registro no banco de dados

    const [updated] = await model.update(
      {
        rec_token: token,
        rec_token_expira: expirationDate,
      },
      { where: { email: email } }
    );

    if (updated) {
      return token;
    } else {
      throw Error('Erro ao atualizar token de recuperação de senha.');
    }
}

async function create(request, response) {
  logger.info(`Recebida requisição para create. Método: ${request.method}, URL: ${request.url}`);

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(request.body.senha, salt);

  try {
    const res = await model.create({
      email: request.body.email,
      senha: hashedPassword,
    });
    response.status(201).json(res);
  } catch (err) {
    logger.error(`Erro ao criar SuperUsuário: ${err.message}`);
    response.status(500).json({ error: 'Erro ao criar SuperUsuário' });
  }
}

async function deleteByPk(request, response) {
  logger.info(`Recebida requisição para deleteByPk. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.destroy({ where: { id: request.params.id } });
    response.status(200).send();
  } catch (err) {
    logger.error(`Erro ao deletar SuperUsuário: ${err.message}`);
    response.status(500).json({ error: 'Erro ao deletar SuperUsuário' });
  }
}

async function update(request, response) {
  logger.info(`Recebida requisição para updateUser. Método: ${request.method}, URL: ${request.url}`);

  try {
    const updateData = request.body;
    let updatedRowsCount = 0;

    if (!request.body) {
      return response.status(400).send('Corpo da requisição está vazio.');
    }
    logger.info(`uepa0`);
    try{
      if (request.body.id) {

        logger.info(`caso ID`);
        const id = request.body.id;
        [updatedRowsCount] = await model.update(updateData, { where: { id: id } });
      }
    }catch(err){
      try{
        if(request.body?.email){

          logger.info(`caso EMAIL`);
          const email = request.body.email;
          [updatedRowsCount] = await model.update(updateData, { where: { email: email } });
        }
      }catch(err){
        return response.status(400).send('ID ou E-mail do usuário é obrigatório.');
      }
    }

    if (updatedRowsCount === 0) {
      return response.status(404).send('Usuário não encontrado.');
    } else {
      return response.status(200).send('Usuário atualizado com sucesso.');
    }
  } catch (error) {
    logger.error(`Erro ao atualizar usuário: ${error.message}`);
    return response.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
}

export default {
  findAll,
  findById,
  create,
  deleteByPk,
  update,
  insert_rec_token,
  findByEmail,
};
