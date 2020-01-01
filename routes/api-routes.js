var db = require("../models");

module.exports = function(app)
{  
    //Save an article to the database.
    app.post("/article", function(req, res)
    {
        db.Article.create(req.body)
        
        .then(function(dbArticle)
        {
            res.json(dbArticle);
        })
        .catch(function(err)
        {
            res.json(err);
        });
    });









}