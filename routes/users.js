const express = require("express");
const router = express.Router();
const User = require("../models/User");

/** Get ALL Users */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ success: true, data: users });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
});

/** get user by ID */

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error,
    });
  }
});

// add a new user

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    userName: req.body.userName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    active: true,
  });

  try {
    const newUser = await user.save();
    res.send({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
});

// update a user

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(500).send({ success: false, error: "User not found" });
    }

    res.send({ success: true, data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// delete user

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req);
  try {
    await User.findByIdAndDelete(id);
    res.send({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;
