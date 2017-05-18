/* Web Scrape and Add Comments - app.js
 * Created by Ariel - 5.16.2017
 * ================================================== */
$('.modal').modal();

// user clicks article (<li> tag)
$(document).on("click", "li", function() {
    // Empty the comments from the comments section
    // $("#modal1").empty();
    // save the id from the p tag
    var thisId = $(this).attr("data-id");
    console.log('clicked ', thisId);

    // ajax call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // add comment information to DOM
        .done(function(data) {
            console.log(data);
            // article title
            $(".modal-content").html("<h4>" + data.title + "</h4><br>" +
                "<input id='titleinput' name='title' >" +
                "<textarea id='bodyinput' name='body'></textarea>");
            // button to submit new comment, tied to article id
            $(".modal-footer").html("<button data-id='" + data._id + "' id='savecomment' class='modal-action modal-close'>Save Comment</button>");

            // if comment on the article exists
            if (data.comment) {
                // display existing comment
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
            }
            $('#modal1').modal('open');
        });
});


// user clicks savecomment button
$(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // POST comment to db
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
    // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the comment section
            $("#comments").empty();
        });

    // clear input fields
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

