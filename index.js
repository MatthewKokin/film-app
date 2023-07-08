({plugins: ['jsdom-quokka-plugin']})

const Input = document.getElementById("search")
const searchBtn = document.getElementById("searchbtn")

searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    console.log(Input.value)
    Input.value =""
    fetch("http://www.omdbapi.com/?apikey=8b639bc0&s=Blade-Runner")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
})

