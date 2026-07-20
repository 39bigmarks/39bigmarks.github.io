function get(func) {
    var j = $.getJSON("https://39bigmarks.github.io/data/posts.json", function (json) {
        switch (func) {
            case "insertPosts":
                insertPosts(json);
                return;
            case "getPostData":
                getPostData(json);
                return;
            default:
                break;
        }
    });
}

function insertPosts(json) {
    if (!getParameters().has("page"))
        location.href = "?page=0";

    let page = getParameters().get("page");

    if (!validInteger(page)) {
        location.href = "error.html?type=that's not an integer, also stop messing with that.";
        return;
    }

    let count = 0;

    for (let i = (json.posts.length - 1) - (10 * page); i >= 0 && count < 10; i--) {
        console.log(i);
        count++;

        let postContainer = document.createElement("div");
        postContainer.className = "postContainer";

        let postTitle = document.createElement("div");
        postTitle.className = "postTitle";
        postTitle.textContent = json.posts[i].index + ":  ";

        let postName = document.createElement("a");
        postName.textContent = json.posts[i].title;
        postName.href = `post.html?index=${json.posts[i].index}`;
        postName.className = "postName";

        postTitle.appendChild(postName);

        let postShortArticle = document.createElement("p");
        postShortArticle.className = "postShortArticle";
        
        postShortArticle.textContent = json.posts[i].article;
        postShortArticle.textContent = postShortArticle.textContent.substring(0, postShortArticle.textContent.length > 32 ? 32 : postShortArticle.textContent.length);

        if (postShortArticle.textContent.length == 32)
            postShortArticle.textContent += "...";

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postShortArticle);

        document.getElementById("postList").appendChild(postContainer);
    }
}

function getPostData(json) {
    let index = getParameters().get("index");

    if (!validInteger(index) || index > json.posts.length - 1) {
        location.href = "error.html";
        return;
    }

    document.title = `39bigmarks - ${json.posts[index].title}`;

    document.getElementById("postTitle").innerHTML = json.posts[index].title;
    document.getElementById("postCreationDate").innerHTML = `Creation Date: ${getTime(json.posts[index].date)}`;

    if (json.posts[index].edited != "") {
        document.getElementById("postEditedDate").innerHTML = `Edited: ${getTime(json.posts[index].edited)}`;
    } else if (json.posts[index].edited == "") {
        document.getElementById("postEditedDate").parentElement.removeChild(document.getElementById("postEditedDate"));
    }

    var article = document.createElement("p");
    article.textContent = getFormattedArticle(json.posts[index].article);
    var formattedArticle = getFormattedArticle(json.posts[index].article);

    for (let i = 0; i < getFormattedArticle.length; i++) {

    }

    document.getElementById("articleContainer").appendChild(document.createElement("br"));
    document.getElementById("articleContainer").appendChild(document.createElement("br"));
    document.getElementById("articleContainer").appendChild(article);

    // add regex for the ability to add images:
    // %(\w{3})\[(.+)\]%
    // %img[images/painting.png]%
}

function getFormattedArticle(article) {
    let splits = article.split(new RegExp("%\(.*\)", "gm"), "");
    if (splits.length <= 1) return article;



    return 
}

function getTime(time) {

    // Source - https://stackoverflow.com/a/4829642
    MM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return time.replace(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\w{3}|\.\d{3}\w)/,
        function ($0, $1, $2, $3, $4, $5, $6, $7) {
            let hour = parseInt($4);
            hour += 8 + 12;

            return MM[$2 - 1] + " " + $3 + ", " + $1 + " at " + hour % 12 + ":" + $5 + ":" + $6 + (+hour > 12 ? "PM" : "AM");
        }
    );
}

function getParameters() {
    return new URLSearchParams(location.search);
}

function validInteger(theNumber) {
    var number = +theNumber;

    return number > -1 && number % 1 === 0;
}