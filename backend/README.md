# Guia sobre uso do código fonte do Backend

## Ambiente

O ambiente de execução da aplicação é mantido pela configuração do Node e do NPN do projeto.

Para configurar corretamente o ambiente antes de rodar o código, execute: ``` $ npm install ```.

Para rodar o servidor, execute: ``` $ npm start ``` ou ``` $ node index.js ```.

## Organização do Projeto

### Manutenção da Aplicação

- **./src/index.js**: arquivo que rege o servidor, onde há a implementação da chamada principal que monitora a porta.
- **./utils/logger.js**: arquivo que configura o sistema de log. Fornesce um objeto "Logger" sobre o qual podem ser escritos os logs, warnings, infos, errors e outros. Cada log é organizado em um arquivo ```.log```, contido na pasta *logs* .
- **./utils/dbsync.js**: arquivo que realiza a conexão e a sincronização das relações ao servidor que hospeda o banco de dados.

### Desenvolvimento das Rotas

- **./routes/api.routes.js**: arquivo em que cada requisição HTTP é encaminhada a seu devido arquivo, definindo as rotas dos serviços implementados.

### Base de Dados
- **./controllers/** : arquivos se encontram as traduções das requisições HTTP em querys do banco.
- **./models/** : arquivos que definem as configurações da modelagem do banco.

### Auxiliares:
- **.package.json**: armazena as dependências e meta-dados do projeto.
- **./utils/clean_logs.sh**: script de bash que limpa os arquivos de logs.
- **.env**: diretório que armazena as variáveis de ambiente que são utilizadas pela aplicação.
