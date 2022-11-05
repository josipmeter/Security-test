const express = require("express")
const path = require("path")
const dotenv = require("dotenv")

const app = express();

dotenv.config()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

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

if (externalUrl) {
  const hostname = '127.0.0.1';
  app.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
  });
}
else{
  app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})}
