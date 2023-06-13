const modelUser = require("../models/users");
const modelMhs = require("../models/mahasiswa");
const modelDsn = require("../models/dosen");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.getAllUser = (req, res) => {
  modelUser
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.registerUser = (req, res) => {
  modelUser
    .count({
      $or: [{ nip: req.body.nip }, { email: req.body.email }],
    })
    .then((cnt) => {
      if (cnt > 0) {
        // res.statusMessage = 'NIP atau email sudah terdaftar';
        res.status(400).send("NIP atau email sudah terdaftar");
        // .json({ success: false, message: 'NIP atau email sudah terdaftar' });
      } else {
        const newUser = new modelUser({
          nama: req.body.nama,
          nip: req.body.nip,
          email: req.body.email,
          role: req.body.role,
          password: bcrypt.hashSync(req.body.password, 10),
        });
        newUser.save(function (err) {
          if (err) res.send(err);
          else {
            const token = jwt.sign(
              { user_id: newUser._id, email: newUser.email },
              process.env.SECRET_KEY_CONFIG,
              {
                expiresIn: "90d",
              }
            );
            newUser.token = token;
            res.status(201).send({
              message: "Berhasil daftar",
              user: newUser,
              token: token,
            });
          }
        });
      }
    })
    .catch((err) => res.send(err));
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await modelUser.findOne({ email });

    if (user && (await bcrypt.compareSync(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY_CONFIG,
        {
          expiresIn: "90d",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {}
};

exports.loginMhs = async (req, res) => {
  try {
    const { nim, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await modelUser.findOne({ email });

    if (user && (await bcrypt.compareSync(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY_CONFIG,
        {
          expiresIn: "90d",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {}
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send("Masukkan username dan password");
  }
  Promise.all([
    modelMhs.findOne({ username }).exec(),
    modelDsn.findOne({ username }).exec(),
  ])
    .then(([userA, userB]) => {
      const user = userA || userB;

      if (user && bcrypt.compareSync(password, user.password)) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.SECRET_KEY_CONFIG,
          {
            expiresIn: "90d",
          }
        );

        // save user token
        user["token"] = token;

        if (user?.nim !== undefined) {
          role = "mhs";
        } else if (user?.nip !== undefined) {
          role = "dsn";
        }
        // user
        res.status(200).json({
          role,
          username: user.username,
          nama: user.nama,
          _id: user._id,
          token: user.token,
        });
      } else {
        // User not found in either group
        res.status(404).json({ message: "Username atau Password salah" });
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the search
      res.status(500).json({ message: "Akun tidak ditemukan" });
    });
};

exports.requestResetPassword = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await modelMhs.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = user.email === email;
    console.log(isMatch);
    if (isMatch) {
      let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "29de6091492312",
          pass: "c6db1950127494",
        },
      });
      const newPassword = Math.random().toString(36).slice(-8);
      let requestReset = await transport.sendMail({
        from: "Admin@sad4wuithn.com",
        to: req.body.email,
        subject: "Reset Password",
        text: "Reset Password",
        html: `<h1>Reset Password</h1><br/>
        <p>Silahkan login dengan password baru: ${newPassword}</p>`,
      });
      console.log("Message sent: %s", requestReset.messageId);
      res.status(200).send({
        message: `Permintaan reset password telah dikirim ke ${email}`,
        email: email,
        messageId: requestReset.messageId,
      });
    } else {
      res.status(404).json({ error: "Email tidak sama dengan yang terdaftar" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
