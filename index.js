const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const ESAPI = require('node-esapi');
const app = express();
const { auth } = require('express-openid-connect');

dotenv.config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'vrel4nRkW6gaJONGdK4RF53zQXpbwfrV',
  issuerBaseURL: 'https://dev-rnrkynepkbpmq6qo.us.auth0.com'
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")
app.use(auth(config));

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

let toDisplay = ""
let checkedXss = ""
let checkedBac = { name: "" };

app.get("/", (req, res) => {
    res.render('index',{toDisplay, checkedXss})
})

app.post('/query',  function (req, res) {
        toDisplay = req.body.query
        checkedXss = req.body.xssAttack
        checkedBac.name = req.body.bacAttack
        res.redirect("/")
});

app.get("/logged", (req, res) => {
  if(checkedBac.name==="bacAttack" || req.oidc.isAuthenticated()){
    res.render('logged')
  }
  else{
    res.status(401);
    res.send('You are not authorized');
  }
})




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
