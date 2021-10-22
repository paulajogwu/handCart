const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const session = require('express-session')

var cors = require('cors')

// import config
const db = require('./database');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())



app.use(express.static(__dirname + '/public'));

const userRoute = require('./routes/userRouter');



app.use('/api/v1/banking', userRoute);


if (process.env.NODE_ENV === 'production'){
    //app.use(express.static('frontend/build'));
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page 
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});



var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at  http://localhost:" + port);

});