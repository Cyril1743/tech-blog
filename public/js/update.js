var titleInput = $("#title")
var contentInput = $("#content")
var updateBtn = $("#update")
var url = window.location.pathname
var urlId = url.split("/")

updateBtn.on("click", async (event) => {
    var title = titleInput.val()
    var content = contentInput.val()
    var id = urlId[3]
    var post = { title: title, content: content }
    var response = await fetch(`/post/update/${id}`, {
        method: "put",
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        window.location.assign(`/post/${id}`)
    }
})