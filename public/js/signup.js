var usernameInput = $("#inputUsername")
var passwordInput = $("#inputPassword")
var submitButton = $("#submit")

submitButton.on("click", async (event) => {
    event.preventDefault()
    var username = usernameInput.val()
    var password = passwordInput.val()
    var newUser = {username: username, password: password}
    var response = await fetch("/user", {
        method: "post",
        body: JSON.stringify(newUser)
    })
    if(response.ok){
        window.location.replace("/login")
    }
    
})