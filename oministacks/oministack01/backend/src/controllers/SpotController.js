const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;
    const spots = await Spot.find({ techs: tech });
    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers; //a informação de usuário vai no header

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "user non ecziste" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(",").map(tech => tech.trim()),
      price // isso equivale à price:price, os outros a mesma coisa
    });

    return res.json(spot);
  }
};
