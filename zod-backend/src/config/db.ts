import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/config/database.sqlite"
});

export default (async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected!!!");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log("error connecting to Db:>> ", error);
  }
})();
