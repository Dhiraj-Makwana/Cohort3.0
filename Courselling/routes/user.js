const { Router } = require("express");
const userRouter = Router();
require("dotenv").config();
const { UserModel } = require("../db");
const zod = require("zod");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async function(req, res) {
    const requireBody = zod.object({
        email: zod.email().min(5).max(100),
        password: zod.string().min(4).max(100),
        firstName: zod.string().min(3).max(100),
        lastName: zod.string().min(3).max(100)
    })

    const parseData = requireBody.safeParse(req.body);

    if(!parseData.success) {
        res.json({
            message: "Incorrect data format",
            error: parseData.error
        });
    }

    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    try{
        await UserModel.create({ email, password: hashedPassword, firstName, lastName})
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

userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if(!user) {
        res.json({ message: "Invalid Credentials "})
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET_User)
        
        res.json({
            token,
            message: "You are signed in!"
        });
    }
    else {
        res.status(403).json({ message: "Invalid Credentials!" });
    }
});

userRouter.get("/purchases", function(req, res) {

});

module.exports = {
    userRouter: userRouter
}