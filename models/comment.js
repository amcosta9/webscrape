/* Web Scrape and Add Comments - Comment.js
 * Created by Ariel - 5.15.2017
 * ================================================== */

// Require mongoose
var mongoose = require("mongoose");
// Create schema class
var Schema = mongoose.Schema;

// Create comment schema
var CommentSchema = new Schema({
    // title string
    title: {
        type: String
    },
    // title string
    body: {
        type: String
    }
});

// Create the Comment model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;