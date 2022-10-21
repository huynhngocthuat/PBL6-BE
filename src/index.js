import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "models";
import router from "routers";
import * as utils from "utils";
import { swagger } from "helpers/swagger";

db.sequelize.sync();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api-docs", swagger());
app.use("/api/v1", router);

export default app;
