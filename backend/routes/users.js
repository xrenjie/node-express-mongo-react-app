const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//for adding user to list
router.route("/find").get((req, res) => {
  User.find({ username: req.query.username })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//for login/signup
router.route("/login").get((req, res) => {
  const username = req.query.username;
  User.find({ username: req.query.username }).then((users) => {
    if (users.length == 0) {
      const newUser = new User({ username });

      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else res.json(users);
  });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
