// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
var axios = require('axios');
// Requiring our Note and Article models

var db = require("../models");

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/scrape', function (req, res) {
        // First, we grab the body of the html with request
        axios.get("https://www.nytimes.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("article").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children('h2')
                    .children("a")
                    .text();
                result.link = $(this)
                    .children('h2')
                    .children("a")
                    .attr("href");
                result.summary = $(this)
                    .children('p')
                    .text();

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });

            // If we were able to successfully scrape and save an Article, send a message to the client
            res.redirect("/");
        });
    });



    // Route for getting all Articles from the db
    app.get("/api/articles", function (req, res) {
        db.Article.find({
            'saved': false
        }).then(function (dbArticle) {
            res.json(dbArticle)

        }).catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });

    });

    //route to save an article
    app.get("/api/articles/:id/save", function (req, res) {
        var id = req.params.id;
        db.Article.find({
                '_id': id
            }).update({
                'saved': true
            })
            .then(function () {
                res.redirect('/');
                console.log('saved article')
            }).catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });

    });

    // app.post("/api/articles/:id/save", function (req, res) {
    //     var id = req.params.id;
    //     db.Article.find({
    //             '_id': id
    //         }).update({
    //             'saved': true
    //         })
    //         .then(function () {
    //             res.redirect('/');
    //             alert('Article Saved')

    //             console.log('saved article')
    //         }).catch(function (err) {
    //             // If an error occurred, send it to the client
    //             return res.json(err);
    //         });

    // });


    // route to unsave an article
    app.get("/api/articles/:id/unsave", function (req, res) {
        var id = req.params.id;
        db.Article.find({
                '_id': id
            }).update({
                'saved': false
            })
            .then(function () {
                res.redirect('/saved');
                // console.log('saved article')
            }).catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });

    });

    // route to show saved articles page
    app.get("/saved", function (req, res) {
        res.render('saved');
    });

    // api route for saved articles
    app.get("/api/saved", function (req, res) {
        db.Article.find({
            saved: true
        }).then(function (dbArticle) {
            res.json(dbArticle)
        }).catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });

    });



    // clear articles route
    app.post("/api/articles/clear", function (req, res) {
        db.Article.find({'saved':false}).remove()
            .then(function () {
                res.redirect('/');
                // alert('All Articles Removed')
            }).catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });

    });

};