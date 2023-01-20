import dotenv from "dotenv";
dotenv.config();
import router from "./src/routes/routes.js";
import express from "express";
import dbconnection from "./src/config/db.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/", router);

app.listen(port, async (req, res) => {
  try {
    await dbconnection.connect();
    console.log(`server connected to the port on ${port}`);
  } catch (error) {
    console.log("error --", error.message);
  }
});
