const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require ('./controllers/register');
const signin = require ('./controllers/signin')
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

// connect to your own database here
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "gprs9708",
    database: "smart-brain",
  },
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  
});

// dependency injection approach
app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
