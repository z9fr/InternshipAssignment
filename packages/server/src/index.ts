import express, { Request, Respose } from "express";
const app = express();
const port = 3001;

app.get("/data", (_req: Request, res: Respose) => {
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
