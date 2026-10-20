import tokenData from "../tokenModule.js"
import { createEl } from "../tools.js"
import { spawnLogoutButton } from "../tools.js"

export default function signIn(){
    const appContainer = document.querySelector("#app")
    tokenData.refreshAccessToken().then(res =>{//->
        console.log(res)//--
        if(res){
            console.log("found token")//--
            spawnLogoutButton()
        }else{
            console.log("not found token")//--
            appContainer.append(spawnForm())
        }
    })
    return ""
}

function spawnForm(){
    //form
    const form = createEl("div", "", "form")

    const header = createEl("h2", "Register", "authHeader")
    form.append(header)

    form.append(createInputBlock("Login"))
    form.append(createInputBlock("Password"))

    //login button
    let isLogin = false
    const loginButton = createEl("button", "Switch to Login", "loginButton")
    loginButton.addEventListener("click", () => {
        if(!isLogin){
            isLogin = true
            loginButton.textContent = "Switch to Register"
            header.textContent = "Login"
        }else{
            isLogin = false
            loginButton.textContent = "Switch to Login"
            header.textContent = "Register"
        }
    })
    form.append(loginButton)

    //submit button
    const submitButton = createEl("button", "Submit", "confirmButton")
    form.append(submitButton)

    const messageContainer = createEl("div", "", "messageContainer")
    messageContainer.append(createEl("p", "Invalid enter", "messageText"))

    submitButton.addEventListener("click", () => { 
        const username = document.getElementById("LoginId").value
        const password = document.getElementById("PasswordId").value

        const userData = {
            username: username,
            password: password
        }

        if(isLogin){
            if(!login(userData)){
                form.append(messageContainer)
                setTimeout(() => {messageContainer.remove()}, 5000)
            }
        }else{
            if(!register(userData)){ 
                form.append(messageContainer)
                setTimeout(() => {messageContainer.remove()}, 5000)
            }
        } 
        event.preventDefault()
    })

    return form
}

function register(userData){
    fetch('/api/register', {   
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
        }).then(response => {
            if(response.status === 200){
                response.json().then(() => {
                    login(userData)
                    return true
                })
            }else{
                return false
            }
        })
}
function login(userData){
    fetch('/api/login', {   
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
        }).then(response => {
            if(response.status === 200){
                response.json().then(data => tokenData.setAccessToken(data.accessToken))
                .then(() => {
                    spawnLogoutButton()
                    window.location.replace("/")
                })
            }else{
                return false
            }
        })
}


function createInputBlock(type){
    const container = createEl("div", "", "inputContainer")

    const input = createEl("input", "", type)
    input.type = "text"
    input.placeholder = type
    input.id = `${type}Id`
    container.append(input)

    const label = createEl("label", type, "textWhite")
    label.for = `${type}Id`
    container.append(label)

    return container
}