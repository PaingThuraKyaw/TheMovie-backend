const express = require("express");
const { connection } = require("./util/database");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const UserRouter = require("./router/user.router");
const cors = require("cors");
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(cors());

//router
app.use(UserRouter);

//database connect
connection()
  .then((_) => console.log("connect"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
