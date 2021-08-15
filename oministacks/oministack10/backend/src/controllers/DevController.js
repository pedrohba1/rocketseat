const axios = require("axios");
const Dev = require("../models/Dev");
const StringToArray = require("../utils/StringToArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  //show

  //update
  async update(req, res) {
    //atualizar apenas a localização,avatar, nome, bio, e techs
    //1- pegar o github username do usuário.
    const { _id } = req.body;
    let updateValues = req.body;

    console.log(updateValues);
    updateValues.techs = StringToArray(updateValues.techs);
    //2- atualizar os dados do usuário, de acordo com as inforamções que foram
    //enviadas no body

    Dev.updateOne({ _id }, { $set: updateValues }, function(
      err,
      affected,
      resp
    ) {
      console.log(resp);
    });

    return res.json("update com sucesso");
  },

  //destroy
  async destroy(req, res) {
    const { _id } = req.body;
    console.log(req.body);
    const removedDev = await Dev.findById(_id);
    let msg;
    Dev.deleteOne({ _id }, function(err) {
      if (!err) {
        msg = true;
      } else {
        msg = false;
      }
    });
    return res.json(removedDev);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const apires = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apires.data;

      const techsArray = StringToArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  }
};
