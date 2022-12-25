import app from 'index';
import logger from 'configs/winston.config';
import registerWithEureka from 'helpers/eurekaHelper';
import { connectRabbitMQ } from 'helpers/rabbitMQ';

app.set('port', process.env.PORT || 3000);

registerWithEureka('node-service', process.env.PORT);
connectRabbitMQ();

app.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});
