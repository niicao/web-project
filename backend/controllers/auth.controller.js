import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/usuario.model.js";
import SuperUser from "../models/superusuario.model.js";
import logger from "../src/logger.js"

import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.AUTH_SECRET;
const salt = bcrypt.genSaltSync();

async function register(request, response) {
    logger.info(`Recebida requisição para register.`);

    // valores vazios
    if (!request.body.senha || !request.body.email) {
        return response.status(400).send("Informe usuário e senha!");
    }
    // já existe cadastro no bd
    let user = await User.findOne({ where: { email: request.body.email } });
    let suser = await SuperUser.findOne({ where: { email: request.body.email } });
    if (user || suser) {
        return response.status(409).send("Usuário já cadastrado!");
    }
    // hashing da senha
    const hashedPassword = bcrypt.hashSync(request.body.senha, salt);
    // cadastra usuario
    User.create({
        nome: request.body.nome,
        telefone: request.body.telefone,
        email: request.body.email,
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
    })
        .then((result) => {
            // criar e devolver o token
            const meuToken = getToken(
                result.dataValues.id,
                result.dataValues.email,
                false,
            );
            return response.status(201).send({ token: meuToken });
        })
        .catch((erro) => {
            console.log(erro);
            return response.status(500).send(erro);
        });
}

function getToken(uid, uemail, usuper) {
    logger.info(`Recebida requisição para getToken.`);
    const meuToken = jwt.sign(
        {
            sub: uid,
            email: uemail,
            admin: usuper
        },
        secret,
        {
            expiresIn: "7d",
        },
    );
    return meuToken;
}

async function login(request, response) {

    logger.info(`Recebida requisição para login.`);

    // valores vazios
    if (!request.body.senha || !request.body.email) {
        return response.status(400).send("Informe usuário e senha!");
    }

    //checa se é o email digitado corresponde a um super usuário antes de mais nada
    const superuser = await SuperUser.findOne({
        where: { email: request.body.email },
    });

    

    if(!superuser){
        
        // USUARIO COMUM

        const user = await User.findOne({
            where: { email: request.body.email },
        });

        if (!user) {
            return response.status(400).send("Usuário não cadastrado!");
        }

        // compara senha usando a criptografia
        const isEqual = bcrypt.compareSync(request.body.senha, user.senha);
        
        if(isEqual){
            // caso padrão
            const meuToken = getToken(user.id, user.email, false);
            return response
                .status(200)
                .json({ id: user.id, email: user.email, admin: false, token: meuToken });

        }else if(user.rec_token && bcrypt.compareSync(request.body.senha, user.rec_token)){
            // caso de recuperação de senha
            logger.info("[Recuperação de senha] rec_token: " + user.rec_token);

            if(user.rec_token_expira < Date.now()) return response.status(401).send("Token de recuperação de senha expirado!");
            
            else{
                const meuToken = getToken(user.id, user.email, false);
                return response
                    .status(200)
                    .json({ id: user.id, email: user.email, admin: false, token: meuToken });
            }

        }else return response.status(401).send("Usuário e senha inválidos!");

        
    }else{
        
        // compara senha usando a criptografia
        const isEqual = bcrypt.compareSync(request.body.senha, superuser.senha);

        // SUPERUSUARIO
        if(isEqual){

            // caso padrão
            const meuToken = getToken(superuser.id, superuser.email, true);
            return response
                .status(200)
                .json({ id: superuser.id, email: superuser.email, admin: true, token: meuToken });

        }else if(request.body.senha == superuser.rec_token){
            // caso de recuperação de senha
            logger.info("[Recuperação de senha] rec_token: " + user.rec_token);

            if(superuser.rec_token_expira < Date.now()) return response.status(401).send("Token de recuperação de senha expirado!");
            
            else{
                const meuToken = getToken(superuser.id, superuser.email, true);
                return response
                    .status(200)
                    .json({ id: superuser.id, email: superuser.email, admin: true, token: meuToken });
            }

        }else return response.status(401).send("Usuário e senha inválidos!");
    }
}

async function validateToken(request, response, next) {
    logger.info(`Recebida requisição para validateToken.`);

    let token = request.headers.authorization;
    try {
        if (token && token.startsWith("Bearer")) {
            
            token = token.substring(7, token.length);
            
            const decodedToken = jwt.verify(token, secret);

            // add decodedToken ao request para uso posterior
            request.user = decodedToken;

            logger.info("Token validado com sucesso para o usuário: " + decodedToken.email);
            return next();

        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }
    } catch (e) {
        logger.error(e + "Token não autorizada para o usuário: + " + request.user.email);
        return response.status(401).send({ message: "Unauthorized" });
    }
}

async function validateSuperUser(request, response, next) {

    logger.info(`Recebida requisição para validateSuperUser.`);

    let token = request.headers.authorization;

    try {
        if (token && token.startsWith("Bearer")) {

            token = token.substring(7, token.length);

            const decodedToken = jwt.verify(token, secret);

            // Verifica se o usuário é superusuário
            if (decodedToken.admin) {

                request.user = decodedToken;

                logger.info("Token validado com sucesso para o superusuário: " + decodedToken.email);

                return next();
                
            }else{

                logger.error("Tentativa de requisicão adm falhou: token não autorizado para o usuário: " + decodedToken.email);

                return response.status(403).send({ message: "Forbidden: Not a superuser" });
            }
            
        }else {
            return response.status(401).send({ message: "Unauthorized" });
        }

    } catch (e) {
        logger.error("Erro ao validar token: " + e.message);
        return response.status(401).send({ message: "Unauthorized" });
    }
}

async function is_super_user(email) {
    logger.info("Verificando se o usuário é um superusuário.")

    let superuser = await SuperUser.findOne({ where: { email: email } });

    logger.info("Retorno SuperUser: " + superuser + ".");

    if(superuser) return true;
    else{
        let usr = await User.findOne({ where: { email: email } });
        logger.info("Retorno User: " + usr + ".");
        if(usr) return false;
        else throw Error("Usuário não encontrado");
    }
}

function findAll(request, response) {
    User.findAll()
        .then(function (res) {
            return response.json(res).status(200);
        })
        .catch(function (err) {
            return response.json(err).status(500);
        });
}

export default { register, login, validateToken, findAll, validateSuperUser, is_super_user };