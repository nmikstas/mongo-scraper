var axios   = require("axios");
var cheerio = require("cheerio");

module.exports = function(app)
{
    // A GET route for scraping the InfoWars website
    app.get("/scrape", function(req, res)
    {
        axios.get("https://www.infowars.com").then(function(response)
        {
            // Load the HTML into cheerio and save it to a variable
            var $ = cheerio.load(response.data);
  
            // An empty array to save the data that we'll scrape
            var results = [];
  
            // Get all the articles.
            $("div.article-content").each(function(i, element)
            {
                var title = $(element).find("a").text().trim();
  
                //Get rid of junk in the string.
                let titleArr = title.split("\r");
                title = titleArr[0];

                titleArr = title.split("\t");
                title = titleArr[0];

                titleArr = title.split("\n");
                title = titleArr[0];

                titleArr = title.split("\u0008");
                title = titleArr[0];
                
                var link = $(element).find("a").attr("href");
                
                // Save these results.
                results.push(
                {
                    title: title,
                    link: link
                });
            });

            let hbsObject = { results: results };
            res.render("scrape", hbsObject);
        });
    });

    app.get("/", function(req, res)
    {
        res.redirect("/home");
    });

    app.get("/home", function(req, res)
    {
        res.render("home");   
    });
}