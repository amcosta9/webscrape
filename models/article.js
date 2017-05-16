/* Web Scrape and Add Comments - Article.js
 * Created by Ariel - 5.15.2017
 * ================================================== */

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true
    },
    // link is a required string
    link: {
        type: String,
        required: true
    },
    // summary is a required string
    summary: {
        type: String,
        required: true
    },
    // saves comment, ref refers to the Comment model
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// Create Article model with ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;