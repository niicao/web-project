import model from "../models/evento.model.js";
import Op from "../models/dbconfig.js";
import logger from "../src/logger.js";

async function findAll(request, response) {
  logger.info(`Recebida requisição para findAll. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findAll();
    response.status(200).json(res);
  } catch (err) {
    logger.error(`Erro ao obter todos os eventos: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter eventos' });
  }
}

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
}

async function findProxEventos(request, response) {
  logger.info(`Recebida requisição para findProxEventos. Método: ${request.method}, URL: ${request.url}`);

  const now = new Date();
  try{
    const Eventos = await model.findAll()
    const proxEventos = Eventos.filter(evento => parseDate(evento.data) >= now);

    response.status(200).json(proxEventos);
  }catch(error){
    console.error('Erro ao encontrar próximos eventos:', error);
    response.status(500).json({ error: 'Erro ao encontrar próximos eventos' });
  }
}

async function findUltEventos(request, response) {
  logger.info(`Recebida requisição para findUltEventos. Método: ${request.method}, URL: ${request.url}`);
  const now = new Date();
  try {
    const Eventos = await model.findAll()
    const ultEventos = Eventos.filter(evento => parseDate(evento.data) < now);

    response.status(200).json(ultEventos);
  } catch (error) {
    console.error('Erro ao encontrar últimos eventos::', error);
    response.status(500).json({ error: 'Erro ao encontrar últimos eventos' });
  }
}


async function findById(request, response) {
  logger.info(`Recebida requisição para findById. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.findByPk(request.params.id);
    if (res) {
      response.status(200).json(res);
    } else {
      response.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (err) {
    logger.error(`Erro ao obter evento por ID: ${err.message}`);
    response.status(500).json({ error: 'Erro ao obter evento' });
  }
}

async function create(request, response) {
  logger.info(`Recebida requisição para create. Método: ${request.method}, URL: ${request.url}`);

  try {
    const res = await model.create({
      nome: request.body.nome,
      descricao: request.body.descricao,
      data: request.body.data,
    });
    response.status(201).json(res);
  } catch (err) {
    logger.error(`Erro ao criar evento: ${err.message}`);
    response.status(500).json({ error: 'Erro ao criar evento' });
  }
}

async function deleteByPk(request, response) {
  logger.info(`Recebida requisição para deleteByPk. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.destroy({ where: { id: request.params.id } });
    response.status(200).send();
  } catch (err) {
    logger.error(`Erro ao deletar evento: ${err.message}`);
    response.status(500).json({ error: 'Erro ao deletar evento' });
  }
}

async function update(request, response) {
  logger.info(`Recebida requisição para update. Método: ${request.method}, URL: ${request.url}`);

  try {
    await model.update(
      {
        nome: request.body.nome,
        descricao: request.body.descricao,
        data: request.body.data,
      },
      { where: { id: request.params.id } }
    );
    response.status(200).send();
  } catch (e) {
    logger.error(`Erro ao atualizar evento: ${e.message}`);
    response.status(500).json({ error: 'Erro ao atualizar evento' });
  }
}


async function updateAll(req, res) {
  logger.info(`Recebida requisição para updateAll. Método: ${req.method}, URL: ${req.url}`);

  const eventosFromClient = req.body;

  try {
    const currentEventos = await model.findAll();
    const currentEventIds = currentEventos.map(evento => evento.id);

    const eventIdsFromClient = eventosFromClient.map(evento => evento.id).filter(id => id);

    const eventIdsToDelete = currentEventIds.filter(id => !eventIdsFromClient.includes(id)).map(id => parseInt(id, 10));;

    const eventsToAdd = eventosFromClient.filter(evento => !evento.id);

    if(eventIdsToDelete.length > 0){
      for(const idEvento of eventIdsToDelete){
        await model.destroy({ where: { id: idEvento } });
      }
    }


    for (const evento of eventsToAdd) {
      await model.create({
        nome: evento.nome,
        descricao: evento.descricao,
        data: evento.data,
      });
    }

    res.status(200).json({ message: 'Eventos atualizados com sucesso!' });
  } catch (e) {
    logger.error(`Erro ao atualizar eventos: ${e.message}`);
    res.status(500).json({ error: 'Erro ao atualizar eventos' });
  }
}

export default {
  findAll,
  findById,
  create,
  deleteByPk,
  update,
  updateAll,
  findProxEventos,
  findUltEventos,
};
