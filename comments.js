// Create web server
// Load comments data from JSON file
// Create route for getting comments
// Create route for posting comments
// Start server

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  fs.readFile('./comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('./comments.json', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
        return;
      }
      res.status(201).send('Comment Added');
    });
  });
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});