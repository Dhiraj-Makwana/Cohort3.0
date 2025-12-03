const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const Todo = new Schema({
    UserId: ObjectId,
    title: String,
    done: { type: Boolean, default: false},
    createAt: { type: Date, default: Date.now },
    deadline: { type: Date }
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
};