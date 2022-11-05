const express = require("express")
const path = require("path")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

let toDisplay = ""
let checked = ""

app.get("/", (req, res) => {
    res.render('index',{toDisplay, checked})
})

app.post('/query',  function (req, res) {
        toDisplay = req.body.query
        checked = req.body.xssAttack
        res.redirect("/")
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})

