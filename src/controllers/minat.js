const modelMinat = require("../models/minat");

exports.getMinat = (req, res) => {
  modelMinat.find().then((result) => {
    res.send(result);
  });
};

exports.addMinat = (req, res) => {
  const minatBody = req.body.minat;
  const minat = minatBody.toLowerCase().replace(/\s+/g, "_");

  const uploadMinat = new modelMinat({
    minat: minat,
  });
  modelMinat
    .findOne({ minat: { $in: minat } })
    .then((existingMinat) => {
      if (existingMinat) {
        return res.status(400).json({ error: "Minat sudah ada!" });
      }
      modelMinat
        .findOneAndUpdate(
          {},
          { $addToSet: { minat: minat } },
          { new: true, upsert: true }
        )
        .then((updatedCar) => {
          res.status(200).json(updatedCar);
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to update car" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Query DB gagal!" });
    });
};

exports.updateOneMinat = (req, res) => {
  const { index, newMinat } = req.body;
  console.log(index, newMinat);

  const itemId = req.params._id;

  modelMinat
    .findOneAndUpdate(
      { _id: itemId },
      { $set: { [`minat.${index}`]: newMinat } },
      { new: true }
    )
    .then((latestMinat) => {
      res
        .status(200)
        .json({ message: "Minat updated successfully", latestMinat });
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while updating minat" });
    });
};

exports.deleteMinat = (req, res) => {
  const { minat_to_delete } = req.body;
  const itemId = req.params._id;
  // modelMinat
  //   .updateOne({ _id: itemId }, { $unset: { [arrIndex]: 1 } })
  //   .then(() => {
  //     modelMinat.updateOne({ _id: itemId }, { $pull: { arName: null } });
  //   })
  //   .then(() => {
  //     res.send("Berhasil hapus minat");
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });

  modelMinat
    .updateOne({ _id: itemId }, { $pull: { minat: minat_to_delete } })
    .then(() => {
      res.send("Berhasil hapus minat");
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
