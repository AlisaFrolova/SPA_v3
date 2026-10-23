import { createEl } from "../../../tools.js"
import getDescription from "../Components/getDescription.js"
import { getValueFromLocalStorage } from "../../../tools.js"

export default function spawnNewsArticle(){
    const article = getArticleById(parseInt(localStorage.getItem("articleID"))) 
    return createNewsArticle(article.hdurl, article.title, getDescription(article))
}

function createNewsArticle(imgURL, title, description){
    const section = createEl("section", "", "article")

    section.append(createEl("h2", "Article", "header"))

    const infoContainer = createEl("div", "", "infoArticleContainer")

    const img = createEl("img", "", "newsArticleImg")
    img.src = imgURL
    infoContainer.append(img)

    const textBlock = createEl("div", "", "articleNewsText")
    textBlock.append(createEl("h2", title, "text"))
    textBlock.append(createEl("p", description, "text"))
    infoContainer.append(textBlock)

    section.append(infoContainer)

    const returnLink = createEl("a", "Return to News  -->", "link")
    returnLink.href = "/news"
    returnLink.setAttribute("data-link", "")
    section.append(returnLink)

    return section
}

function getArticleById(id){
    for (const el of getValueFromLocalStorage("newsArticles")) {
        if(el.post_id === id){
            return el
        }
    }
}