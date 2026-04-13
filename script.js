async function searchMeal() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("mealResults");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    if (!data.meals) {
      resultsDiv.innerHTML = "<p>No meals found. Try another search.</p>";
      return;
    }

    resultsDiv.innerHTML = data.meals.map(meal => `
      <div class="meal-card">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="250">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
      </div>
    `).join("");
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching meals. Please try again later.</p>";
    console.error("Error:", error);
  }
}

// Geolocation Feature
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function success(position) {
  alert("Latitude: " + position.coords.latitude + 
  "\nLongitude: " + position.coords.longitude);
}

function error() {
  alert("Sorry, no position available.");
}

// Run automatically when the page loads
window.onload = getLocation;

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault(); // stop default form submission
      alert("Thank you! Your booking has been submitted.");
      window.location.href = "confirm.html"; // redirect after popup
    });
  }
});
