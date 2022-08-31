// get the required elements
let favMeals = JSON.parse(localStorage.getItem("favMeals"));
var mealsList = document.getElementById("meals-list");

//fetch data from mealId
const fetchData = async (mealId) => {
  try {
    //create dynamic url
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let result = await res.json();
    displayResults(result.meals[0]);
  } catch (error) {
    console.error(error);
  }
};

// function to show favourite meals
const showFavourites = () => {
  //if there is no meal
  if (favMeals.length === 0) {
    mealsList.innerHTML = "<h1>Oops! No Favourite Meals Present</h1>";
  } else {
    mealsList.innerHTML = "";
    favMeals.map((mealId) => {
      fetchData(mealId);
    });
  }
};

// function to display the results to user
const displayResults = (meal) => {
  let isFav = true;
  //create dynamic li
  mealsList.innerHTML += `<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="${isFav ? "fas" : "far"} fa-heart fav-btn"></i>
     </div>
     </li>`;
};

// add event listener to mealsList
mealsList.addEventListener("click", (e) => {
  //show recipe detail if user click on recipe-name
  if (e.target.className == "recipe-name") {
    let recipeId = e.target.parentNode.id;
    window.open(`detail.html?id=${recipeId}`);
  } else if (e.target.classList.contains("fav-btn")) {
    let recipeId = e.target.parentNode.id;
    let localArray = JSON.parse(localStorage.getItem("favMeals"));
    localArray = localArray.filter((item) => item != recipeId);
    localStorage.setItem("favMeals", JSON.stringify(localArray));
    favMeals = JSON.parse(localStorage.getItem("favMeals"));
    alert("Removed From Favourites");
    showFavourites();
  }
});

//call showFavourites
showFavourites();
