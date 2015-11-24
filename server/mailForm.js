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
   console.log(req.body, req.body.subject, req.body.message);

    /*fs.readFile(path.join(__dirname, '/mailResources/promo.html'), 'utf8', function (err, html) {
        if (err) {
            return console.log(err);
        }
        mailjet.sendContent('pharma.mairie95310@gmail.com',
            [email],
            "Votre promo Suprapharm",
            'html',
            html.replace('#####', "http://omegasolutions.fr/pharma/products/" + src)
        );
        res.send(true);
    });*/
	res.send("Hello");
});

app.listen(3002);

console.log('Server started : http://localhost:3000/ ');
