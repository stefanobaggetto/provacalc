var express = require('express');
var bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


ar port = process.env.PORT || 8080;

var router = express.Router();

router.route('/sum')
.get(function (req, res) {
    var x = parsefloat(req.query.x);
    var y = parsefloat(req.query.y);
    var r = x + y;
    res.json(r);
    res.status = 200;
    });

router.route('/muliply')
.get(function (req, res) {
    var x = parsefloat(req.query.x);
    var y = parsefloat(req.query.y);
    var r = x * y;
    res.json(r);
    res.status = 200;
    });


app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

// register our router on /api
app.use('/api', router);

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});


app.listen(port);
console.log('Magic happens on port ' + port);