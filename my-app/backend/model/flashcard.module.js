const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  groupName: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  cards:{
    type:Array  
  }
});

const cardModel = mongoose.model("Card", cardSchema);

module.exports = {
  cardModel
};
