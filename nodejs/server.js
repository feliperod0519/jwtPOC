"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) { return res.send('root thing'); });
var people = [{ id: 1, email: 'minou@cat-tv.ca', bio: 'soy un gato' },
    { id: 2, email: 'manchitas@fox.ca', bio: 'soy un zorrito' }];
var tokens = [{ email: 'minou@cat-tv.ca', password: 'hello' },
    { email: 'manchitas@fox.ca', password: 'hello' }];
function getPeople() {
    return people;
}
function getPerson(id) {
    return people.find(function (x) { return x.id === id; });
}
function getPersonByEmail(email) {
    return people.find(function (e) { return e.email === email; });
}
function validate(email, password) {
    var t = tokens.filter(function (t) { return t.email === email && t.password == password; });
    if (t === undefined || t === null)
        return false;
    else if (t.length > 0)
        return true;
    return false;
}
var RSA_PRIVATE_KEY = fs.readFileSync('./server.key');
app.get('/api/people', function (req, res) {
    res.json(getPeople());
});
app.get('/api/people/:id', function (req, res) {
    res.json(getPerson(+req.params.id));
});
app.get('/api/people/email/:email', function (req, res) {
    console.log(req.params.email);
    res.json(getPersonByEmail(req.params.email));
});
app.post('/api/authenticate', function (req, res) {
    var token = req.body;
    console.log('Logging user email: ' + token.email);
    var authentication = validate(token.email, token.password);
    if (authentication) {
        var p = getPersonByEmail(token.email);
        var jwtBearer = jwt.sign({ id: p.id, email: p.email }, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 30,
            subject: p.email
        });
        p.jwt = jwtBearer;
        res.json(p);
    }
    else
        res.status(403).json({});
});
var server = app.listen(8000, "localhost", function () {
    console.log("Listening on localhost:8000");
});
