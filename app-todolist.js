var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieSession({
	name: "session",
	keys: ['key1', 'key2']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var todos = ["first todo"];

app.get('/', function(req, res) {
	res.render('list.ejs', {todos: todos});
});

app.post('/create', function(req, res) {
	todos.push(req.body.todo);
	res.redirect('/');
});

app.get('/delete/:index', function(req, res) {
	todos.splice(req.params.index, 1);
	res.redirect('/');
})

app.listen(8080);
