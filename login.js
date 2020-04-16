var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '#Rosew00d!',
    database: 'nodelogin'
});
/*connection.connect(function(err){

    if(err){

        throw err;
    }

    console.log("Connected to SQL database");
});*/

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function(request, response){

    response.sendFile(path.join(__dirname + '/login.html'));
});
app.post('/auth', function(request, response){

    var username = request.body.username;
    var password = request.body.password;
    if(username && password){

        connection.query('SELECT * FROM users WHERE username = ? AND password = ?',
                        [username, password],
                        function(error, results, fields){

            if(results.length > 0){

                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');

            }else{

                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });

    }else{

        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.get('/home', function(request, response){

    if(request.session.loggedin){

        connection.query('SELECT displayname FROM users WHERE username = ?', [request.session.username], function(error, results, fields){

            if(error){

                throw error;

            }else{

                response.send('Welcome back, ' + results[0].displayname + '!');
                response.end();
            }
        });

    }else{

        response.send('Please login to view this page!');
        response.end();
    }
});

app.listen(8080);
