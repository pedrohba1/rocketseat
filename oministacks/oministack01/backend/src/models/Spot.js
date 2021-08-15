const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId, //é o id que o mongoose coloca automaticamente no banco
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//criando um virtualspot
SpotSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);
