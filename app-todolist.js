var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieSession({
	secret: 'SUPERsekret'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var todos = ["first todo"];

app.get('/', function(req, res) {
	if(!req.session.todos) {
		req.session.name = "vivien test";
		req.session.todos = todos;
	}
	res.render('list.ejs', {todos: req.session.todos, name: req.session.name});
});

app.post('/create', function(req, res) {
	req.session.todos.push(req.body.todo);
	res.redirect('/');
});

app.get('/delete/:index', function(req, res) {
	req.session.todos.splice(req.params.index, 1);
	res.redirect('/');
});

app.listen(8090);
