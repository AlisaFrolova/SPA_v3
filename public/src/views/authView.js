import {createEl} from "./tools.js"

//const credentials = { username: 'johnd', password: 'm38rmF$' };

export default function signIn(){ //NF
    if(localStorage.getItem("token") === null){
        return spawnForm()
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
        // body: JSON.stringify(credentials)
        //if(loginInput.value === credentials.username && passwordInput.value === credentials.password){}
        //https://fakestoreapi.com/auth/login 

        fetch('/api/auth', {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
        
        event.preventDefault()
       /*  window.location.replace("/") *///+
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

    const login = createEl("label", type, "textWhite")
    login.for = `${type}Id`
    container.append(login)

    return container
}