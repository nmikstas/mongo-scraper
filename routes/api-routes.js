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

    //Delete an article from the database.
    app.delete("/article/:id", function(req, res)
    {
        db.Article.find({ _id: req.params.id }).remove()
        .then(function(dbArticle)
        {
            res.json(dbArticle);
        })
        .catch(function(err)
        {
            res.json(err);
        });
    });

    //Save an article note to the database.
    app.post("/note", function(req, res)
    {
        console.log(req.body);

        db.Note.create({ body: req.body.body })
        .then(function(dbNote)
        {
            return db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle)
        {
            res.json(dbArticle);
        })
        .catch(function(err)
        {
            res.json(err);
        });
    });

    //Delete a note from the database.
    app.delete("/note/:articleid/:noteid", function(req, res)
    {
        db.Article.findOneAndUpdate({ _id: req.params.articleid }, { $pull: { notes: req.params.noteid } }, { new: true })
        .then(function(dbArticle)
        {
            return db.Note.find({ _id: req.params.noteid }).deleteOne();
        })
        .then(function(dbNote)
        {
            res.json(dbNote);
        })
        .catch(function(err)
        {
            res.json(err);
        });
    });
}