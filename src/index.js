import dotenv from 'dotenv';

import express from 'express';
import morgan from 'morgan';
import db from 'models';
import router from 'routers';
import routerAdmin from 'routers/admin';
// eslint-disable-next-line no-unused-vars
import stringFormat from 'utils/string-format';
import { swagger } from 'helpers/swagger';
import bodyParser from 'body-parser';

dotenv.config();

db.sequelize.sync();

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api-docs', swagger());
app.use('/api/v1', router);
app.use('/api/v1/admin', routerAdmin);

export default app;
