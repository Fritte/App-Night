var fs =require('fs');
var express = require('express');
var app = express();
var path = require('path');

var port = 3000 || process.argv[0];

fs.readdir('.', function(err, files){
    if(err){
        throw Error("Error occured: " + err);
    }
    var jsonFiles= files.filter(function(fileName){
        return fileName.endsWith(".json") && fileName != 'package.json';
    });

    jsonFiles.forEach(function (element, index) {
        console.log("Read File: " + element);
        app.get('/' + path.parse(element).name, function(req, res) {
            fs.readFile(element, function(err, data){
                res.send(data.toString());
            });
        });
    });
});

app.listen(port);

console.log('Server started: http://localhost:3000/');