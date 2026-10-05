import { createEl } from "../../tools.js"
import { getValueFromLocalStorage } from "../../tools.js"
import getDescription from "./getDescription.js"

export default function spawnNewsCards(container){
    for (const el of getValueFromLocalStorage("newsArticles")) {
        container.append(createNewsCard(el.hdurl, el.title, shortenDescription(getDescription(el)), el.post_id))
    }
}

function createNewsCard(imgURL, title, description, id){
    const container = createEl("div", "", "newsPreviewCard")

    const textBlock = createEl("div", "", "previewNewsText")
    textBlock.append(createEl("h2", title, "text"))
    
    textBlock.append(createEl("p", `${description} ... `, "text"))

    const articleLink = createEl("a", " Read more...", "link")
    articleLink.href = "/news/article"
    articleLink.setAttribute("data-link", "")
    textBlock.append(articleLink)
    
    container.append(textBlock)
    
    const img = createEl("img", "", "newsPreviewImg")
    img.src = imgURL
    container.prepend(img)

    container.addEventListener("click", () => {
        localStorage.setItem("articleID", id)
    })

    return container
}

const shortenDescription = (description) => description.slice(0,description.indexOf(description.split(".")[3]))