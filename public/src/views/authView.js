import {createEl} from "./tools.js"

export default function signIn(){ //NF
    if(localStorage.getItem("token") === null){
        return spawnForm()
    }else{
        window.location.replace("/")//-
        // document.getElementById("authLink").remove()
    }
}
function spawnForm(){
    //form
    const form = createEl("div", "", "form")

    form.append(createInputBlock("Login"))
    form.append(createInputBlock("Password"))

    //button
    const submitButton = createEl("button", "Submit", "confirmButton")
    form.append(submitButton)

    submitButton.addEventListener('click', () => {
        const login = document.getElementById("LoginId").value
        const password = document.getElementById("PasswordId").value

        const userData = {
            username: login,
            password: password
        }

            fetch('/api/register', {   //nf 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
            }).then(response => response.json()).then(() => {
                fetch('/api/login', {   
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
                }).then(response => response.json()).then(data => {
                    fetch('/api/profile', {   
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${data.token}` }
                    }).then(response => response.json()).then(message => console.log(message))
                })
            })





// .then(() => {
//                 fetch('api/profile', {   
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${token}` }
//                 }).then(response => response.json()).then(data => {
//                     console.log(data)
//                 })
//             })



                // .then(res => res.json())
                // .then(token => localStorage.setItem("token", token.token)).then(() => {
                // })
       /*  }else{
            const messageContainer = createEl("div", "", "messageContainer")
            messageContainer.append(createEl("p", "Enter all values!", "messageText"))
            form.append(messageContainer)
        }
         */

        // fetch('/api/auth', {   
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' }
        // }).then(response => response.json()).then(data => {
        //     console.log(data.auth)
        //     if(data.auth){
        //         //window.location.replace("/")
        //     }
        // })
        
        event.preventDefault()
    })

    return form
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