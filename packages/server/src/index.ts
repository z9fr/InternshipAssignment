import { AppDataSource } from "./config/data-source";
import { User } from "./entity/user";

import { app } from "./config/express";

const PORT = 4001;
const HOST = "localhost";

AppDataSource.initialize()
  .then(async () => {
    //   const users = await AppDataSource.manager.find(User);
    //  console.log(users);

    app.listen(PORT, () => {
      console.log(`Application started on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
