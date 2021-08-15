const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes.js");
const app = express();
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://pedrohba18:derapf3l@cluster0-gy3kt.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);

//get, put, delete
//put: atualização de campos
//get: requisição get para o navegador
// get geralmente usa query params: req.query (filtros, ordenação, paginação...)
// req.params (identificar recursos na alteração ou remoção)
// req.body (dados para a criação ou alteração de um registro)
