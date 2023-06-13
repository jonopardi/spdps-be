const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const proposalSchema = new Schema(
  {
    judul: { type: String, required: true },
    link_proposal: { type: String, required: true },
    id_mahasiswa: { type: String, required: true, default: "-" },
    tanggapan: { type: String, required: true, default: "-" },
    status_proposal: {
      type: String,
      required: true,
      enum: ["belum_disetujui", "sudah_disetujui", "ditolak"],
      default: "-",
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
