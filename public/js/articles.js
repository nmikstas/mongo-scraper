let home = () =>
{
    window.location.assign("/home");
}

let scrape = () =>
{
    window.location.assign("/scrape");
}

$(document).ready(function ()
{
    $("#home-btn").on("click", home);
    $("#scrape-btn").on("click", scrape);

    $(".delete-btn").on("click", function()
    {
        let articleId = $(this).attr("data-article-id");

        $.ajax(
        {
            method: "DELETE",
            url: "/article/" + articleId
        })
        .then(function()
        {
            location.reload();
        });
    });

    $(".notes-btn").on("click", function()
    {
        let articleId = $(this).attr("data-article-id");
        let articleNote = "This is a note!";

        window.location.assign("/article/" + articleId);
    });
});