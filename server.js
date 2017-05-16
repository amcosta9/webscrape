/* Web Scrape and Add Comments - Server.js
 * Created by Ariel - 5.15.2017
 * ================================================== */

// Note and Article models
var Comment = require("./models/Comment.js"),
    Article = require("./models/Article.js"),
 // Dependencies
    express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    mongoose = require("mongoose"),
    request = require("request"),
    cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use Morgan and Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Use files in 'public' directory available
app.use(express.static("public"));

// Configure and 'recipe-webscraper' database w/ Mongoose
mongoose.connect("mongodb://localhost/recipe-webscraper");
var db = mongoose.connection;

// Catch errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Success notification
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Routes
// ======

// A GET request to scrape smittenkitchen.com
app.get("/scrape", function(req, res) {
    // Grab body of html with request
    request("http://www.smittenkitchen.com/", function(error, response, html) {
        // Load to cheerio and store in $ variable
        var $ = cheerio.load(html);
        // Grab each article div
        $("article").each(function(i, element) {
            var result = {};

            // Add title, text, and href of every link, and save as properties of the result object
            result.title = $(element).find(".entry-title").text();
            result.summary = $(element).find(".entry-summary").text();
            result.link = $(element).find("a").find("img").attr("src");

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            var entry = new Article(result);

            // Now, save that entry to the db
            entry.save(function(err, doc) {
                // Log any errors
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            });

        });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});