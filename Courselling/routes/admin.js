const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "world$be$tprogrammer";
const zod = require("zod");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db");

const app = express();
app.use(express.json());

adminRouter.post("/signup", async function(req, res) {
    const requireBody = zod.object({
        email: zod.email().min(5).max(100),
        password: zod.string().min(4).max(100),
        firstName: zod.string().min(3).max(100)
    })

    const parseData = requireBody.safeParse(req.body);

    if(!parseData.success) {
        res.json({
            message: "Incorrect data format",
            error: parseData.error
        });
    }

    const { email, password, firstName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    try{
        await AdminModel.create({ email, password: hashedPassword, firstName})
    }
    catch(error) {
        res.json({
            message: "User already exist"
        });
    }

    res.json({
        message: "You are signed up successfully"
    })
});

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await AdminModel.findOne({ email });

    if(!user) {
        res.json({ message: "Invalid Credentials "})
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET)
        
        res.json({
            token,
            message: "You are signed in!"
        });
    }
    else {
        res.status(403).json({ message: "Invalid Credentials!" });
    }
});

adminRouter.post("/", function(req, res) {

});

adminRouter.put("/", function(req, res) {

});

adminRouter.delete("/", function(req, res) {

});

adminRouter.get("/bulk", function(req, res) {

});

module.exports = {
    adminRouter: adminRouter
}