var contentInput = $("#content")
var updateBtn = $("#update")
var url = window.location.pathname
var id = url.split("/")

updateBtn.on("click", async () => {
    var content = contentInput.val()
    var userName = updateBtn.attr("data-username")
    var comment = {content: content, username : userName}
    var response = await fetch(`/comments/${id[2]}`, {
        method: "put",
        body: JSON.stringify(comment),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok){
        window.location.assign("/")
    }
})