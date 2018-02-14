var mongoose = require('mongoose');
var mongoHost = '127.0.0.1:27017/blogs';

mongoose.connect('mongodb://' + mongoHost);
var db = mongoose.connection;
db.once('open', function() { console.log('Mongodb connection at %s successful', mongoHost) });
db.on('error', function() { console.error('Mongodb connection at %s failed', mongoHost) });

var articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	source: { type: String, required: true },
	author: { type: String, required: true },
	date: { type: Date, default: Date.now }
});

const ArticleModel = mongoose.model('article', articleSchema);

module.exports.ArticleModel = ArticleModel;