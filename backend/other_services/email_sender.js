import nodemailer from 'nodemailer';
import logger from "../src/logger.js";
import usr from "../controllers/usuario.controller.js";
import sp from "../controllers/superusuario.controller.js";
import path from 'path';


const email_assc = "pagina.assc@gmail.com";
const email_password = "llvx jpub jcry ghhk";
const instagram_link = "https://www.instagram.com/assc_saocarlos/";
const phone_number = "(16) 3419-9222";
const address = "Av. Comendador Alfredo Maffei, 1372 - Jardim Sao Carlos, São Carlos - SP";

const img_name = "logo.jpeg";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const img_path = path.resolve(__dirname, "./logo.jpeg");

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: email_assc,
        pass: email_password
    }
});

async function verify_transporter(){
    try {
        await transporter.verify();
        logger.log('Transporter de email funcionando\n');
        return true;

    } catch (error) {
        logger.error('Erro ao verificar o transporter:', error, '\n');
        
        return false;
    }
}

async function send_reach_out_mail(request, response){

    const { name, company_name, email, cel_number, message, file } = request.body;
    logger.info(`Recebida requisição para send_reach_out_mail.: ${name}, ${company_name}, ${email}, ${cel_number}, ${message}, ${file}`);

    const mail_op1 = {
        from: email_assc,
        to: email_assc,
        subject: '[SITE ASSC] - Mensagem do Formulário de Contato',
        text: `
            Nome: ${name}
            Empresa: ${company_name}
            Email: ${email}
            Telefone: ${cel_number}
            Mensagem: ${message}
        `,
        attachments: file ? [{ filename: file.originalname, content: file.buffer }] : []
    };
    
    logger.info('mail_op1: foi', mail_op1);

    const mail_op2 = {
        from: email_assc,
        to: email,
        subject: 'ASSC Jurandyra Fehr - Retorno mensagem do Formulário de Contato',
        text: `
        
        Saudações ${name}, obrigado por entrar em contato com a Associação de Surdos de São Carlos.

        Recebemos sua mensagem e em breve entraremos em contato.
        Faremos o possível para atender sua solicitação.

        Em caso de urgência, ou necessidade, saiba que é possível contactar-nos através de:

        - Instagram: S{instagram_link}
        - Telefone: ${phone_number}
        - Endereço: ${address}

        Funcionamos das 9:00 às 16 horas, de segunda a sexta-feira, exceto feriados.
        Já no fim de semana, abrimos aos sábados, das 14 às 17 horas.

        Atenciosamente, Associação Jurandyra Fehr.
    `,
    html: `
        <p>Saudações ${name}, obrigado por entrar em contato com a Associação de Surdos de São Carlos.</p>
        <p>Recebemos sua mensagem e em breve entraremos em contato. Faremos o possível para atender sua solicitação.</p>
        <p>Em caso de urgência, ou necessidade, saiba que é possível contactar-nos através de:</p>
        <ul>
            <li>Instagram: <a href=${phone_number}>Link Instagram</a></li>
            <li>Telefone: ${phone_number}</li>
            <li>Endereço: ${address}</li>
        </ul>
        <p>Funcionamos das 9:00 às 16 horas, de segunda a sexta-feira, exceto feriados. Já no fim de semana, abrimos aos sábados, das 14 às 17 horas.</p>
        <p>Atenciosamente, Associação Jurandyra Fehr.</p>
       <div style="text-align: center;">
            <img src="cid:unique@image" alt="Logo ASSC - Araucária e mãos fazendo sinais de libras." style="max-width: 65%;" />
        </div>
    `,

    attachments: [
        {
            filename: img_name,
            path: img_path,
            cid: 'unique@image'
        },
    ]

    };
        
    logger.info('mail_op2: foi', mail_op2);

    transporter.sendMail(mail_op1, (error, info) => {
        if (error) {
            logger.error('Erro ao enviar email à associação:', error, '\n');
            return response.status(500).send(error.toString());
        }
    });

    transporter.sendMail(mail_op2, (error, info) => {
        if (error) {
            logger.error('Erro ao enviar email ao usuário:', error, '\n');
            return response.status(500).send(error.toString());
        }
        response.status(200).send('Emails enviados com sucesso!');
    });
}


async function send_pass_rec_mail(email, token, super_flag){

    logger.info(`Recebida requisição para send_pass_rec_mail.`);

    let data;

    if(super_flag){
        data = await sp.findByEmail({where:{ email: email }});
    }else{
        data = await usr.findByEmail({where:{ email: email }});
    }

    const mail_op = {
        from: email_assc,
        to: data.email,
        subject: '[SITE ASSC] - Recuperação de Senha',
        text: `
            Saudações ${data.nome}, você solicitou a recuperação de senha para o email ${data.email}.

            Para redefinir sua senha, acesse sua conta usando o token abaixo:
            - Token: ${token} ;

            Atenção: Este token expira em 1 hora. Caso esse tempo seja ultrapassado, realize novamente a solicitação de recuperação de senha.

            Atenciosamente, Associação Jurandyra Fehr.

        `,

        html: `
        <p>Saudações ${data.nome}, você solicitou a recuperação de senha para o email ${data.email}.</p>
        <p>Para redefinir sua senha, acesse sua conta usando o token abaixo:</p>
        <ul>
            <li>Token: ${token}</li>
        </ul>
        <p><b>Atenção</b>: Este token expira em 1 hora. Caso esse tempo seja ultrapassado, realize novamente a solicitação de recuperação de senha.</p>
        <div style="text-align: center;">
            <img src="cid:unique@image" alt="Logo ASSC - Araucária e mãos fazendo sinais de libras." style="max-width: 65%;" />
        </div>
        `,

        attachments: [
            {
                filename: img_name,
                path: img_path,
                cid: 'unique@image'
            },
        ]
    };
        

    transporter.sendMail(mail_op, (error, info) => {
        if (error) {
            logger.error('Erro ao enviar email à associação:', error, '\n');
            return response.status(500).send(error.toString());
        }
    });
}




export default { verify_transporter, send_reach_out_mail, send_pass_rec_mail };
