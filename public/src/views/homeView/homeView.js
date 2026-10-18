import { createEl } from "../../tools.js"
import createAchievementsSection from "./Modules/achievementsModule.js"

export default function homeView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "homeSection")
    app.append(section)

    section.append(createEl("h1", "Astra Spectrum Analytics", "header"))

    // if(localStorage.getItem("accessToken") !== null){
    //     fetch('/api/username', {   
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${localStorage.getItem("accessToken")}` }
    //     }).then(response => {
    //         if(response.status == 200){
    //             response.json().then(data => {
    //                 const messageBlock = createEl("div", "", "messageBlock")
    //                 messageBlock.append(createEl("p", `Hello, ${data.username}`, "accent"))
    //                 document.body.append(messageBlock)
    //                 setTimeout(() => {messageBlock.remove()}, 3000)
    //             })
    //         }else{
    //             const response = await fetch('/api/refresh', { 
    //                 method: 'POST', 
    //                 credentials: 'include'
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 let currentAccessToken = data.accessToken;
    //             }
    //         }
    //     })
    // }
    
    section.append(createAchievementsSection())

    return section
}
