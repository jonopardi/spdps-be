const modelMhs = require("../models/mahasiswa");
const modelDsn = require("../models/dosen");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.updateOneMhs = (req, res) => {
  const tesObj1 = {};
  Object.entries(req.body).forEach(([key, value]) => {
    tesObj1[key] = value;
  });
  tesObj1["status_akun"] = true;
  modelMhs.updateOne(
    { _id: req.params._id },
    tesObj1,
    { useFindAndModify: true },
    (err) => {
      if (!err) {
        res.send("Berhasil ubah data");
      } else {
        res.send(err);
      }
    }
  );
};

exports.updateOneDsn = (req, res) => {
  const tesObj1 = {};
  Object.entries(req.body).forEach(([key, value]) => {
    tesObj1[key] = value;
  });
  tesObj1["status_akun"] = true;
  modelDsn.updateOne(
    { _id: req.params._id },
    tesObj1,
    { useFindAndModify: true },
    (err) => {
      if (!err) {
        res.send("Berhasil ubah data");
      } else {
        res.send(err);
      }
    }
  );
};
