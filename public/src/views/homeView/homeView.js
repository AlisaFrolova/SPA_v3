import { createEl } from "../../tools.js"
import tokenData from "../../tokenModule.js"
import createAchievementsSection from "./Modules/achievementsModule.js"
import { getVideos } from "../../NasaApi.js"

export default function homeView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "homeSection")
    app.append(section)

    section.append(createEl("h1", "Astra Spectrum Analytics", "header"))

    // if(tokenData.getAccessToken() !== null){ //nf
    //     fetch('/api/username', {   
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
    //     }).then(response => {
    //         if(response.status == 200){
    //             response.json().then(data => {
    //                 const messageBlock = createEl("div", "", "messageBlock")
    //                 messageBlock.append(createEl("p", `Hello, ${data.username}`, "accent"))
    //                 document.body.append(messageBlock)
    //                 setTimeout(() => {messageBlock.remove()}, 3000)
    //             })
    //         }else{
    //             tokenData.refreshAccessToken()
    //         }
    //     })
    // }

    // tokenData.refreshAccessToken().then(res => {
    //     if(res) console.log(tokenData.getAccessToken())
    // })

    // getVideos(5).then(res => {
    //     console.log(res)//array!
    // })
    
    section.append(createAchievementsSection())

    return section
}
