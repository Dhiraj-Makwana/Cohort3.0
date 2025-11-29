const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "User_app";
app.use(express.json());

const users = [];

function generateToken() {
    let token = '';
    const options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for(let i=0; i<=34; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }

    return token;
}

app.post("/signup", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.send({
        message: "You have signed up"
    })
});

app.post("/signin", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);
        //const token = generateToken();
        user.token = token;
        res.send({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

app.get("/me", (req,res) => {
    const token = req.headers.authorization;
    const userDetails = jwt.verify(token, JWT_SECRET)

    const username = userDetails.username;
    const user = users.find(u => u.username === username) 
    //const user = users.find(u => u.token === token)

    if(user) {
        res.send({
            username: user.username,
            password: user.password
        })
    } else {
        res.status(401).send({
            message:"Unauthorized"
        })
    }
})

app.listen(3000);