const express = require('express'),
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

app.get('/blogs', (req, res) => {
	mongo.ArticleModel.find({}, null, { limit: 20 })
		.then(articles => res.render('index', { articles }))
		.catch(err => errorHandler(err));
	}
);

app.get('/blogs/:id', (req, res) => {
	mongo.ArticleModel.findById({ '_id': req.params.id })
		.then(result => res.send(result))
		.catch(err => errorHandler(err));
	}
);

app.post('/blogs', (req, res) => {
	const { title, content, source, author } = req.body;
	const article = new mongo.ArticleModel({ title, content, source, author });
	article.save()
		.then(result => res.send('Article added sucessfully'))
		.catch(err => errorHandler(err));
	}
);

app.put('/blogs/:id', (req, res) => {
	mongo.ArticleModel.update({ '_id': req.params.id }, { $set: req.body})
		.then(result => res.send('Article updated sucessfully'))
		.catch(err => errorHandler(err));
	}
);

app.delete('/blogs/:id', (req, res) => {
	mongo.ArticleModel.remove({ '_id': req.params.id })
		.then(result => res.send('Article deleted sucessfully'))
		.catch(err => errorHandler(err));
	}
);

app.all('*', function(req, res) {
	res.status(404).type('txt').send('Sorry, page not found');
});

const server = app.listen(8080, '127.0.0.1', function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at %s:%s", host, port);
});