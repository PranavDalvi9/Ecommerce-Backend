const dotenv = require('dotenv');
const router = require('./src/routes/routes.js')
const express = require('express')
const dbconnection = require('./src/config/db.js')
dotenv.config();

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
