const express = require("express");

const connection = require("./config/db");
const userRoute = require("./route/user/user.route");
const todoRouter = require("./route/todo/todo.route");
const authentication = require("./middleware/authentication");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/", userRoute);
app.use(authentication);
app.use("/todo", todoRouter);

app.listen(6060, async () => {
  try {
    await connection();
    console.log("Connected to datbase");
  } catch (error) {
    console.log("Connect to db failed", error);
  }
  console.log("Listning on the port 6060");
});
