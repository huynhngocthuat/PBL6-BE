import app from "index";
import logger from "configs/winston.config";
import registerWithEureka from 'helpers/eurekaHelper'

app.set("port", process.env.PORT || 3000);
registerWithEureka('node-service', process.env.PORT);

app.listen(app.get("port"), () => {
  logger.info(`Express server listening on port ${app.get("port")}`);
});
