const express = require("express");
const todoModel = require("../../model/todos/todo.model");

module.exports = todoRouter = express.Router();

// see all todo list
todoRouter.get("/", async (req, res) => {
  const { status, tag } = req.query;
  const userId = req.body.userId;
  const todo = await todoModel.findOne({ userId: userId });
  if (status == "pending") {
    try {
      const todo = await todoModel.find({ status: "pending" });
      res.send(todo);
    } catch (error) {
      res.send({ err: "Something went wrong" });
    }
  } else if (status == "done") {
    try {
      const todo = await todoModel.find({ status: "done" });
      res.send(todo);
    } catch (error) {
      res.send({ err: "Something went wrong" });
    }
  } else if (tag === "personal") {
    try {
      const todo = await todoModel.find({ tag: "personal" });
      res.send(todo);
    } catch (error) {
      res.send({ err: "Something went wrong" });
    }
  } else if (tag === "office") {
    try {
      const todo = await todoModel.find({ tag: "office" });
      res.send(todo);
    } catch (error) {
      res.send({ err: "Something went wrong" });
    }
  } else {
    try {
      if (userId !== todo.userId) {
        res.send("Not authorized");
      } else {
        let todos = await todoModel.find();
        res.send(todos);
      }
    } catch (error) {
      console.log("Error", error);
      res.send({ err: "Something went wrong" });
    }
  }
});

// create todo
todoRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const userId = req.body.userId;
  const todo = await todoModel.findOne({ userId: userId });

  try {
    if (userId !== todo.userId) {
      res.send("Not authorized");
    } else {
      await todoModel.create(payload);
      res.send({ msg: "todo created successfully" });
    }
  } catch (error) {
    res.send({ err: "Something went wrong" });
  }
});

// update todo
todoRouter.patch("/update/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.body.userId;
  const payload = req.body;
  const todo = await todoModel.findOne({ _id: todoId });
  //   const payload = req.body;
  try {
    if (userId !== todo.userId) {
      res.send("Not authorized");
    } else {
      await todoModel.findByIdAndUpdate({ _id: todoId }, payload);
      res.send({ msg: "todo updated successfully" });
    }
  } catch (error) {
    console.log("Error", error);
    res.send({ err: "Something went wrong" });
  }
});

// delete todo
todoRouter.delete("/delete/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.body.userId;
  const todo = await todoModel.findOne({ _id: todoId });
  try {
    if (userId !== todo.userId) {
      res.send("Not authorized");
    } else {
      await todoModel.findByIdAndDelete({ _id: todoId });
      res.send({ msg: "todo Deleted successfully" });
    }
  } catch (error) {
    console.log("Error", error);
    res.send({ err: "Something went wrong" });
  }
});
