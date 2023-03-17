var titleInput = $("#title")
var contentInput = $("#content")
var submitBtn = $("#submit")
var deleteBtn = $(".delete")

submitBtn.on("click", async (event) => {
    var title = titleInput.val()
    var content = contentInput.val()
    var post = { title: title, content: content }
    var response = await fetch("/post", {
        method: "post",
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        window.location.reload(true)
    }
})

deleteBtn.on("click", async (event) => {
    var btn = event.target
    var id = btn.getAttribute("data-id")
    var response = await fetch(`/post/${id}`, {
        method: "Delete"
    })
    if (response.ok) {
        window.location.reload(true)
    }
})