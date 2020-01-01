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


});