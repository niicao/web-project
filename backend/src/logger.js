import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'logs_site_ASSC',
  serializers: bunyan.stdSerializers,
  streams: [
    {
        level: 'info',
        stream: process.stdout // Saída para o console para níveis 'info' e superiores
    },
    {
        level: 'warn',
        path: './logs/querys.log' // Saída para o console para níveis 'info' e superiores
    },
    {
        level: 'error',
        path: './logs/error.log' // Arquivo de logs de erro para níveis 'error' e superiores
    }
  ]
});



export default logger;
