const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const Admin = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    ImageUrl: String,
    creatorId: ObjectId
});

const Purchase = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admins", Admin);
const CourseModel = mongoose.model("courses", Course);
const PurchaseModel = mongoose.model("puchases", Purchase);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}