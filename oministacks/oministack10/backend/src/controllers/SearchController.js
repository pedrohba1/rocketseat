const Dev = require("../models/Dev");
const StringToArray = require("../utils/StringToArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = StringToArray(techs);

    console.log(techsArray);

    const devs = await Dev.find({
      techs: {
        //operador lógico do mongo
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 // em metros
        }
      }
    });

    //busca todos os dev num raio (default: 10 km)

    //filtrar por tecnologias
    return res.json({ devs });
  }
};
