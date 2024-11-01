import model from "../models/usuario.model.js";
import logger from "../src/logger.js";
import crypto from 'crypto';
import validator from "validator";
import bcrypt from "bcryptjs";

async function findAll(request, response) {
  logger.info(`Recebida requisição para findAll. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findAll();
    response.status(200).json(res);
  } catch (err) {
    logger.error(`Erro ao obter todos os usuários: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter usuário' });
  }
}

async function insert_rec_token(email_usr) {

  logger.info(`Recebida requisição para insert_token. Método:`);
    
    // Validando informações requeridas 

    email_usr = email_usr.trim().toLowerCase();
    let token = crypto.randomBytes(20).toString('hex');

    logger.info(`Token gerado: ${token}`);

    if (!validator.isEmail(email_usr)) {

      logger.error('Email inválido. - validator');
      throw new Error('Email inválido. - validator');

    }

    let expirationDate = new Date() + 1;

    logger.info(`Data de expiração: ${expirationDate}`);

    // Atualizar o registro no banco de dados

    const salt = bcrypt.genSaltSync();
    const hash_token = bcrypt.hashSync(token, salt);

    const [updated] = await model.update(
      {
        rec_token: hash_token,
        rec_token_expira: expirationDate,
      },
      { where: { email: email_usr } }
    );

    logger.info(`Atualizado: ${updated}`);

    if (updated) {
      return token;
    } else {
      throw Error('Erro ao atualizar token de recuperação de senha.');
    }
}


async function findById(request, response) {
  logger.info(`Recebida requisição para findById. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findByPk(request.params.id);
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json({ error: 'usuário não encontrado' });
    }
  } catch (err) {
    logger.error(`Erro ao obter usuário por ID: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter usuário' });
  }
}

async function findByEmail(email) {

  logger.info(`Recebida requisição para findByEmail`);

    const res = await model.findOne(email);
    if (res) {
      return res;
    } else {
      throw Error('usuário não encontrado por e-mail');
    }
}


async function deleteByPk(request, response) {
  logger.info(`Recebida requisição para deleteByPk. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.destroy({ where: { id: request.params.id } });
    response.status(200).send();
  } catch (err) {
    logger.error(`Erro ao deletar usuário: ${err.message}`);
    response.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}

async function update(request, response) {
  logger.info(`Recebida requisição para updateUser. Método: ${request.method}, URL: ${request.url}`);

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(request.body.senha, salt);

  try {
    await model.update(
      {
        nome: request.body.nome,
        telefone: request.body.telefone,
        dataNascimento: request.body.dataNascimento,
        concordo: request.body.concordo,
        senha: hashedPassword,
        cidade: request.body.cidade,
        estado: request.body.estado,
        cep: request.body.cep,
        tipo: request.body.tipo,
        formacao: request.body.formacao,
        experiencia: request.body.experiencia,
        trabAtual: request.body.trabAtual,
        recomendacoes: request.body.recomendacoes,
        interesse: request.body.interesse,
        segunda: request.body.segunda,
        terca: request.body.terca,
        quarta: request.body.quarta,
        quinta: request.body.quinta,
        sexta: request.body.sexta,
        sabado: request.body.sabado,
      },
      { where: { id: request.params.id } }
    );

    response.status(200).send();
  } catch (e) {
    logger.error(`Erro ao atualizar dados do usuário: ${e.message}`);
    response.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
  }
}

export default {
  findAll,
  findById,
  deleteByPk,
  update,
  insert_rec_token,
  findByEmail,
};
