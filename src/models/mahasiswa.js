const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mahasiswaSchema = new Schema(
  {
    nama: { type: String, required: true },
    nim: { type: Number, required: true },
    email: { type: String, required: true, default: "-" },
    umur: { type: Number, required: true },
    alamat: { type: String, required: true, default: "-" },
    gender: { type: String, default: "-", required: true },
    semester: { type: Number, required: true, default: 0 },
    fakultas: {
      type: String,
      enum: ["fti", "fteknik", "fbe", "fteknikbiologi", "fisipol"],
      required: true,
    },
    jurusan: {
      type: String,
      enum: [
        "inf",
        "si",
        "ti",
        "manajemen",
        "akuntansi",
        "ts",
        "arsitektur",
        "biologi",
        "hukum",
        "sosiologi",
        "ilkom",
        "ep",
      ],
      required: true,
    },
    tanggal_lahir: { type: String, required: true },
    username: {
      type: String,
      unique: [true, "username sudah digunakan!"],
      lowercase: true,
      required: [true, "Username perlu diisi!"],
    },
    password: { type: String, required: true },
    status_akun: { type: Boolean, required: true, default: false },
    status_skripsi: {
      type: String,
      enum: [
        "belum_mengajukan_proposal",
        "menunggu_verifikasi_proposal",
        "proposal_diverifikasi",
        "proposal_ditolak",
      ],
      required: true,
      default: "belum_mengajukan_proposal",
    },
    minat_skripsi: {
      type: Array,
      default: [],
    },
    img: {
      type: String,
      default: "https://i.ibb.co/0Vhkm3f/icons8-customer-500.png",
    },
    id_penelitian: { type: String, required: true, default: "-" },
    dospem1: { type: String, required: true, default: "-" },
    dospem2: { type: String, required: true, default: "-" },
  },
  { timestamps: true }
);

const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema);

module.exports = Mahasiswa;
