const form = document.querySelector('#form');
const search = document.querySelector('#search');
const resultMsg = document.querySelector('.resultsMsg');
const resultsContainer = document.querySelector('#resultsContainer');
const single_meal = document.querySelector('#single-meal');

//show error if empty input on submit:
const showError = (search, message) => {
    const formControl = search.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}

const getResults = (searchInput) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            resultMsg.innerHTML = `<h2>Search results for '${searchInput}':</h2>`;
            if (data.meals === null) {
                resultMsg.innerHTML = `<h3>No results for '${searchInput}' <br> Please try again</h3>`
            } else {
                resultsContainer.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <div class="meal-info" data.mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                                <br></br>
                            </div>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>  
                        </div>
                `
                    )
                    .join('');
            }
            console.log(data)
        })
}

// search for meal & fetch from API:
const searchMeal = (e) => {
    //clear single meal
    single_meal.innerHTML = '';

    // clear error message:
    const small = document.querySelector('small')
    small.innerText = '';

    // get search term:
    const searchInput = search.value;

    return(searchInput.trim()) ? getResults(searchInput) : showError(search, 'Please type something to search for');
}

// event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    searchMeal();
})