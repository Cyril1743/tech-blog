var titleInput = $("#title")
var contentInput = $("#content")
var submitBtn = $("#submit")

submitBtn.on("click", (event) => {
    var title = titleInput.val()
    var content = contentInput.val()
    var post = { title: title, content: content }
    var response = fetch("/post", {
        method: "post",
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    })
})