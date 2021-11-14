const User = require("./user");
const Extract = require("./extract");
const Image = require("./image");
// create individual files for your models and import them here

// Setup Associations

//USER & EXTRACT
Extract.belongsTo(User)
User.hasMany(Extract)

//IMAGE
Image.belongsTo(User)
User.hasMany(Image)

module.exports = {
  User,
  Extract,
  Image,
};
