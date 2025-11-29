const express = require("express")
const cors = require("cors");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "World$Be$tProgrammer"

const app = express()
const users = []
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/signup", function(req, res) {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username,
        password
    })

    res.send({
        message: "You've successfully signed up:)"
    })
})

app.post("/signin", function(req, res) {
    const username = req.body.username
    const password = req.body.password

    let findUser = null

    for(let i=0; i<users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            findUser = users[i];
        }
    }

    if(!findUser) {
        res.json({
            message: "credentials incorrect"
        })
    } else {
        const token = jwt.sign({
        username
    }, JWT_SECRET)
    res.send({
        token: token
    })
    }
})

function auth(req, res, next) {
    const token = req.headers.token

    try {
        const decodeToken = jwt.verify(token, JWT_SECRET)
        req.user = decodeToken.username
        next()
    } catch(err) {
        res.status(401).json({message: "Authentication failed"})
    }
}

app.get("/me", auth, function(req, res) {
    let findUser = null
    const user = req.user

    for(let i=0; i < users.length; i++) {
        if(users[i].username === user) {
            findUser = users[i]
        }
    }

    res.json({
        username: findUser.username,
        password: findUser.password
    })
}) 

app.listen(3000)