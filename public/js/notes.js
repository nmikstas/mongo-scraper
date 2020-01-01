let home = () =>
{
    window.location.assign("/home");
}

let scrape = () =>
{
    window.location.assign("/scrape");
}

let articles = () =>
{
    window.location.assign("/articles");
}

$(document).ready(function ()
{
    $("#home-btn").on("click", home);
    $("#scrape-btn").on("click", scrape);
    $("#articles-btn").on("click", articles);

    $("#note-submit").on("click", function(event)
    {
        event.preventDefault();

        let noteBody = $("#new-note").val().trim();

        //Do not allow blank notes.
        if(noteBody === "") return;

        $("#new-note").val("");

        //Add the note to the article.
        $.ajax(
        {
            method: "POST",
            url: "/note",
            data:
            {
                articleId: $("#new-note").attr("data-article"),
                body: noteBody
            }
        })
        .then(function(response)
        {
            location.reload();
        });
    });

    $(".delete-btn").on("click", function()
    {
        let articleId = $("#new-note").attr("data-article");
        let noteId = $(this).attr("data-note-id");

        $.ajax(
        {
            method: "DELETE",
            url: "/note/" + articleId + "/" + noteId
        })
        .then(function()
        {
            location.reload();
        });
    });
});