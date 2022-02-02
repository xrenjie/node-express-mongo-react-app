const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    owner: { type: String, required: true },
    title: { type: String, required: true },
    items: { type: [String], required: false },
    users: { type: [String], required: false },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
