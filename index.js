({plugins: ['jsdom-quokka-plugin']})

const Input = document.getElementById("search")
const searchBtn = document.getElementById("searchbtn")
let renderHTML = ``

searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    console.log(Input.value)
    fetch(`http://www.omdbapi.com/?apikey=8b639bc0&s=${Input.value}`)
        .then(res => res.json())
        .then(data => {
            const filmsArray = data.Search.map(film => film.Title)
            console.log(filmsArray)
            filmsArray.forEach(film => render(film))
            document.getElementsByClassName("render")[0].innerHTML = renderHTML
        Input.value =""
        })
})

function render(film){
    fetch(`http://www.omdbapi.com/?apikey=8b639bc0&t=${film}`)
        .then(res => res.json())
        .then(filmData => {
            console.log(filmData)
            renderHTML += `
    <div class="film">
            <img src="${filmData.Poster}" class="img">
            <div class="info">
                <div class="head">
                    <h3>${filmData.Title}</h3>
                    <img src="/images/star.png">
                    <p>${filmData.Ratings[0].Value}</p>
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
        })
}

// fetch("http://www.omdbapi.com/?apikey=8b639bc0&t=Blade-Runner")
//         .then(res => res.json())
//         .then(data => console.log(data))

// Need to figure out why HTML is not rendered... -_-