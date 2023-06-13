const modelUser = require("../models/users");
exports.getAllUsers = (req, res) => {
  modelUser
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};
