/* Home Page */

// Toggle sidebar visibility
$('#sidebarToggle').on('click', function() {
    $('#sidebar').toggleClass('sidebar-open');
});

// Close sidebar
$('#sidebarClose').on('click', function() {
    $('#sidebar').removeClass('sidebar-open');
});

/* Discover Page */
const apiKey = '4eb93ca2386041809aa7ab782cc91067'; // API key for Spoonacular API
const recipesPerPage = 27; // Number of recipes to display per page
let currentPage = 1; // Initialize current page
let searchQuery = ''; // Initialize search query

// Fetch recipes from Spoonacular API
function fetchRecipes(page, query = '') {
    const offset = (page - 1) * recipesPerPage; // Calculate the offset for pagination
    const url = `https://api.spoonacular.com/recipes/complexSearch?number=${recipesPerPage}&offset=${offset}&apiKey=${apiKey}&query=${encodeURIComponent(query)}`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            const recipes = data.results;
            renderRecipes(recipes); // Render recipes on the page
            renderPagination(data.totalResults, page); // Render pagination controls
        },
        error: function(error) {
            console.error('Error:', error); // Log any errors
        }
    });
}

// Render the list of recipes
function renderRecipes(recipes) {
    const recipesContainer = $('#recipes');
    const noRecipesMessage = $('#no-recipes');
    
    recipesContainer.empty(); // Clear previous recipes

    if (recipes.length === 0) {
        noRecipesMessage.show(); // Show message if no recipes found
    } else {
        noRecipesMessage.hide(); // Hide message if recipes are found
        recipes.forEach(recipe => {
            const recipeCard = `
                <div class="col-md-4 mb-4">
                    <div class="card mb-4 hover-shadow">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <div class="d-flex">
                                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" class="btn btn-success me-2" target="_blank">View Recipe</a>
                                <button class="btn btn-danger save-recipe" data-recipe='${encodeURIComponent(JSON.stringify(recipe))}'>Save Recipe</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            recipesContainer.append(recipeCard); // Append recipe card to container
        });
    }
}

// Save recipe to local storage
$(document).on('click', '.save-recipe', function() {
    const recipe = JSON.parse(decodeURIComponent($(this).attr('data-recipe')));
    saveRecipe(recipe); // Call saveRecipe function
});

// Function to save a recipe to local storage
function saveRecipe(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if recipe already exists in favorites
    if (!favorites.some(fav => fav.id === recipe.id)) {
        favorites.push(recipe); // Add recipe to favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Update local storage
        alert('Recipe saved to favorites!');
    } else {
        alert('Recipe already in favorites!');
    }
}

// Render pagination controls
function renderPagination(totalResults, currentPage) {
    const totalPages = Math.ceil(totalResults / recipesPerPage); // Calculate total number of pages
    const paginationContainer = $('#pagination');
    paginationContainer.empty(); // Clear previous pagination

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
        paginationContainer.append(`<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a></li>`);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationContainer.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
    }

    if (currentPage < totalPages) {
        paginationContainer.append(`<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a></li>`);
    }
}

// Change the page and fetch new recipes
function changePage(page) {
    currentPage = page;
    fetchRecipes(page, searchQuery); // Fetch recipes for the new page
}

// Handle search input and update recipes
function handleSearch() {
    searchQuery = $('#search-input').val(); // Get search query from input
    currentPage = 1; // Reset to first page
    fetchRecipes(currentPage, searchQuery); // Fetch recipes based on search query
}

// Attach search event listener to input
$('#search-input').on('input', handleSearch);

// Initial fetch of recipes
fetchRecipes(currentPage);

/* Favorites Page */

// Load favorite recipes from local storage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesContainer = $("#favorites");

    favoritesContainer.empty(); // Clear previous favorites

    if (favorites.length === 0) {
        favoritesContainer.html("<p>No favorite recipes found.</p>"); // Show message if no favorites
    } else {
        favorites.forEach((recipe) => {
            const recipeCard = `
                <div class="col-md-4 mb-4">
                    <div class="card mb-4">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <div class="d-flex">
                                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" class="btn btn-success me-2" target="_blank">View Recipe</a>
                                <button class="btn btn-danger" onclick='removeRecipe(${JSON.stringify(recipe.id)})'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            favoritesContainer.append(recipeCard); // Append favorite recipe card to container
        });
    }
}

// Remove a recipe from local storage
function removeRecipe(recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((recipe) => recipe.id !== recipeId); // Filter out the recipe to be removed
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update local storage
    loadFavorites(); // Refresh the list after deletion
}

// Initial load of favorites
$(document).ready(function () {
    loadFavorites();
});

/* Random Page */

// Fetch and display a random recipe
$(document).ready(function() {
    $('#randomButton').on('click', function() {
        $.getJSON(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`, function(data) {
            const recipe = data.recipes[0];
            const recipeCard = `
                <div class="col-md-4 mb-4">
                    <div class="card mb-4 hover-shadow">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <div class="d-flex">
                                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" class="btn btn-success me-2" target="_blank">View Recipe</a>
                                <button class="btn btn-danger save-recipe" data-recipe='${encodeURIComponent(JSON.stringify(recipe))}'>Save Recipe</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#recipe-card').html(recipeCard); // Display the random recipe
        });
    });

    // Save random recipe
    $(document).on('click', '.save-recipe', function() {
        const recipe = JSON.parse(decodeURIComponent($(this).attr('data-recipe')));
        saveRecipe(recipe); // Call saveRecipe function
    });

    // Function to save a recipe to local storage
    function saveRecipe(recipe) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Check if recipe already exists
        if (!favorites.some(fav => fav.id === recipe.id)) {
            favorites.push(recipe); // Add recipe to favorites
            localStorage.setItem('favorites', JSON.stringify(favorites)); // Update local storage
            alert('Recipe saved to favorites!');
        } else {
            alert('Recipe already in favorites!');
        }
    }
});

/* Meal Plan Page */

// Handle meal plan functionality
$(document).ready(function() {
    // Modal functionality
    const modal = $('#recipeModal');
    const closeModal = $('.close');
    const searchInput = $('#searchInput');
    let currentSlot;

    // Close the modal when the close button is clicked
    closeModal.on('click', function() {
        modal.hide();
    });

    // Close the modal when clicking outside of it
    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });

    // Load recipes into the modal
    function loadRecipes(query) {
        const recipeList = $('#recipeList');
        recipeList.html('<p>Loading recipes...</p>'); // Show loading message

        // Fetch recipes from Spoonacular API
        $.ajax({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&addRecipeNutrition=true&apiKey=${apiKey}`,
            method: 'GET',
            success: function(data) {
                const recipes = data.results;
                let recipeListHtml = '';

                recipes.forEach(function(recipe) {
                    recipeListHtml += `
                        <div class="card">
                            <img src="${recipe.image}" alt="${recipe.title}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                                <button class="select-recipe mp-button" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}" data-calories="${recipe.nutrition.nutrients.find(n => n.name === 'Calories').amount}">
                                    Select
                                </button>
                            </div>
                        </div>
                    `;
                });

                recipeList.html(recipeListHtml); // Display the recipes in the modal

                // Add click event to each select button
                $('.select-recipe').on('click', function() {
                    const recipe = {
                        id: $(this).data('id'),
                        title: $(this).data('title'),
                        image: $(this).data('image'),
                        calories: parseFloat($(this).data('calories'))
                    };
                    selectRecipe(recipe); // Call selectRecipe function
                    modal.hide();
                });
            },
            error: function() {
                recipeList.html('<p>Error loading recipes. Please try again later.</p>'); // Show error message
            }
        });
    }

    // Event listener for search input
    searchInput.on('input', function() {
        const query = $(this).val();
        loadRecipes(query); // Load recipes based on search query
    });

    // Click event for meal slots
    $('.meal-slot').on('click', function() {
        modal.show(); // Show the modal
        currentSlot = $(this); // Set current slot
        loadRecipes(''); // Load recipes with empty query
    });

    // Select a recipe and update meal slot
    function selectRecipe(recipe) {
        const img = $('<img>').attr('src', recipe.image);
        const p = $('<p>').text(recipe.title);

        currentSlot.empty().append(img, p); // Update meal slot with selected recipe
        currentSlot.data('calories', recipe.calories);

        saveMealPlan(); // Save updated meal plan
        updateCalories(); // Update total calories
    }

    // Update total calories for each day
    function updateCalories() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        days.forEach(function(day) {
            let totalCalories = 0;
            $(`.meal-slot[data-day=${day}]`).each(function() {
                if ($(this).data('calories')) {
                    totalCalories += parseFloat($(this).data('calories'));
                }
            });
            $(`.total-calories[data-day=${day}]`).text(totalCalories.toFixed(2)); // Display total calories
        });
    }

    // Save meal plan to local storage
    function saveMealPlan() {
        const mealPlan = {};

        $('.meal-slot').each(function() {
            const meal = $(this).data('meal');
            const day = $(this).data('day');
            const calories = $(this).data('calories') || 0;
            const content = $(this).html();

            if (!mealPlan[day]) {
                mealPlan[day] = {};
            }
            mealPlan[day][meal] = {
                content: content,
                calories: calories
            };
        });

        localStorage.setItem('mealPlan', JSON.stringify(mealPlan)); // Update local storage
    }

    // Load meal plan from local storage
    function loadMealPlan() {
        const mealPlan = JSON.parse(localStorage.getItem('mealPlan'));

        if (mealPlan) {
            Object.keys(mealPlan).forEach(function(day) {
                Object.keys(mealPlan[day]).forEach(function(meal) {
                    const slot = $(`.meal-slot[data-day=${day}][data-meal=${meal}]`);
                    slot.html(mealPlan[day][meal].content); // Update meal slot content
                    slot.data('calories', mealPlan[day][meal].calories); // Update meal slot calories
                });
            });
            updateCalories(); // Update total calories
        }
    }

    // Initial load of meal plan
    loadMealPlan();
});
