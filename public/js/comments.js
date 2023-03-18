var textBox = $("#content")
var submitBtn = $("#submit")
var deleteBtn = $(".delete")

submitBtn.on("click", async (event) => {
    event.preventDefault()
    var content = textBox.val()
    var url = window.location.pathname
    var id = url.split("/")
    var body = {
        postId: id[2],
        content: content
    }
    var response = await fetch(`/comments/${id[2]}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        window.location.replace(`/post/${id[2]}`)
    } else {
        alert("Failed to add comment")
    }
})

deleteBtn.on("click", async (event) => {
    var id = event.target.getAttribute("data-id")
    var response = await fetch(`/comments/${id}`, {
        method: "Delete"
    })
    if (response.ok){
        window.location.reload(true)
    }
})