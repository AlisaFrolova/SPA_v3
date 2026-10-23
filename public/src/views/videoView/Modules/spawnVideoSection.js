import { createEl } from "../../../tools.js"
import { getVideos } from "../../../NasaApi.js"
// import spawnNewsCards from "../Components/spawnNewsCards.js"
// import spawnSortMenu from "./cardsSortModule.js"


export default function spawnVideosSection(){
    const cardsContainer = createEl("section", "", "videosPreviewCardsContainer")

    const loadingText = createEl("p", "Loading videos...", "loadingText")
    cardsContainer.append(loadingText)

    getVideos(20).then(data => { //change the number ~~
        //const arrJSON = JSON.stringify(data) // (?) ~~useless
        //localStorage.setItem("newsArticles", arrJSON) (?)
        
        loadingText.remove()
        // spawnNewsCards(cardsContainer)
        // cardsContainer.before(spawnSortMenu(cardsContainer))
    })

    return cardsContainer
}