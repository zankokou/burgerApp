const connection = require('./connection.js');

var orm = {

    // orm functions go here
    selectAll: function (tableInput, cb) {
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function (err, result) {
                if (err) {
                    throw err
                };
                
                console.log(result);
                cb(result);
            }

        )
    },
    insertOne: function (burgerName) {
        var queryString = "INSERT INTO burgers VALUES ??";
        connection.query(queryString, [burgerName], function (err, result) {
                if (err) throw err;
                // console.log(table);
                console.log(result);
            }

        )
    },
    updateOne: function (item, category) {
        var queryString = "UPDATE burgers SET ?? WHERE ?? ";
        connection.query(queryString, [item, category], function (err, result) {
                if (err) throw err;
                // console.log(table);
                console.log(result);
            }

        )
    },



}

// exporting object relational
module.exports = orm;