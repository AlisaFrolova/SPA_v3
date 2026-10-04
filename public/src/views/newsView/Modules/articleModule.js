import { createEl } from "../../tools.js"
import { getDescription } from "../newsView.js"

export default function spawnNewsArticle(){
    const article = getArticleById(parseInt(localStorage.getItem("articleID"))) //local storage - ?
    return createNewsArticle(article.hdurl, article.title, getDescription(article))
}

function createNewsArticle(imgURL, title, description){
    const section = createEl("section", "", "article")

    section.append(createEl("h2", "Article", "header"))

    const returnLink = createEl("a", "Return to News", "link")
    returnLink.href = "/news"
    returnLink.setAttribute("data-link", "")
    section.append(returnLink)

    const img = createEl("img", "", "newsArticleImg")
    img.src = imgURL
    section.append(img)

    const textBlock = createEl("div", "", "articleNewsText")
    textBlock.append(createEl("h2", title, "text"))
    textBlock.append(createEl("p", description, "text"))
    section.append(textBlock)

    return section
}

function getArticleById(id){
    const getArr = localStorage.getItem("newsArticles")//local storage - ?
    const arrData = JSON.parse(getArr)

    for (const el of arrData) {
        if(el.post_id === id){
            return el
        }
    }
}