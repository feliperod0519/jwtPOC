"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) { return res.send('root thing'); });
var people = [{ id: 1, email: 'minou@cat-tv.ca' },
    { id: 2, email: 'manchitas@fox.ca' }];
function getPeople() {
    return people;
}
function getPerson(id) {
    return people.find(function (x) { return x.id === id; });
}
function getPersonByEmail(email) {
    return people.find(function (e) { return e.email === email; });
}
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
var server = app.listen(8000, "localhost", function () {
    console.log("Listening on localhost:8000");
});
