var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.status(200).send('<h1>Hello World!</h1>');
  });

app.get('/:name', function(req, res) {
    var name = req.params.name;
    
    res.type('html').send('Hello ' + name);
});

if (require.main === module) {    
    app.listen(4000, function() {
        console.log( 'The server is up!' );
    }
 );
    
} else {
    module.exports = app;   
}
