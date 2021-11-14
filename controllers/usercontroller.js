const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Extract } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

//POST USER SIGNUP
router.post("/signup", function (req, res) {
  // const {
  //   firstname, lastname, username, email, passwordhash, role
  // } = req.body;

  User.create({
    firstname: req.body.user.firstname,
    lastname: req.body.user.lastname,
    username: req.body.user.username,
    email: req.body.user.email,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
    role: req.body.user.role
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        user: user,
        message: "User seccesfully created!",
        sessionToken: token,
      });
    }
    )
    .catch((err) => res.status(500).json({ error: err })
    );

    // .then(function createSuccess(user) {
    //   const token = jwt.sign({ id: user.id, email: user.email },
    //     process.env.JWT_SECRET, {
    //     expiresIn: 86400,
    //   });
    //   res.status(200).json({
    //     user,
    //     message: `Welcome ${username} !`,
    //     sessionToken: token,
    //   });
    // })
    // .catch((err) => res.status(500).json({ error: err }));
});

//POST USER LOGIN

router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.user.email } }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "Successfully authenticated.",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Passwords do not match." });
          }
        });
      } else {
        res.status(403).send({ error: "User not found." });
      }
  });
});

// router.post("/login", (req, res) => {
//   const { email, passwordhash } = req.body;
//   User.findOne({
//     where: { email: email },
//   })
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(passwordhash, user.passwordhash, (err, match) => {
//           if (match) {
//             const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//               expiresIn: 86400,
//             });
//             res.status(200).json({
//               user,
//               message: `User ${user.username} logged in!!`,
//               sessionToken: token,
//             });
//           } else {
//             res.status(502).send({ message: "Incorrect Password", err });
//           }
//         });
//       } else {
//         res.status(500).json({ message: "User does not exist" });
//       }
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "Something went wrong", err })
//     );
// });

// PUT USER UPDATE
router.put("/", validateSession, async (req, res) => {
  const { username, firstname, lastname, email, role } = req.body;
  const { id } = req.user;
  const updateUser = { username, firstname, lastname, email, role };
  const query = { where: { id } };
  try {
    const result = await User.update(updateUser, query);
    if (!result[0]) {
      res.status(403).json({ message: "Account not found" });
    } else {
      res.status(200).json({ message: `${username}'s profile has been updated!'` });
    }
  } catch (err) {
    res.status(500).json({ message: "Opps, something went wrong!", err });
  }
});

module.exports = router;
