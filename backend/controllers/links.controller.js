import model from "../models/links.model.js";
import logger from "../src/logger.js";

async function findAll(request, response) {
  logger.info(`Recebida requisição para findAll. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findAll();
    response.status(200).json(res);
  } catch (err) {
    logger.error(`Erro ao obter todos os links: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter links' });
  }
}

async function findById(request, response) {
  logger.info(`Recebida requisição para findById. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findByPk(request.params.id);
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json({ error: 'Link não encontrado' });
    }
  } catch (err) {
    logger.error(`Erro ao obter link por ID: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter link' });
  }
}

async function create(request, response) {
  logger.info(`Recebida requisição para create. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.create({
      nome: request.body.nome,
      descricao: request.body.descricao,
      link: request.body.link,
    });
    response.status(201).json(res);
  } catch (err) {
    logger.error(`Erro ao criar link: ${err.message}`);
    response.status(500).json({ error: 'Erro ao criar link' });
  }
}

async function deleteByPk(request, response) {
  logger.info(`Recebida requisição para deleteByPk. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.destroy({ where: { id: request.params.id } });
    response.status(200).send();
  } catch (err) {
    logger.error(`Erro ao deletar link: ${err.message}`);
    response.status(500).json({ error: 'Erro ao deletar link' });
  }
}

async function update(request, response) {
  logger.info(`Recebida requisição para update. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.update(
      {
        nome: request.body.nome,
        descricao: request.body.descricao,
        link: request.body.link,
      },
      { where: { id: request.params.id } }
    );
    response.status(200).send();
  } catch (e) {
    logger.error(`Erro ao atualizar link: ${e.message}`);
    response.status(500).json({ error: 'Erro ao atualizar link' });
  }
}

async function updateAll(req, res) {
  logger.info(`Recebida requisição para updateAll. Método: ${req.method}, URL: ${req.url}`);

  const linksFromClient = req.body;

  try {
    const currentLinks = await model.findAll();
    const currentLinksIds = currentLinks.map(link => link.id);

    const linkIdsFromClient = linksFromClient.map(link => link.id).filter(id => id);

    const linkIdsToDelete = currentLinksIds.filter(id => !linkIdsFromClient.includes(id)).map(id => parseInt(id, 10));;

    const linksToAdd = linksFromClient.filter(link => !link.id);

    if(linkIdsToDelete.length > 0){
      for(const idLink of linkIdsToDelete){
        await model.destroy({ where: { id: idLink } });
      }
    }

    for (const link of linksToAdd) {
      await model.create({
        nome: link.nome,
        descricao: link.descricao,
        link: link.link,
      });
    }

    res.status(200).json({ message: 'Links atualizados com sucesso!' });
  } catch (e) {
    logger.error(`Erro ao atualizar links: ${e.message}`);
    res.status(500).json({ error: 'Erro ao atualizar links' });
  }
}

export default {
  findAll,
  findById,
  create,
  deleteByPk,
  update,
  updateAll,
};
