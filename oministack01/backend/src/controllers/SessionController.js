//index, show, store, update, destroy

//index = retorna uma lista de sessões
//show = lista uma única sessão
//store = criar uma sessão
//update = alterar uma sessão
//destroy = destruir umna sessão

const User = require("../models/User");

module.exports = {
  //a função store é assíncrona
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({ email: email });
    }
    //o await só deixa eu seguir pra próxima quando o cadastro no banco for realizado, ou seja
    //quando User.create terminar
    return res.json(user);
  }
};
