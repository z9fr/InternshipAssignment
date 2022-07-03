import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import v1 from "../api/routes/v1";
import { notFound, handler } from "../api/middlewares/error";

const app = express();

// log requests -> dev: console || prod : file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.json());

//@TODO mount routes
app.use("/v1", v1);

app.use(notFound);
app.use(handler);

export { app };
