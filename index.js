var express = require('express');
var app = express();
var http = require('http').Server(app);

//When we get a req for a static file, respond with that folder in it.
app.use(express.static(__dirname + '/public'));

//Request on the root route
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Hey man, I'm listening on the *3000 port");
});