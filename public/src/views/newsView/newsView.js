import { createEl } from "../tools.js"
import { getAPOD } from "../../NasaApi.js"

let arr = [] //local storage ????????????????

export default function newsView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "newsSection")
    app.append(section)

    section.append(createEl("h1", "News", "header"))

    const cardsContainer = createEl("section", "", "newsPreviewCardsContainer")

    getAPOD("").then(data => {
        arr = structuredClone(data)

        const arrJSON = JSON.stringify(arr)
        localStorage.setItem("newsArticles", arrJSON)
        
        spawnNewsCards(arr, cardsContainer)
        cardsContainer.before(spawnSortMenu(cardsContainer))
    }) 
    
    section.append(cardsContainer)

    return section
}

export function getDescription(el){
    const tempBlock = createEl("div", "", "block")
    tempBlock.innerHTML = el.explanation
    return tempBlock.textContent
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

function spawnNewsCards(arr, container){
    for (const el of arr) {
        container.append(createNewsCard(el.hdurl, el.title, shortenDescription(getDescription(el)), el.post_id))
    }
}
function spawnSortMenu(cardsContainer){
    const sortMenu = createEl("section", "", "newsSortMenu")

    sortMenu.append(createEl("h2", "Sort by Date", "text"))

    //sortMenu.append(createInputBlock("date", "date", "Date: "))//for what the actual hell i needed date input. sort works as newest - oldest 

    const sortContainer = createEl("div", "", "newsSortContainer")

    let isSortedByNewest = true

    const sortByNewest = createInputBlock("radio", "sortByDate", "Newest")
    sortByNewest.addEventListener("click", () => {
        if(!isSortedByNewest){
            arr = arr.reverse()
            isSortedByNewest = true
        }
    })
    sortContainer.append(sortByNewest)

    const sortByOldest = createInputBlock("radio", "sortByDate", "Oldest")
    sortByOldest.addEventListener("click", () => {
        if(isSortedByNewest){
            arr = arr.reverse()
            isSortedByNewest = false
        }
    })
    sortContainer.append(sortByOldest)

    sortMenu.append(sortContainer)

    const confirmButton = createEl("button", "Apply", "confirmButton")
    confirmButton.addEventListener("click", ()=>{
        cardsContainer.innerHTML = ""
        spawnNewsCards(arr, cardsContainer)
    })

    sortMenu.append(confirmButton)

    return sortMenu
}

function createInputBlock(type, name, labelText){
    const sortBlock = createEl("div", "", "sortBlock")

    const sortLabel = createEl("label", labelText, "sortLabel")
    sortLabel.for = name
    sortBlock.append(sortLabel)

    const sortOption = createEl("input", "", "sortInput")
    sortOption.type = type
    sortOption.id = name
    sortOption.name = name
    sortBlock.append(sortOption)

    return sortBlock
}

const shortenDescription = (description) => description.slice(0,description.indexOf(description.split(".")[3]))

// date: "2026-09-30"
// explanation: "<strong>Explanation:</strong> <a href=\"http://ned.ipac.caltech.edu/level5/Arp/frames.html\">Peculiar</a> spiral galaxy Arp 78 is found within the boundaries of the head strong <a href=\"http://hawastsoc.org/deepsky/ari/index.html\">constellation Aries</a>. Some 100 million light-years beyond the stars and nebulae of our Milky Way galaxy, the island universe is an enormous 200,000 light-years across. <a href=\"https://www.nasa.gov/image-feature/goddard/2019/hubble-spots-a-curious-spiral\">Also known as NGC 772</a>, it sports a prominent, outer spiral arm in <a href=\"https://app.astrobin.com/u/Robsi?i=nfm6vp\">this detailed cosmic portrait</a>. Tracking along sweeping dust lanes and <a href=\"http://arxiv.org/abs/0810.1748\">lined with</a> young blue star clusters, Arp 78's overdeveloped spiral arm is <a href=\"https://noirlab.edu/public/images/noirlab2209a/\">pumped-up</a> by galactic-scale gravitational tides. Interactions with its brightest companion galaxy, the more compact NGC 770 seen directly below the larger spiral, are likely responsible. Embedded in faint star streams revealed in the deep telescopic exposure, NGC 770's fuzzy, elliptical appearance contrasts nicely with spiky foreground Milky Way stars.<br><br><strong>APOD's email for image submissions has changed.</strong> Please see: <a href=\"https://apod.nasa.gov/apod/lib/apsubmit2015.html\">APOD Submissions</a>.<br><strong>Tomorrow's picture: </strong>a harvest"
// hdurl: "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/apod/apod/2026/october/NGC772_Robert_Eder.jpg?w=1772&h=1182&fit=clip&crop=faces%2Cfocalpoint"
// post_id: 1424625
// title: "Arp 78: Peculiar Galaxy in Aries"
// url: "https://science.nasa.gov/image-article/apod-2026-september-30-arp-78-peculiar-galaxy-in-aries/"


//     // const searchBox = document.createElement("div")
//     // section.append(searchBox)

//     // const searchInput = document.createElement("input")
//     // searchInput.type = "text"
//     // searchInput.id = "searchInput"
//     // searchBox.append(searchInput)

//     // const labelSearch = document.createElement("label")
//     // labelSearch.for = "searchInput"
//     // labelSearch.textContent = "Search"
//     // searchBox.append(labelSearch)