What is it?
===========

It is a simple library for processing CSV files in Node.js. Most Node.js CSV
parsing libraries are complex, designed for handling large files as part of
a complicated, evented streaming process. This project is designed to simply
read a CSV file and give you an array of arrays.

Install
=======

Easy:

    npm install basic-csv

Usage:
======

Designed to be as easy as possible:

    var basicCSV = require("basic-csv");

    basicCSV.readCSV("myCSVFile.csv", function (error, rows) {
      console.log(rows); // displays a nested array of arrays
    });

There are a few options:

    var basicCSV = require("basic-csv");

    basicCSV.readCSV("myCSVFile.csv", {
      dropHeader: true
    }, function (error, rows) {
      console.log(rows); // same thing, but doesn't include the first row
    });

By default, `basic-csv` assumes that you're handling UTF-8 encoded files,
and that any number-ish strings that it finds should be converted into the
proper type. You can change those if you like:

    var basicCSV = require("basic-csv");

    basicCSV.readCSV("myCSVFile.csv", {
      encoding: "wacky-encoding",
      parseNumbers: false
    }, function (error, rows) {
      console.log(rows); // same thing, but doesn't include the first row
    });

You can also just parse a string directly:

    var basicCSV = require("basic-csv");

    basicCSV.readCSVFromString("A1,B1,C1\nA2,B2,C2", function (err, rows) {
      console.log(rows);
    });

`readCSVFromString` takes the same optional arguments as `readCSV` except for
`encoding`.


Licence
=======

MIT
