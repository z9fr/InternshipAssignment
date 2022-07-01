import express, { Request, Respose } from "express";
import { sayHello } from "@surgeintern/common";
import { testLog } from "@surgeintern/common/dist/test";

const app = express();
const port = 3001;

app.get("/data", (_req: Request, res: Respose) => {
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  sayHello();
  testLog();
  console.log(`Example app listening at http://localhost:${port}`);
});
