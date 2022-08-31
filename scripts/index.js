//get all the required elements
var searchBar = document.getElementById("searchBar");
var mealsList = document.getElementById("meals-list");
var searchBtn = document.getElementById("search-btn");

//get the searched string
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  searchResult(searchString);
});

//add click event to search button
searchBtn.addEventListener("click", () => {
  const searchString = searchBar.value.toLowerCase();
  searchResult(searchString);
});

//fetch data from meal url
const searchResult = async (searchString) => {
  try {
    //create dynamic url
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`
    );
    var result = await res.json();
    //display the result
    displayResults(result.meals);
  } catch (err) {
    console.error(err);
  }
};

// display the results
const displayResults = (meals) => {
  let localArray = JSON.parse(localStorage.getItem("favMeals"));
  if (meals === null) {
    mealsList.innerHTML = "<h1> No Meal Availaible</h1>";
  } else {
    const mealString = meals
      .map((meal) => {
        let recipeId = meal.idMeal;
        let isFav = false;
        if (localArray.indexOf(recipeId) != -1) {
          isFav = true;
        }
        //create dynamic li
        return `<li class="meal">
            <img src="${meal.strMealThumb}" /img>
             <div class="meal-name" id="${meal.idMeal}">
             <h2 class="recipe-name">${meal.strMeal}</h2> 
             <i class="${isFav ? "fas" : "far"} fa-heart fav-btn"></i>
             </div>
             </li>`;
      })
      .join("");
    mealsList.innerHTML = mealString;
  }
};

// create local storage
function createLocalstorage() {
  let localArray = [];
  if (localStorage.getItem("favMeals") == null) {
    //create a new localStorage
    localStorage.setItem("favMeals", JSON.stringify(localArray));
  }
}

// add event listener to ul id="meals-list"
mealsList.addEventListener("click", (e) => {
  //show recipe detail if user click on recipe-name
  if (e.target.className == "recipe-name") {
    let recipeId = e.target.parentNode.id;
    window.open(`detail.html?id=${recipeId}`);
  } else if (e.target.classList.contains("fav-btn")) {
    let recipeId = e.target.parentNode.id;
    let localArray = JSON.parse(localStorage.getItem("favMeals"));
    if (localArray.indexOf(recipeId) != -1) {
      localArray = localArray.filter((item) => item != recipeId);
      localStorage.setItem("favMeals", JSON.stringify(localArray));
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else {
      localArray.push(recipeId);
      localStorage.setItem("favMeals", JSON.stringify(localArray));
      e.target.classList.remove("far");
      e.target.classList.add("fas");
      alert("Added to Favourites");
    }
  }
});

// load the data from local storage
document.addEventListener("DOMContentLoaded", createLocalstorage);
