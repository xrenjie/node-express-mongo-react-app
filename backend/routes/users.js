const router = require("express").Router();
let User = require("../models/user.model");

//find existing user by username if exists
router.route("/find").get((req, res) => {
  User.find({ username: req.query.username })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//login if user already exists, otherwise insert new user into db
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

module.exports = router;
