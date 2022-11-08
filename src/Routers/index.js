const express = require("express");
const User = require("../models");
const router = new express.Router();

router.post("/signup", async (req, res, next) => {
  // insert document
  const newUser = new User(req.body);
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
  await User.find({}, (err, docs) => {
    if (err) {
      return res.status(404).send(err);
    }

    return res.send(docs);
  });
});

module.exports = router;
