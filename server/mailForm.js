var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Mailjet = require('mailjet-sendemail'),
    app = express(),
    publicPath = path.join(__dirname, 'public'),
    mailJetId = require('./mailJetId');

var mailjet = new Mailjet(mailJetId.key1, mailJetId.key2);

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/mailForm', function(req, res){
   	var email = req.body.email,
   	subject = req.body.subject,
   	message = req.body.message;

   	mailjet.sendContent("jonathan.souied@gmail.com",
        ['jonathan.souied@gmail.com'],
        subject,
        'html',
        '<div>Message from ' + email + '</div><div>' + message + '</div>'
    );
    res.send(true);
});

app.listen(3002);

console.log('Server started : http://localhost:3000/ ');
