var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	jade = require('jade'),
	mongo = require('./mongoConnector');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');
app.set('views', './views');

function errorHandler(err) {
	res.send('Something went wrong, sorry');
	console.log(err);
	return false;
}

app.get('/blogs', function (req, res) {
	var articles = mongo.ArticleModel.find({}, null, { limit: 20 }, function (err, articles) {
		if (err) return errorHandler(err);
		res.render('index', { articles: articles });
	});
});

app.get('/blogs/:id', function (req, res) {
	mongo.ArticleModel.findById({ '_id': req.params.id }, function (err, result) {
		errorHandler(err);
		res.send(result);
	});
});

app.post('/blogs', function (req, res) {
	var article = new mongo.ArticleModel({
		title: req.body.title,
		content: req.body.content,
		source: req.body.source,
		author: req.body.author
	});
	article.save(function (err) {
		if (err) return errorHandler(err);
		res.send('Article saved sucessfully');
	});
});

app.put('/blogs/:id', function (req, res) {
	mongo.ArticleModel.update({ '_id': req.params.id }, { $set: req.body}, function (err) {
		if (err) return errorHandler(err);
		res.send('Article updated sucessfully');
	});
});

app.delete('/blogs/:id', function (req, res) {
	mongo.ArticleModel.remove({ '_id': req.params.id }, function (err) {
		if (err) return errorHandler(err);
		res.send('Article deleted sucessfully');
	});
});

app.all('*', function(req, res) {
	res.status(404).type('txt').send('Sorry, page not found');
});

var server = app.listen(8080, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at %s:%s", host, port);
});