// Base URL
const BASE_URL = 'https://swapi.dev/api';


//Global variable to store the character data for search functionality
let allCharacters = [];

//Function to fetch all people/charcters
async function fetchPeople() {
    try{
        const response = await fetch(`${BASE_URL}/people/`);
        const data = await response.json();

        const peopleData = data.results;
        allCharacters = [...peopleData]; //store for the search functionality
        
        const container = document.getElementById('container');
        container.className = 'character-grid';
            container.innerHTML=  '';

        for (const character of peopleData) {
            const card = document.createElement('div');
            card.className = 'character-card';

            //count the number of films, vehicles, starships and find the species
            const filmsCount = getResourceCount(character.films);
            const vehiclesCount = getResourceCount(character.vehicles);
            const starshipsCount = getResourceCount(character.starships);
            const speciesCount = getResourceCount(character.species);
            let planetName = '';

            //Get homeworld data to display the name and/or properties later
            const homeworldData = await getDataFromUrl(character.homeworld);
            planetName = homeworldData ? homeworldData.name : 'unknown';
              
               card.innerHTML = `
               <div class="card-header">
                        <h2 class="card-title">${character.name}</h2>
                    </div>
                    <div class="card-body">
                        <div class="info-group">
                            <div class="info-label">Physical Attributes</div>
                            <div class="info-value">
                                ${character.gender !== "n/a" ? `${character.gender}, ` : ""}
                                ${character.height}cm, ${character.mass}kg
                            </div>
                        </div>
                        
                        <div class="info-group">
                            <div class="info-label">Appearance</div>
                            <div class="info-value">
                                ${character.hair_color !== "n/a" ? `Hair: ${character.hair_color}<br>` : ""}
                                Skin: ${character.skin_color}<br>
                                Eyes: ${character.eye_color}
                            </div>
                        </div>
                        
                        <div class="info-group">
                            <div class="info-label">Birth Year</div>
                            <div class="info-value">${character.birth_year}</div>
                        </div>
                        
                        <div class="info-group">
                            <div class="info-label">Appears In</div>
                            <div class="info-value">
                                <div class="chip-container">
                                    <span class="chip">${filmsCount} Films</span>
                                    ${vehiclesCount ? `<span class="chip">${vehiclesCount} Vehicles</span>` : ''}
                                    ${starshipsCount ? `<span class="chip">${starshipsCount} Starships</span>` : ''}
                                    ${speciesCount ? `<span class="chip">${speciesCount} Species</span>` : '<span class="chip">Human</span>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                    <div class="details-section">
                        <div class="info-group">
                            <div class="info-label">Homeworld</div>
                            <div class="info-value">${planetName}</div>
                        </div>
                        
                        <div class="info-group">
                            <div class="info-label">Films</div>
                            <div class="info-value">
                                <div class="chip-container films-container">
                                    <span>Loading films</span>
                                </div>
                            </div>
                        </div>
                        
                        ${vehiclesCount ? `
                            <div class="info-group">
                                <div class="info-label">Vehicles</div>
                                <div class="info-value">
                                    <div class="chip-container vehicles-container">
                                        <span class="loading">Loading vehicles...</span>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                            
                            ${starshipsCount ? `
                            <div class="info-group">
                                <div class="info-label">Starships</div>
                                <div class="info-value">
                                    <div class="chip-container starships-container">
                                        <span class="loading">Loading starships...</span>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                        
                        <div class="info-group">
                            <div class="info-label">Data Info</div>
                            <div class="info-value">
                                Created: ${new Date(character.created).toLocaleDateString()}<br>
                                Last updated: ${new Date(character.edited).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
               `;
               container.appendChild(card);

               // Fetch and add the detailed data for films, vehicles, and starships
            if (filmsCount > 0) {
                const filmsContainer = card.querySelector('.films-container');
                filmsContainer.innerHTML = ``;
                
                for (const filmUrl of character.films) {
                    const filmData = await getDataFromUrl(filmUrl);
                    if (filmData) {
                        const filmChip = document.createElement('span');
                        filmChip.className = 'chip';
                        filmChip.textContent = filmData.title;
                        filmsContainer.appendChild(filmChip);
                    }
                }
            }
            
            if (vehiclesCount > 0) {
                const vehiclesContainer = card.querySelector('.vehicles-container');
                vehiclesContainer.innerHTML = '';
                
                for (const vehicleUrl of character.vehicles) {
                    const vehicleData = await getDataFromUrl(vehicleUrl);
                    if (vehicleData) {
                        const vehicleChip = document.createElement('span');
                        vehicleChip.className = 'chip';
                        vehicleChip.textContent = vehicleData.name;
                        vehiclesContainer.appendChild(vehicleChip);
                    }
                }
            }
            
            if (starshipsCount > 0) {
                const starshipsContainer = card.querySelector('.starships-container');
                starshipsContainer.innerHTML = '';
                
                for (const starshipUrl of character.starships) {
                    const starshipData = await getDataFromUrl(starshipUrl);
                    if (starshipData) {
                        const starshipChip = document.createElement('span');
                        starshipChip.className = 'chip';
                        starshipChip.textContent = starshipData.name;
                        starshipsContainer.appendChild(starshipChip);
                    }
                }
            }
            
        }
    }
    catch (error) {
        console.error('Error fetching the people data: ', error);
        return;
    }  
}

async function initializeFilmPage() {
    try {
        const response = await fetch(`${BASE_URL}/films/`);
        const data = await response.json();
        
        const filmData = data.results;
        console.log('Film data: ', filmData);

        const container = document.getElementById('container');
        container.className = 'character-grid';
        container.innerHTML = '';

        for (const film of filmData) {
            const card = document.createElement('div');
            card.className = 'film-card';
            
            // Count the number of characters, planets, vehicles, starships, and species
            const charactersCount = getResourceCount(film.characters);
            const planetsCount = getResourceCount(film.planets);
            const vehiclesCount = getResourceCount(film.vehicles);
            const starshipsCount = getResourceCount(film.starships);
            const speciesCount = getResourceCount(film.species);
            
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${film.title}</h2>
                    <div class="film-episode">Episode ${film.episode_id}</div>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Release Date</div>
                        <div class="info-value">${film.release_date}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Director</div>
                        <div class="info-value">${film.director}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Producer</div>
                        <div class="info-value">${film.producer}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Features</div>
                        <div class="info-value">
                            <div class="chip-container">
                                <span class="chip">${charactersCount} Characters</span>
                                <span class="chip">${planetsCount} Planets</span>
                                <span class="chip">${vehiclesCount} Vehicles</span>
                                <span class="chip">${starshipsCount} Starships</span>
                                <span class="chip">${speciesCount} Species</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Opening Crawl</div>
                        <div class="info-value opening-crawl">${film.opening_crawl.replace(/\r\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Characters</div>
                        <div class="info-value">
                            <div class="chip-container characters-container">
                                <span class="loading">Loading characters...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Planets</div>
                        <div class="info-value">
                            <div class="chip-container planets-container">
                                <span class="loading">Loading planets...</span>
                            </div>
                        </div>
                    </div>
                    
                    ${vehiclesCount ? `
                    <div class="info-group">
                        <div class="info-label">Vehicles</div>
                        <div class="info-value">
                            <div class="chip-container vehicles-container">
                                <span class="loading">Loading vehicles...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${starshipsCount ? `
                    <div class="info-group">
                        <div class="info-label">Starships</div>
                        <div class="info-value">
                            <div class="chip-container starships-container">
                                <span class="loading">Loading starships...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${speciesCount ? `
                    <div class="info-group">
                        <div class="info-label">Species</div>
                        <div class="info-value">
                            <div class="chip-container species-container">
                                <span class="loading">Loading species...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="info-group">
                        <div class="info-label">Data Info</div>
                        <div class="info-value">
                            Created: ${new Date(film.created).toLocaleDateString()}<br>
                            Last updated: ${new Date(film.edited).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
            
            // Fetch and add the detailed data for characters
            if (charactersCount > 0) {
                const charactersContainer = card.querySelector('.characters-container');
                charactersContainer.innerHTML = '';
                
                for (const characterUrl of film.characters) {
                    const characterData = await getDataFromUrl(characterUrl);
                    if (characterData) {
                        const characterChip = document.createElement('span');
                        characterChip.className = 'chip';
                        characterChip.textContent = characterData.name;
                        charactersContainer.appendChild(characterChip);
                    }
                }
            }
            
            // Fetch and add the detailed data for planets
            if (planetsCount > 0) {
                const planetsContainer = card.querySelector('.planets-container');
                planetsContainer.innerHTML = '';
                
                for (const planetUrl of film.planets) {
                    const planetData = await getDataFromUrl(planetUrl);
                    if (planetData) {
                        const planetChip = document.createElement('span');
                        planetChip.className = 'chip';
                        planetChip.textContent = planetData.name;
                        planetsContainer.appendChild(planetChip);
                    }
                }
            }
            
            // Fetch and add the detailed data for vehicles
            if (vehiclesCount > 0) {
                const vehiclesContainer = card.querySelector('.vehicles-container');
                vehiclesContainer.innerHTML = '';
                
                for (const vehicleUrl of film.vehicles) {
                    const vehicleData = await getDataFromUrl(vehicleUrl);
                    if (vehicleData) {
                        const vehicleChip = document.createElement('span');
                        vehicleChip.className = 'chip';
                        vehicleChip.textContent = vehicleData.name;
                        vehiclesContainer.appendChild(vehicleChip);
                    }
                }
            }
            
            // Fetch and add the detailed data for starships
            if (starshipsCount > 0) {
                const starshipsContainer = card.querySelector('.starships-container');
                starshipsContainer.innerHTML = '';
                
                for (const starshipUrl of film.starships) {
                    const starshipData = await getDataFromUrl(starshipUrl);
                    if (starshipData) {
                        const starshipChip = document.createElement('span');
                        starshipChip.className = 'chip';
                        starshipChip.textContent = starshipData.name;
                        starshipsContainer.appendChild(starshipChip);
                    }
                }
            }
            
            // Fetch and add the detailed data for species
            if (speciesCount > 0) {
                const speciesContainer = card.querySelector('.species-container');
                speciesContainer.innerHTML = '';
                
                for (const speciesUrl of film.species) {
                    const speciesData = await getDataFromUrl(speciesUrl);
                    if (speciesData) {
                        const speciesChip = document.createElement('span');
                        speciesChip.className = 'chip';
                        speciesChip.textContent = speciesData.name;
                        speciesContainer.appendChild(speciesChip);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching film information:', error);
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>Error Loading Films</h2>
                    <p>Unable to load film data. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
        return;
    }
}

// Get count of resource arrays (films, vehicles, etc.)
function getResourceCount(arr) {
    return arr && arr.length ? arr.length : 0;
}

// Extract ID from URL
async function getDataFromUrl(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data; // Return the full object with all its properties
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }
    

 // Toggle details section
 function toggleDetails(button) {
    const detailsSection = button.nextElementSibling;
    const isActive = detailsSection.classList.contains('active');
    
    if (isActive) {
        detailsSection.classList.remove('active');
        button.textContent = 'Show More Details';
    } else {
        detailsSection.classList.add('active');
        button.textContent = 'Hide Details';
    }
}

// Search functionality
function setupSearch(){
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (!allCharacters || allCharacters.length === 0) {
            console.error('No character data available for search');
            return;
        }
        
        const filteredCharacters = allCharacters.filter(char => 
            char.name.toLowerCase().includes(searchTerm) ||
            char.gender.toLowerCase().includes(searchTerm) ||
            char.eye_color.toLowerCase().includes(searchTerm) ||
            char.hair_color.toLowerCase().includes(searchTerm) ||
            char.skin_color.toLowerCase().includes(searchTerm)
        );
        
        const container = document.getElementById('container');
        container.innerHTML = '';
        container.className = 'character-grid';
        
        if (filteredCharacters.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 30px;">No characters found matching your search.</div>';
            return;
        }
        
        // This is a simplified version. I will later use the samelogic as fetchPeople
        for (const character of filteredCharacters) {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${character.name}</h2>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Gender</div>
                        <div class="info-value">${character.gender}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Birth Year</div>
                        <div class="info-value">${character.birth_year}</div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Height</div>
                        <div class="info-value">${character.height}cm</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Mass</div>
                        <div class="info-value">${character.mass}kg</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Hair Color</div>
                        <div class="info-value">${character.hair_color}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Eye Color</div>
                        <div class="info-value">${character.eye_color}</div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });

};

function initializeApp() {
    const path = window.location.pathname;

    // Check if the path is empty (root of the site)
    if (path === '/' || path === '' || path === '/index.html') {
        fetchPeople();
        
    } else if(path === '/film-page' || path === '/film-page.html') {
        initializeFilmPage();

    } else {
        // Handle unknown paths or non-existent pages
        console.error('Page not found: ' + path);
        const container = document.getElementById('category-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>404 Error</h2>
                    <p>The page you are looking for does not exist.</p>
                    <p>Please check the URL and try again.</p>
                </div>
            `;
        }
    }
}

// Run when the page is loaded
document.addEventListener('DOMContentLoaded', initializeApp);