const modelMhs = require("../models/mahasiswa");
const modelDsn = require("../models/dosen");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.getAllUser = (req, res) => {
  modelMhs
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.createMhs = (req, res) => {
  const ttl = req.body.tanggal_lahir;
  const parsedDate = moment(ttl, "DD-MM-YYYY");
  const umur = moment().diff(parsedDate, "years", false);
  modelMhs
    .count({
      $or: [{ nim: req.body.nim }],
    })
    .then((cnt) => {
      if (cnt > 0) {
        // res.statusMessage = 'NIP atau email sudah terdaftar';
        res.status(400).send("NIM sudah terdaftar");
        // .json({ success: false, message: 'NIP atau email sudah terdaftar' });
      } else {
        const newUser = new modelMhs({
          nama: req.body.nama,
          nim: req.body.nim,
          umur: umur,
          fakultas: req.body.fakultas,
          jurusan: req.body.jurusan,
          tanggal_lahir: req.body.tanggal_lahir,
          username: req.body.nim,
          password: bcrypt.hashSync(req.body.tanggal_lahir, 10),
        });
        newUser.save(function (err) {
          if (err) res.send(err);
          else {
            res.status(201).send({
              message: "Berhasil daftar",
              user: newUser,
            });
          }
        });
      }
    })
    .catch((err) => res.send(err));
};

exports.createDsn = (req, res) => {
  const ttl = req.body.tanggal_lahir;
  const parsedDate = moment(ttl, "DD-MM-YYYY");
  const umur = moment().diff(parsedDate, "years", false);

  const imgBody = req.body.img;
  const defaultImage = "https://i.ibb.co/0Vhkm3f/icons8-customer-500.png";
  const img = imgBody || defaultImage;
  modelDsn
    .count({
      $or: [{ nip: req.body.nip }],
    })
    .then((cnt) => {
      if (cnt > 0) {
        // res.statusMessage = 'NIP atau email sudah terdaftar';
        res.status(400).send("NIP sudah terdaftar");
        // .json({ success: false, message: 'NIP atau email sudah terdaftar' });
      } else {
        const newUser = new modelDsn({
          nama: req.body.nama,
          nip: req.body.nip,
          umur: umur,
          // alamat: req.body.alamat,
          // gender: req.body.gender,
          // fakultas: req.body.fakultas,
          // jurusan: req.body.jurusan,
          // mata_kuliah: req.body.mata_kuliah,
          tanggal_lahir: req.body.tanggal_lahir,
          username: req.body.nip,
          // bidang_penelitian: req.body.bidang_penelitian,
          // jumlah_penelitian: req.body.jumlah_penelitian,
          // mahasiswa_bimbingan: req.body.mahasiswa_bimbingan,
          img: img,
          password: bcrypt.hashSync(req.body.tanggal_lahir, 10),
        });
        newUser.save(function (err) {
          if (err) res.send(err);
          else {
            res.status(201).send({
              message: "Berhasil daftar",
              user: newUser,
            });
          }
        });
      }
    })
    .catch((err) => res.send(err));
};

// exports.createMhs = (req, res) => {
//   const ttl = req.body.tanggal_lahir;
//   const parsedDate = moment(ttl, "DD-MM-YYYY");
//   const umur = moment().diff(parsedDate, "years", false);
//   modelMhs
//     .count({
//       $or: [{ nim: req.body.nim }],
//     })
//     .then((cnt) => {
//       if (cnt > 0) {
//         // res.statusMessage = 'NIP atau email sudah terdaftar';
//         res.status(400).send("NIM sudah terdaftar");
//         // .json({ success: false, message: 'NIP atau email sudah terdaftar' });
//       } else {
//         const newUser = new modelMhs({
//           nama: req.body.nama,
//           nim: req.body.nim,
//           umur: umur,
//           alamat: req.body.alamat,
//           gender: req.body.gender,
//           semester: req.body.semester,
//           fakultas: req.body.fakultas,
//           jurusan: req.body.jurusan,
//           tanggal_lahir: req.body.tanggal_lahir,
//           username: req.body.nim,
//           minat_skripsi: req.body.minat_skripsi,
//           img: req.body.img,
//           password: bcrypt.hashSync(req.body.tanggal_lahir, 10),
//         });
//         newUser.save(function (err) {
//           if (err) res.send(err);
//           else {
//             const token = jwt.sign(
//               { user_id: newUser._id, username: newUser.username },
//               process.env.SECRET_KEY_CONFIG,
//               {
//                 expiresIn: "90d",
//               }
//             );
//             newUser.token = token;
//             res.status(201).send({
//               message: "Berhasil daftar",
//               user: newUser,
//               token: token,
//             });
//           }
//         });
//       }
//     })
//     .catch((err) => res.send(err));
// };
