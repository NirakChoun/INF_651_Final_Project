# INF 651 Final Project: Recipe Finder App
Here is the demo of my website: https://nirakchoun.github.io/INF_651_Final_Project/

## Project Overview

**DishCover** is a recipe finder app designed to help users discover, save, and plan meals using recipes sourced from the Spoonacular API. The app includes various features:

1. **Home Page**: Features a carousel highlighting the app's features, a features section, and testimonials.
2. **Discover Page**: Allows users to search for recipes, view them on the Spoonacular website, or save them to their favorites.
3. **Random Page**: Users can randomize a recipe, view it, or save it to their favorites.
4. **Meal-Plan Page**: Enables users to plan their weekly meal plan, including breakfast, lunch, and dinner, and track their total calorie intake.
5. **Favorites Page**: Displays all the recipes saved by the user.

## Development Process

### Technologies Used

- **HTML**: For the structure of the web pages.
- **CSS**: For styling the application.
- **Bootstrap 5**: For responsive design and pre-built components.
- **JavaScript/jQuery**: For interactivity and DOM manipulation.
- **Spoonacular API**: For fetching recipe data.
- **FullCalendar**: For implementing the meal plan calendar.

## Feature Implementation

### Home Page

1. **Carousel**: Implemented using Bootstrap’s carousel component.
2. **Features Section**: Highlighted the main features of the app.
3. **Testimonial Section**: Included user testimonials to build credibility.

### Discover Page

1. **Search Functionality**: Utilized the Spoonacular API to fetch recipes based on user queries.
2. **View Recipe**: Linked the recipe details to the Spoonacular website.
3. **Save to Favorites**: Implemented a feature to save recipes to the local storage.

### Random Page

1. **Random Recipe Generation**: Used the Spoonacular API to fetch a random recipe.
2. **View and Save Options**: Similar to the Discover Page, with options to view or save the recipe.

### Meal Plan Page

1. **FullCalendar Integration**: Implemented a calendar to plan meals.
2. **Recipe Modal**: Displayed a modal with recipes to add to the meal plan.
3. **Calorie Count**: Calculated and displayed the total calorie intake for the week.

### Favorites Page

1. **Display Saved Recipes**: Fetched recipes from local storage and displayed them.
2. **Remove from Favorites**: Allowed users to remove recipes from their favorites.

## Challenges Faced and Solutions

1. **API Rate Limiting**: Faced issues with API rate limits. Implemented local storage to save recipes and reduce API calls.
2. **Dynamic Content Handling**: Managed to handle dynamic content loading using jQuery to ensure a smooth user experience.
3. **Responsive Design**: Ensured the app is fully responsive and works well on different devices by using CSS and Bootstrap.
4. **Calendar Integration**: Integrating FullCalendar and customizing it for meal planning was challenging. Solved it by carefully studying the FullCalendar documentation and experimenting with different configurations.
5. **Error Handling**: Implemented comprehensive error handling to manage API errors and user input validation.

## Future Improvements

- **User Authentication**: Implement user authentication to allow personalized meal planning and favorites across devices.
- **Enhanced Search**: Improve the search functionality with advanced filters and sorting options.
- **Social Sharing**: Add features to share favorite recipes on social media platforms.

## Conclusion

The DishCover project was a comprehensive exercise in front-end web development, integrating multiple technologies and overcoming various challenges. The final application provides users with a robust and interactive platform for discovering, saving, and planning recipes. Through this project, I gained valuable experience in using APIs, managing state, ensuring responsiveness, and implementing advanced UI components like FullCalendar.

