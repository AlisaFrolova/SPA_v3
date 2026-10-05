import { createEl } from "../../tools.js"
import { getAPOD } from "../../../NasaApi.js"
import spawnNewsCards from "../Components/spawnNewsCards.js"
import spawnSortMenu from "./cardsSortModule.js"

export default function spawnNewsSection(){
    const cardsContainer = createEl("section", "", "newsPreviewCardsContainer")

    getAPOD("").then(data => {
        const arrJSON = JSON.stringify(data)
        localStorage.setItem("newsArticles", arrJSON)
        
        spawnNewsCards(cardsContainer)
        cardsContainer.before(spawnSortMenu(cardsContainer))
    })

    return cardsContainer
}
