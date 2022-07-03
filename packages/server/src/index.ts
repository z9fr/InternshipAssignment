import { app } from "./config/express";
import { connect } from "./config/db";

const PORT = 4001;
const HOST = "localhost";

// start db connection
connect();

app.listen(PORT, () => {
  console.log(`Application started on http://${HOST}:${PORT}`);
});
