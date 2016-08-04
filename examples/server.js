var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');
var cors = require('cors')
var FroalaEditor = require('../lib/editor.js');

app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.post('/upload_image', function (req, res) {

  FroalaEditor.Image.upload(req, null, function(err, data) {

    if (err) {
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
});

app.post('/upload_file', function (req, res) {

  FroalaEditor.File.upload(req, null, function(err, data) {

    if (err) {
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
});

app.post('/delete_image', function (req, res) {

  FroalaEditor.Image.delete(req.body.src, function(err) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.end();
  });
});

app.post('/delete_file', function (req, res) {

  FroalaEditor.File.delete(req.body.src, function(err) {
    
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.end();
  });
});

app.get('/load_images', function (req, res) {

  FroalaEditor.Image.list('/uploads/', function(err, data) {
    
    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.send(data);
  });
});

app.get('/get_amazon_v2_configs', function (req, res) {

  var configs = {
    bucket: 'cefaciboss',
    region: 's3',
    keyStart: 'editor/',
    acl: 'public-read',
    awsAccessKey: '',
    awsSecretAccessKey: ''
  }

  var configsObj = FroalaEditor.S3.getConfigsObjForV2(configs);
  res.send(configsObj);
});

app.get('/get_amazon_v4_configs', function (req, res) {

  var configs = {
    bucket: 'popescu-test',
    region: 's3-eu-central-1',
    keyStart: 'editor/',
    acl: 'public-read',
    awsAccessKey: '',
    awsSecretAccessKey: ''
  }

  var configsObj = FroalaEditor.S3.getConfigsObjForV4(configs);
  res.send(configsObj);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});