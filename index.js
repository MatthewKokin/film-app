({ plugins: ['jsdom-quokka-plugin'] })
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
console.log(uuidv4())

const Input = document.getElementById("search")
const searchBtn = document.getElementById("searchbtn")
let renderHTML = ``
let watchListHtml = ""
let watchlistAraay = []

searchBtn.addEventListener("click", function (e) {
    e.preventDefault()
    renderHTML = ``
    fetch(`http://www.omdbapi.com/?apikey=8b639bc0&s=${Input.value}`)
        .then(res => res.json())
        .then(data => {
            if (!data.Search) {
                document.getElementsByClassName("cont")[0].innerHTML = '<p class="err">Unable to find what you’re looking for. Please try another search.</p>'
                return;
            } else{
                const filmsSet = new Set(data.Search.map(film => film.Title))
                //Set allows to store unique values, repeated value will be not added again. However, Set is different to array, so you need to convert it to the array to use it later
                const filmsArray = Array.from(filmsSet)
                filmsArray.forEach(film => render(film))
                Input.value = ""
            }
        })
})


document.getElementsByClassName("render")[0].addEventListener("click", function(e){
    if(e.target.id === "btn") {
        console.log(e.target.dataset.uuid)
        let uuidToRemove = e.target.dataset.uuid; // get the uuid from the event target
        let elementToRemove = document.querySelector(`.film[data-uuid="${uuidToRemove}"]`)
        watchlistAraay.push(elementToRemove.innerHTML)
        console.log(watchlistAraay)
        elementToRemove.remove(); // remove the element from the DOM
        renderWishList()
    }
})

function renderWishList(){
    let watchListElement = document.getElementById("w");
    if(watchListElement) { // Check if the element exists
        watchListElement.innerHTML = watchlistAraay.join('');
    }
}

//trying to render saved films to other page


function render(film) {
    fetch(`http://www.omdbapi.com/?apikey=8b639bc0&t=${film}`)
        .then(res => res.json())
        .then(filmData => {
            let filmId = uuidv4()
            renderHTML += `
    <div class="film" data-uuid="${filmId}">
        <img src="${filmData.Poster !== 'N/A' ? filmData.Poster : '/images/no-image.jpeg'}" class="img">
            <div class="info">
                <div class="head">
                    <h3>${filmData.Title}</h3>
                    <img src="/images/star.png">
                    <p>${filmData.Ratings && filmData.Ratings[0] ? filmData.Ratings[0].Value : 'N/A'}</p>
                </div>
                <div class="discription">
                    <p>${filmData.Runtime}</p>
                    <p class="genre">${filmData.Genre}</p>
                    <div class="watchlist" id="watchlist">
                        <img src="/images/watchlist.png">
                        <p id="btn" data-uuid="${filmId}">Watchlist</p>
                    </div>
                </div>
                <div class="summary">
                    <p>${filmData.Plot}</p>
                </div>
            </div>
        </div>`
            document.getElementsByClassName("render")[0].innerHTML = renderHTML
        })
}

