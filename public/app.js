/* Web Scrape and Add Comments - app.js
 * Created by Ariel - 5.16.2017
 * ================================================== */

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append(
            "<p data-id='" + data[i]._id + "'>" +
                data[i].title + "<br />" +
                "<img src='" + data[i].link + "'><br />" +
                data[i].summary +
            "</p>");
    }
});