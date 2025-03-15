# Star Wars API Explorer

This project is a web application that interacts with the Star Wars API (SWAPI) to display information about characters and films from the Star Wars universe.

## Features

-   **Character Display:**
    -      Fetches and displays a list of Star Wars characters with basic information like name, gender, birth year, and physical attributes.
    -      Provides detailed information upon clicking "Show More Details," including homeworld, films, vehicles, starships, and data info.
    -      Displays resource counts (films, vehicles, etc.) using chip-style elements.
-   **Film Display:**
    -      Fetches and displays a list of Star Wars films with details like title, episode number, release date, director, and producer.
    -      Shows the opening crawl and counts of characters, planets, vehicles, starships, and species involved.
    -      Detailed information upon clicking "Show More Details."
-   **Search Functionality:**
    -      Allows users to search for characters by name, gender, hair color, eye color, or skin color.
    -      Dynamically filters and displays search results.
-   **Resource Details:**
    -      Fetches and displays detailed information about films, vehicles, starships, planets, and species associated with characters and films.
    -      Uses chip-style elements to display these related resources.
-   **Error Handling:**
    -      Handles API fetch errors and displays user-friendly error messages.
    -   Handles 404 errors for unknown pages.
-   **Dynamic Page Loading:**
    -   Loads character page when on the root or index.html
    -   Loads film page when on film-page.html.

## Technologies Used

-   HTML
-   CSS
-   JavaScript (ES6+)
-   Star Wars API (SWAPI)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/StealthyScripter/Asgardian-Tales.git]
    ```

2.  **Open `index.html` or `film-page.html` in your web browser.**

## Project Structure

-   `index.html`: Main page for displaying characters.
-   `film-page.html`: Page for displaying films.
-   `style.css`: Styles for the application.
-   `script.js`: JavaScript logic for fetching and displaying data.
-   `README.md`: Project documentation.

## Usage

-   **Viewing Characters:** Open `index.html` in your browser. Browse the list of characters. Click "Show More Details" for additional information.
-   **Searching Characters:** Use the search bar to filter characters by name or other attributes.
-   **Viewing Films:** Open `film-page.html` in your browser. Browse the list of films. Click "Show More Details" to view the opening crawl and related resources.

## API

This project uses the Star Wars API (SWAPI): <https://swapi.dev/api>

## Future Enhancements

-   Add pagination for large datasets.
-   Improve UI/UX with more interactive elements.
-   Implement filtering and sorting options.
-   Add support for other resource types (planets, species, etc.).
-   Add unit tests.
-   Add responsive design.
-   Improve the loading time

## Author

Brian Koringo