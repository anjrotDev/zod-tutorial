import routes from "@routes/routes";
import express, { Application } from "express";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use("/", routes());

app.use("/img", express.static(path.join(__dirname, "../public/img")));

export default app;
