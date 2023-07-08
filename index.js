({plugins: ['jsdom-quokka-plugin']})

const Input = document.getElementById("search")
const searchBtn = document.getElementById("searchbtn")
let renderHTML = ``

searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    console.log(Input.value)
    Input.value =""
    fetch("http://www.omdbapi.com/?apikey=8b639bc0&s=Blade-Runner")
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(film => render(film))
            console.log(data)
        })
})

function render(film){
    renderHTML = `
    <div class="film">
            <img src="/images/image.png">
            <div class="info">
                <div class="head">
                    <h3>${film.Title}</h3>
                    <img src="${film.Poster}">
                    <p>8.1</p>
                </div>
                <div class="discription">
                    <p>117 min</p>
                    <p class="genre">Action, Drama, Sci-fi</p>
                    <div class="watchlist">
                        <img src="/images/watchlist.png">
                        <p>Watchlist</p>
                    </div>
                </div>
                <div class="summary">
                    <p>A blade runner must pursue and terminate four replicants who
                        stole a ship in space, and have returned to Earth to find
                        their creator.</p>
                </div>
            </div>
        </div>`
        document.getElementsByClassName("render")[0].innerHTML += renderHTML
}

fetch("http://www.omdbapi.com/?apikey=8b639bc0&s=Blade-Runner")
        .then(res => res.json())
        .then(data => console.log(data))

// Started to work on rendering everything 
//So, finish the render function first