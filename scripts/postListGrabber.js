function get(func) {
    $.getJSON("https://39bigmarks.github.io/data/posts.json", function (json) {
        switch (func) {
            case "insertPosts":
                insertPosts(json);
                break;
            case "getPostData":
                getPostData(json);
                break;
            default:
                throw new DOMException(`Function "${func}" not found.`);
        }
    });
}

function insertPosts(json) {
    if (!getParameters().has("page"))
        location.href = "?page=0";

    let page = getParameters().get("page");

    if (!validInteger(page)) {
        location.href = "error.html";
        return;
    }

    for (let i = 10 * page; i < json.posts.length && i < 10 * (page + 1); i++) {
        var postContainer = document.createElement("div");
        postContainer.className = "postContainer";

        var postTitle = document.createElement("span");
        postTitle.className = "postTitle";

        var postName = document.createElement("p");
        postName.innerHTML = json.posts[i].title;
        postName.href = "test.html";
        postName.className = "postName";

        var postName = document.createElement("a");
        postName.innerHTML = json.posts[i].title;
        postName.href = `post.html?index=${json.posts[i].index}`;
        postName.className = "postName";

        // postTitle.appendChild(postIndex);
        postTitle.appendChild(postName);

        var postShortArticle = document.createElement("p");
        postShortArticle.className = "postShortArticle";
        postShortArticle.innerHTML = json.posts[i].article;

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postShortArticle);

        document.getElementById("posts").insertAdjacentElement("afterbegin", postContainer);
    }
}

function getPostData(json) {
    let index = getParameters().get("index");

    if (!validInteger(index) || index > json.posts.length - 1) {
        location.href = "error.html";
        return;
    }

    document.getElementById("postTitle").innerHTML = json.posts[index].title;
}

function getParameters() {
    return new URLSearchParams(location.search);
}

function validInteger(theNumber) {
    var number = +theNumber;

    return number > -1 && number % 1 === 0;
}