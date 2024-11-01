import logger from '../src/logger.js';
import sender from './email_sender.js';
import bcrypt from "bcryptjs";
import auth from '../controllers/auth.controller.js';
import usr_ctrl from '../controllers/usuario.controller.js';
import sp_ctrl from '../controllers/usuario.controller.js';


async function generate_rec_token(request, response){
    try{

        logger.info(`Recebida requisição para generate_rec_token. Método: ${request.method}, URL: ${request.url}`);

        if (!request.body || !request.body.email) {
            throw new Error('Email não encontrado no corpo da requisição.');
        }
       
        const email = request.body.email;

        
        const super_flag = await auth.is_super_user(email)
        let token;
        
        if(super_flag){
            logger.error("Recuperação Superusuário");
            token = await sp_ctrl.insert_rec_token(email);

        }else{

            logger.error("Recuperação Usuário");
            token = await usr_ctrl.insert_rec_token(email);

        }

        logger.error("Mandando o e-mail");
        await sender.send_pass_rec_mail(email, token, super_flag);

    }catch (error) {
        logger.error(`${error.message}`);
        response.status(500).json({ error: error.message });
    }

    response.status(200).send();
}




async function trade_pass(request, response){
    try{

        logger.info(`Recebida requisição para trade_pass. Método: ${request.method}, URL: ${request.url}`);

        if (!request.body || !request.body.email || !request.body.senha_nova) {
            throw new Error('Parâmetros da requisição inválidos');
        }

        const email = request.body.email;
        const password = request.body.senha_nova;

        const super_flag = await auth.is_super_user(email);
        const salt = bcrypt.genSaltSync();

        let updateData = {
            email: email,
            senha: bcrypt.hashSync(password, salt),
            rec_token: null,
            rec_token_expira: null
        };

        logger.info(`Fazendo update no banco`);

        if(super_flag){
            await sp_ctrl.update(updateData, response);

        }else{
            await usr_ctrl.update(updateData, response);
        }

    }catch (error) {
        logger.error(`${error.message}`);
        response.status(500).json({ error: error.message });
    }

    response.status(200).send();
}

export default {trade_pass, generate_rec_token};