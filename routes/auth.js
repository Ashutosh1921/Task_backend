const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../model/user");

// handle a signin request
router.post("/", async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password);
    User.create(user)
        .then((user) => {
            console.log("user is added");
            console.log(typeof user);
            res.send({
                message: "user created successfully",
                user: user
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
})
router.post("/del", async (req, res) => {
    const user = req.body;
    if (user.command === process.env.PASS_DEL) {
        await User.deleteMany(({}));
        return res.send("all user deleted");
    }
})

module.exports = router;