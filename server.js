// server.js
const express        = require('express');
var cors = require('cors')
const bodyParser     = require('body-parser');
const app            = express();

var configFile = require('./config.js');

app.use(cors());
const consumerKey =configFile.consumer_key;
const consumerSecret =configFile.consumer_secret;

var white_list = configFile.white_list;

const port = configFile.auth_port;
const uri =configFile.tenant_url;
var querystring = require('querystring');
var https = require('https')

var fs = require("fs");
var hskey = fs.readFileSync('ca.key');
var hscert = fs.readFileSync('ca.crt');
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

// POST to login and return the tokens and refresh token
app.post('/login', function (req, res)  {
   if (white_list.indexOf(req.query.username) > -1 || white_list.indexOf('*') > -1){
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
  	      res.send(body)
        });
        response.on('error', function(e) {
          console.log('problem with request: ' + e.message);
          res.send(e)
        });
      });
      request.write(data);
    }
    else{
      res.send("{'error':'Incorrect Login Credentials or Permissions.'}")
    }
})

// POST to refresh and return the tokens and refresh token
app.post('/refresh', function (req, res)  {
     var data = querystring.stringify({ grant_type: "refresh_token", refresh_token: req.query.refresh_token,
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
  	      res.send(body)
        });
        response.on('error', function(e) {
          console.log('problem with request: ' + e.message);
          res.send(e)
        });
      });
      request.write(data);
})
/*app.listen(port, () => {
  console.log('We are live on ' + port);
});*/
