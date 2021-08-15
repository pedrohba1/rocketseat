const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
//req.query = acesa query params para filtros.
//req.params acessa route params para edição e delete.
// no post, corpo está em req.body

const app = express();

//<username>:<password>@oministackrocketseat-shard-00-00-xdaff.mongodb.net:27017,oministackrocketseat-shard-00-01-xdaff.mongodb.net:27017,oministackrocketseat-shard-00-02-xdaff.mongodb.net:27017/admin?ssl=true&replicaSet=OminiStackRocketSeat-shard-0&authSource=admin&retryWrites=true&w=majority

mongoose.connect(
  "mongodb+srv://pedro1:derapf3l@oministackrocketseat-xdaff.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);
app.listen(3333);
