'use strict';

var router = require('express').Router();
var fs = require('fs');
var child_process = require('child_process');

router.get('/', function (req, res, next) {
    fs.readdir('./uploads', (err, files) => {
        if (err) return next(err);
        res.render('list', {data: files});
    });
});

router.post('/', function (req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        fstream = fs.createWriteStream('./uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
        fstream.on('error', function () {
            return next(new Error('Please choose a file to upload'));
        });
    });
});

router.get('/:filename', function (req, res, next) {
    var output = '';
    var child = child_process.exec('node ./uploads/' + req.params.filename);
    
    child.stdout.on('data', (data) => {
        output += data;
    });

    child.stderr.on('data', (data) => {
        output += data;
        res.status(500);
    });
    
    child.on('close', (code) => {
        res.set('Content-Type', 'text/plain');
        res.send(output);
    });
});

module.exports = router;