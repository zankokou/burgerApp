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