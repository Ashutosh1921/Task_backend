const { mongo, default: mongoose } = require("mongoose");
const taskDb = require("./model/task");
const User = require("./model/user");
const auth = require("./routes/auth");
const taskroutes = require("./routes/task");
const express = require("express");
const app = express();
app.use(express.json());
// instace of express
// connecting mongodb
mongoose.connect("mongodb://localhost:27017/DB")
    .then(() => console.log("connect to db"))
    .catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("server is good");
})
app.use("/register", auth);
// this route is for the task crud operation.
app.use("/tasks", taskroutes);


app.listen(5000, function () {
    console.log("server is runing");
})