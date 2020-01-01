let home = () =>
{
    window.location.assign("/home");
}

let articles = () =>
{
    window.location.assign("/articles");
}

$(document).ready(function ()
{
    $("#home-btn").on("click", home);
    $("#articles-btn").on("click", articles);

    $(".save-btn").on("click", function()
    {
        let articleLink = $(this).attr("data-link");
        let articleText = $(this).attr("data-text");
        let thisButton  = $(this);
        let buttonDiv   = $(this).parent();
        let divHeight   = buttonDiv.height();
    
        $.ajax(
        {
            method: "POST",
            url: "/article",
            data:
            {
                title: articleText,
                link: articleLink
            }
        })
        .then(function(response)
        {    
            $(thisButton).remove();
            buttonDiv.height(divHeight);
            //console.log(response);
            
            //Check if the article was saved in the database.
            if(response._id)
            {
                buttonDiv.addClass("added");
                buttonDiv.text("Added");
            }
            //Check if the article already exists in the database.
            else if(response.errmsg)
            {
                let errArray = response.errmsg.split(" ");

                if(errArray[0] === "E11000")
                {
                    buttonDiv.addClass("duplicate");
                    buttonDiv.text("Article Already in Database");
                }
                else
                {
                    buttonDiv.addClass("not-added");
                    buttonDiv.text("Database Error");
                }
            }
            //Check for any other failure.
            else
            {
                buttonDiv.addClass("not-added");
                buttonDiv.text("Database Error");
            }
        });
    })
});