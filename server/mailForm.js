var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Mailjet = require('mailjet-sendemail'),
    app = express(),
    publicPath = path.join(__dirname, 'public');

var mailjet = new Mailjet('e5ba34606730214de84b5b356a160cac', 'd798165e707070e8e609e3555b2be263');

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/mailForm', function(req, res){
	console.log(req.body.email);
   	var email = req.body.email,
   	subject = req.body.subject,
   	message = req.body.message;

   	mailjet.sendContent(email,
        ['jonathan.souied@gmail.com'],
        subject,
        'html',
        message
    );
    res.send(true);
});

app.listen(3002);

console.log('Server started : http://localhost:3000/ ');
