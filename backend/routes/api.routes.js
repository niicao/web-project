import express from 'express';
import superController from '../controllers/superusuario.controller.js';
import usuarioController from '../controllers/usuario.controller.js';
import eventoController from '../controllers/evento.controller.js';
import linksController from '../controllers/links.controller.js';
import authController from '../controllers/auth.controller.js';
import email_sender from '../other_services/email_sender.js';
import recuperacao_senha from '../other_services/recuperacao_senha.js';
import logger from '../src/logger.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.send("Está recebendo requisições na rota /");
    logger.info("Está recebendo requisições na rota /");
});

// ---------------------------------------------------
// ROTA ALL: utilizada para validar token ------------
// ---------------------------------------------------
router.all("/autorizacao", authController.validateToken);

// ---------------------------------------------------
// ROTA GET: utilizada para consultas ----------------
// ---------------------------------------------------
router.get("/super", authController.validateSuperUser, superController.findAll);
router.get("/super/:id",  authController.validateSuperUser, superController.findById); 

router.get("/eventos", eventoController.findAll);
router.get("/proxEventos", eventoController.findProxEventos);
router.get("/ultEventos", eventoController.findUltEventos);
router.get("/eventos/:id", eventoController.findById);

router.get("/links", linksController.findAll);
router.get("/links/:id", linksController.findById);
router

router.get("/usuarios",  authController.validateSuperUser, usuarioController.findAll);
router.get("/usuarios/:id", authController.validateToken, usuarioController.findById);

// ---------------------------------------------------
// ROTA POST: utilizada para criar tuplas ------------
// ---------------------------------------------------

router.post("/links", authController.validateSuperUser, linksController.create);
router.post("/eventos",authController.validateSuperUser, eventoController.create);

router.post("/super", authController.validateSuperUser, superController.create);

router.post("/cadastro", authController.register);
router.post("/login", authController.login);

router.post("/contato", email_sender.send_reach_out_mail);
router.post("/recuperacao", recuperacao_senha.generate_rec_token);


// ---------------------------------------------------
// ROTA DELETE: utilizada para delecao ---------------
// ---------------------------------------------------
router.delete("/eventos/:id", authController.validateSuperUser, eventoController.deleteByPk);
router.delete("/links/:id", authController.validateSuperUser, linksController.deleteByPk);
router.delete("/usuarios/:id", authController.validateToken, usuarioController.deleteByPk);
router.delete("/super/:id", authController.validateSuperUser, superController.deleteByPk);

// ---------------------------------------------------
// ROTA PUT: utilizada para alteracao ----------------
// ---------------------------------------------------
router.put("/eventos/:id", authController.validateSuperUser, eventoController.update);
router.put("/eventos", authController.validateSuperUser, eventoController.updateAll);

router.put("/links/:id", authController.validateSuperUser, linksController.update);
router.put("/links", authController.validateSuperUser, linksController.updateAll);

router.put("/usuarios/:id", authController.validateToken, usuarioController.update);
router.put("/super/:id", authController.validateSuperUser, superController.update);

router.put("/recuperacao", authController.validateToken, recuperacao_senha.trade_pass);

export default router;
