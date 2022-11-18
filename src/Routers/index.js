const express = require("express");
const UserModal = require("../models/userModel");
const router = new express.Router();

router.post("/signup", async (req, res, next) => {
  // insert document
  const newUser = new UserModal(req.body);
  try {
    console.log("newUser", newUser);
    await newUser.save();
    res
      .status(201)
      .send({ message: "User Created sussessfully", data: newUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user", async (req, res, next) => {
  await UserModal.find({}, (err, docs) => {
    if (err) {
      return res.status(404).send(err);
    }

    return res.send(docs);
  });
});

module.exports = router;
