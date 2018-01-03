const wee = require('./wee.js')();
const fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
mongoose.Promise = global.Promise;
var Cat = mongoose.model('Cat', { name: String });
// const cluster = require('cluster');
// const numCPUs = require('os').cpus.length;
// var MongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/';
// import {isArray} from './isnot.js'
// import {a} from './demo'
// console.log(isArray);
wee.static('../static', 'img');
wee.use('/', function(req, res) {
  var kitty = new Cat({ name: 'Zildjian' });
  kitty.save(function (err) {
    if (err) {
      console.log(err);
    } else {

    }
  });


  res.writeHead(200, { 'Content-Tpye': 'text/html', 'Set-Cookie': 'myCookie="type=ninja"' });
  fs.ReadStream('../index.html').pipe(res);
});
wee.listen(8080);

