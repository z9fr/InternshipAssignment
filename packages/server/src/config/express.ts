import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import v1 from "../api/routes/v1";
import { notFound, handler } from "../api/middlewares/error";
import cors from "cors";

const app = express();

// log requests -> dev: console || prod : file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(cors());

//@TODO mount routes
app.use("/v1", v1);

app.use(notFound);
app.use(handler);

export { app };
