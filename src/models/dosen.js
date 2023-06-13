const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dosenSchema = new Schema(
  {
    nama: { type: String, required: true },
    nip: { type: Number, required: true },
    umur: { type: Number, required: true },
    alamat: { type: String, required: true, default: "-" },
    gender: { type: String, required: true, default: "-" },
    // fakultas: {
    //   type: String,
    //   enum: ["fti", "fteknik", "fbe", "fteknikbiologi", "fisipol"],
    //   required: true,
    // },
    // jurusan: { type: String, required: true },
    mata_kuliah: { type: Array, required: true },
    tanggal_lahir: { type: String, required: true },
    username: {
      type: String,
      unique: [true, "username sudah digunakan!"],
      lowercase: true,
      required: [true, "Username perlu diisi!"],
    },
    password: { type: String, required: true },
    bidang_penelitian: Array,
    status_akun: { type: Boolean, required: true, default: false },
    jumlah_penelitian: { type: Number, required: true, default: 0 },
    mahasiswa_bimbingan: {
      type: Array,
      default: [],
    },
    img: String,
  },
  { timestamps: true }
);

const Dosen = mongoose.model("Dosen", dosenSchema);

module.exports = Dosen;

// {
//   "nama": "John Doe",
//   "nip": 123456,
//   "umur": 30,
//   "alamat": "123 Main Street",
//   "gender": "l",
//   "mata_kuliah": ["Math", "Physics", "Chemistry"],
//   "tanggal_lahir": "30-12-2000",
//   "username": "johndoe",
//   "password": "secretpassword",
//   "bidang_penelitian": ["Machine Learning", "Data Science"],
//   "img": "profile.jpg",
//   "jumlah_penelitian":6
// }
