const express = require("express");

const server = express();

//query params = ?teste=1
//route params = /users/1
//request body = {}

//CRUD = create, read, update, delete

server.use(express.json());

//middleware de log da aplicação para cada requisição
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method}; URL: ${req.url}`);
  next();

  console.timeEnd("Request");
});

const users = ["jonas", "joesley", "robson"];

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json("user not found on req.body");
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json("user does not exist");
  }

  req.user = user;

  return next();
}

server.get("/users", checkUserInArray, (req, res) => {
  return res.json(users);
});

server.get("/user/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExist, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen(3333);
