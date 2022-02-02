const router = require("express").Router();
let List = require("../models/list.model");

router.route("/").get((req, res) => {
  List.find()
    .then((lists) => res.json(lists))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username").get((req, res) => {
  List.find({ users: req.params.username })
    .then((lists) => res.json(lists))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const owner = req.body.owner;
  const title = req.body.title;
  const items = [];
  const users = [req.body.owner];

  const newList = new List({
    owner,
    title,
    items,
    users,
  });

  newList
    .save()
    .then(() => res.json("List added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  List.findById(req.params.id)
    .then((list) => res.json(list))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  List.findByIdAndDelete(req.params.id)
    .then(() => res.json("List deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  List.findById(req.params.id)
    .then((list) => {
      list.items = req.body.items;
      list.users = req.body.users;
      list.title = req.body.title;

      list
        .save()
        .then(() => res.json("List updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
