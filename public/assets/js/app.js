// Grab the articles as a json
$.getJSON("/api/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").prepend(
            `<br>
            <div data-id=${data[i]._id}>
            <a href=${data[i].link}><h1>${data[i].title}</h1></a>
            ${data[i].summary}
            <br><br>
            <a class='saveBtn btn btn-primary' href=/api/articles/${data[i]._id}/save>Save Article</a>

            <hr>
            </div>`

        );
    }
});

$(document).on("click", ".saveBtn", function (data) {
    alert('Article Saved');
});

// saved articles page javascript
$.getJSON("/api/saved", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#saved-articles").prepend(
            `<br>
            <div data-id=${data[i]._id}>
            <a href=${data[i].link}><h1>${data[i].title}</h1></a>
            ${data[i].summary}
            <br><br>
            <a class='unsaveBtn btn btn-danger' href=/api/articles/${data[i]._id}/unsave>Delete Article</a>
            <a data-id=${data[i]._id} class="addNote btn btn-success" data-toggle="modal" data-target="#exampleModalCenter"> Add Note </a>

            <hr>
            </div>`

        );
    }
});

$(document).on("click", ".unsaveBtn", function (data) {
    alert('Removed Article From Saved List');
});

$(document).on("click", ".clearBtn", function (data) {
    $.ajax({
        method: "POST",
        url: "/api/articles/clear"
    }).then(function () {
        alert('Removed All Articles');
        location.reload();
    })

});


// button to save note
$(document).on("click", ".addNote", function () {
    // Empty the notes from the note section
    $("#noteBody").empty();
    $(".modal-body").empty();

    var thisId = $(this).attr("data-id");
    // $('.saveNote').attr('data-id') = thisId;
    $('.saveNote').attr('data-id', thisId);
    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: `/api/articles/${thisId}`
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#noteTitle").html(data[0].title);
            // // A textarea to add a new note body
            if (data[0].note === undefined ) {
                data[0].note = ""
            }
            $(".modal-body").append(`<textarea id='noteBody' class="form-control col-xs-12">${data[0].note}</textarea>`)



            console.log(data[0].note);

        });



});

// function to save the note
$(document).on("click", ".saveNote", function () {
    var thisId = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: `/api/articles/${thisId}/addNote`,
            data: {
                note: $("#noteBody").val()
            }
        })
        // With that done
        .then(function (data) {
            alert('Note added!')

        });

});