const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/Users");
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mern');

app.get("/getUsers", (req, res) => {
    User.find({}, (err, foundResult) => {
        if (err) res.json(err);
        res.json(foundResult);
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => {
    console.log("Server is running Successfully on http://localhost:3001");
});