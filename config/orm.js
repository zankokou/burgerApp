const connection = require('./connection.js');

var orm = {

    // orm functions go here
    selectAll: function (info, table) {
        var queryString = "SELECT ?? FROM ?? ";
        connection.query(queryString, [info, table], function (err, result) {
                if (err) throw err;
                // console.log(table);
                console.log(result);
            }

        )
    },
    insertOne: function (info, table) {
        var queryString = "SELECT ?? FROM ?? ";
        connection.query(queryString, [info, table], function (err, result) {
                if (err) throw err;
                // console.log(table);
                console.log(result);
            }

        )
    },
    updateOne: function (info, table) {
        var queryString = "SELECT ?? FROM ?? ";
        connection.query(queryString, [info, table], function (err, result) {
                if (err) throw err;
                // console.log(table);
                console.log(result);
            }

        )
    },



}

// exporting object relational
module.exports = orm;