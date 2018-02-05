var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/blogs', function (req, res) {
	res.render('index', {});
});

app.get('/blogs/:id', function (req, res) {
	res.send('This is get request for blogId:' + req.params.id);
});

app.post('/blogs', function (req, res) {
	res.send('This is post request for blogs');
});

app.put('/blogs/:id', function (req, res) {
	res.send('This is put request for blogId:' + req.params.id);
});

app.delete('/blogs/:id', function (req, res) {
	res.send('This is delete request for blogId:' + req.params.id);
});

app.all('*', function(req, res) {
	res.status(404).type('txt').send('Sorry, page not found');
});

var server = app.listen(8080, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});