// Grab the articles as a json
$.getJSON("/articles", function (data) {
    for (var i = 0; i < 10; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + `<h1>${data[i].title}</h1>` + data[i].summary + "<br />" + `<a id='link' href=>${data[i].link}</a>` + "</p>" +
            `<button id='savedBtn' class='btn btn-primary'>Save Article`);

    }
});

$(document).on("click", "#link", function (data) {
     window.open(link.target.innerHTML);
});


$(document).on("click", "#saveBtn", function (link) {
    

});