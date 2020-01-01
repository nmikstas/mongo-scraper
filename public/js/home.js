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
    $("#scrape-btn").on("click", scrape);
    $("#articles-btn").on("click", articles);
});
