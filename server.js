var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/view"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

lex = require('./lex');

app.post('/send', function(req,res){
	var contentType = req.get('Content-Type');
	var body, acceptContentType;

	if(contentType.indexOf('audio') >= 0){
		contentType = 'audio/l16; rate=16000; channels=1';
		acceptContentType =  'audio/mpeg';
		body = req.body;
	}else{
		contentType = 'text/plain; charset=utf-8';
		acceptContentType = 'text/plain; charset=utf-8';
		body = req.body.text;
	}

	lex(body, contentType, acceptContentType, 'testUser01').then(function(data){
		res.send(data);
	}, function(err){
		console.log(err, err.stack);
		res.sendStatus(400);
	});
});

app.listen(3000, function(){
	console.log("listening on port 3000");
});