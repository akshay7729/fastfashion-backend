const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const UserRouter = require("./Routers");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(UserRouter);

app.listen(PORT, () => {
  console.log("Server is up", PORT);
});
