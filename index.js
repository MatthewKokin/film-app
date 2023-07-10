({ plugins: ['jsdom-quokka-plugin'] })

const Input = document.getElementById("search")
const searchBtn = document.getElementById("searchbtn")
let renderHTML = ``

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

function render(film) {
    fetch(`http://www.omdbapi.com/?apikey=8b639bc0&t=${film}`)
        .then(res => res.json())
        .then(filmData => {
            console.log(filmData)
            renderHTML += `
    <div class="film">
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
                    <div class="watchlist">
                        <img src="/images/watchlist.png">
                        <p>Watchlist</p>
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

// fetch("http://www.omdbapi.com/?apikey=8b639bc0&t=Blade-Runner")
//         .then(res => res.json())
//         .then(data => console.log(data))

// Need to figure out why HTML is not rendered... -_-