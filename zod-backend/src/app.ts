import app from "@server/server";
import dotenv from "dotenv";
import "@config/db";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
