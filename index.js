const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 3000
dotenv.config();

app.use(logger("dev"));
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());

const playersRouter = require('./routes/players')
app.use("/players", playersRouter);

const run = require("./database");
run().catch(console.error);

app.get("/", (req, res) => {
    res.status(200).send("HI!!! Welcome to the home page");
})

app.listen(port, () => {
    console.log('The server is listening on port', port);
});

module.exports = app;
