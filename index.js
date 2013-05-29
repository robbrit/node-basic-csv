/*jslint node: true, indent: 2, nomen: true, plusplus: true, newcap: true, regexp: true */

var csv = require("csv"),
  _ = require("underscore"),
  fs = require("fs");

/*
 * Read a CSV file. Call the callback when it's done.
 * Possible options:
 * - encoding (default: utf-8) - the encoding of the file
 * - parseNumbers (default: true) - parse any ints/floats that are found
 * - dropHeader (default: false) - remove the first row of the file
 */
exports.readCSV = function (filename, options, callback) {
  "use strict";

  if (callback === undefined) {
    callback = options;
    options = {};
  }

  options = _.defaults(options, {
    encoding: "utf-8",
    parseNumbers: true,
    dropHeader: false
  });

  fs.readFile(filename, options.encoding, function (err, csvData) {
    if (err) {
      callback(err, null);
      return;
    }

    var rows = [],
      isHeader = true;

    csv()
      .from(csvData)
      .transform(function (row) {
        if (isHeader) {
          isHeader = false;
          // ignore the header?
          if (options.dropHeader) {
            return row;
          }
        }

        rows.push(row.map(function (cell) {
          if (options.parseNumbers) {
            if (cell.match(/^-?\d+$/)) {
              return parseInt(cell, 10);
            }
            if (cell.match(/^-?\d+\.\d+(e-?\d+)?$/)) {
              return parseFloat(cell);
            }
          }
          return cell;
        }));

        return row;
      })
      .on("end", function () {
        callback(null, rows);
      });
  });
};
