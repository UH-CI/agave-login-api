// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const consumerKey ="";
const consumerSecret ="";
const port = 8000;
const uri ="agaveauth.its.hawaii.edu";
var querystring = require('querystring');
var https = require('https')

var fs = require("fs");
var hskey = fs.readFileSync('self-signed.key');
var hscert = fs.readFileSync('self-signed.crt')
var options = {
    key: hskey,
    cert: hscert
};

var server = https.createServer(options,app)
//var io = require('socket.io').listen(server);
// listen for new web clients:
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST to login and return the tokens and referesh token
app.post('/login', function (req, res)  {
   var results = '';
   var data = querystring.stringify({ grant_type: "password", username: req.query.username, password: req.query.password,
        scope:"PRODUCTION", callbackUrl: "http://localhost:8000" });
//  console.log(data)

   var auth_string = consumerKey + ':' + consumerSecret;
   var b64_auth_string = 'Basic ' + Buffer.from(auth_string).toString('base64');//.toString('base64');

   var options = {
      rejectUnauthorized: false,
      hostname: uri,
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {'Authorization': b64_auth_string, 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)}
    };

    var request =  https.request(options, function(response) {
      console.log('Status: ' + res.statusCode);
      console.log('Headers: ' + JSON.stringify(res.headers));
      response.setEncoding('utf8');
      response.on('data', function (body) {
        console.log('Body: ' + body);
        results=body;
        res.send(results)
      });
      response.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        res.send(results)
      });
    });

    request.write(data);


})

/*app.listen(port, () => {
  console.log('We are live on ' + port);
});*/
