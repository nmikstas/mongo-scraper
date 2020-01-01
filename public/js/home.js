let scrape = () =>
{
    
    window.location.assign("/scrape");
}

let articles = () =>
{
    
}

$(document).ready(function ()
{
    $("#scrape-btn").on("click", scrape);
    $("#articles-btn").on("click", articles);
});
