const { mongo, default: mongoose } = require("mongoose");
const taskDb = require("./model/task");
const User = require("./model/user");
const auth = require("./routes/auth");
const taskroutes = require("./routes/task");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || "5000";
// instace of express
// connecting mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/DB"; // Fallback to local if not defined

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error: ", err));


app.get("/", (req, res) => {
    res.send("server is good");
})
app.use("/register", auth);
// this route is for the task crud operation.
app.use("/tasks", taskroutes);


app.listen(PORT, function () {
    console.log("server is runing");
})