const modelProposal = require("../models/proposal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.createProposal = (req, res) => {
  const id_mahasiswa = req.body.id_mahasiswa;
  modelProposal
    .count({
      // $or: [{ status_proposal: "sudah_disetujui" }],
      $or: [{ id_mahasiswa, status_proposal: "sudah_disetujui" }],
    })
    .then((cnt) => {
      if (cnt > 0) {
        // res.statusMessage = 'NIP atau email sudah terdaftar';
        res.status(400).send("Proposal sudah disetujui");
        // .json({ success: false, message: 'NIP atau email sudah terdaftar' });
      } else {
        const newProposal = new modelProposal({
          id_mahasiswa: req.body.id_mahasiswa,
          judul: req.body.judul,
          link_proposal: req.body.link_proposal,
          status_proposal: "belum_disetujui",
          tanggapan: req.body.tanggapan,
        });
        newProposal.save(function (err) {
          if (err) res.send(err);
          else {
            res.status(201).send({
              message: "Berhasil menambahkan proposal",
              proposal: newProposal,
            });
          }
        });
      }
    })
    .catch((err) => res.send(err));
};

exports.updateOneMhs = (req, res) => {
  const tesObj1 = {};
  Object.entries(req.body).forEach(([key, value]) => {
    tesObj1[key] = value;
  });
  modelTA.updateOne(
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
