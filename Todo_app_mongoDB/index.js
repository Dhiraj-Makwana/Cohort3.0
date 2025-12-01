const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "World$Be$tProgrammer";
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");

mongoose.connect("mongodb+srv://mrincident265_db_user:poAdMa4BPIiRgJfN@cluster0.jl6xp7n.mongodb.net/todo-test")
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    res.json({
        message: "You are signed up successfully"
    });
});

app.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    if(user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});

app.post("/todo", function(req, res) {

});

app.get("/todos", function(req, res) {

});

app.listen(3000);