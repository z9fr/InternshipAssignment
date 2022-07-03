import { app } from "./config/express";

const PORT = 4001;
const HOST = "localhost";

app.listen(PORT, () => {
  console.log(`Application started on http://${HOST}:${PORT}`);
});
