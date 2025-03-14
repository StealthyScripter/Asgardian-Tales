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

// Function to fetch and display all vehicles
async function fetchVehicles() {
    try {
        const response = await fetch(`${BASE_URL}/vehicles/`);
        const data = await response.json();

        const vehiclesData = data.results;
        
        const container = document.getElementById('container');
        container.className = 'vehicle-grid';
        container.innerHTML = '';

        for (const vehicle of vehiclesData) {
            const card = document.createElement('div');
            card.className = 'vehicle-card';

            // Count the number of films and pilots
            const filmsCount = getResourceCount(vehicle.films);
            const pilotsCount = getResourceCount(vehicle.pilots);
            
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${vehicle.name}</h2>
                    <div class="vehicle-model">${vehicle.model}</div>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Class</div>
                        <div class="info-value">${vehicle.vehicle_class}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Manufacturer</div>
                        <div class="info-value">${vehicle.manufacturer}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Specifications</div>
                        <div class="info-value">
                            Length: ${vehicle.length}m<br>
                            Cost: ${vehicle.cost_in_credits !== "unknown" ? `${Number(vehicle.cost_in_credits).toLocaleString()} credits` : "unknown"}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Capacity</div>
                        <div class="info-value">
                            Crew: ${vehicle.crew}<br>
                            Passengers: ${vehicle.passengers}
                        </div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Technical Details</div>
                        <div class="info-value">
                            Max Speed: ${vehicle.max_atmosphering_speed}<br>
                            Cargo Capacity: ${vehicle.cargo_capacity !== "unknown" ? `${Number(vehicle.cargo_capacity).toLocaleString()} kg` : "unknown"}<br>
                            Consumables: ${vehicle.consumables}
                        </div>
                    </div>
                    
                    ${pilotsCount > 0 ? `
                    <div class="info-group">
                        <div class="info-label">Pilots</div>
                        <div class="info-value">
                            <div class="chip-container pilots-container">
                                <span class="loading">Loading pilots...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="info-group">
                        <div class="info-label">Films</div>
                        <div class="info-value">
                            <div class="chip-container films-container">
                                <span class="loading">Loading films...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Data Info</div>
                        <div class="info-value">
                            Created: ${new Date(vehicle.created).toLocaleDateString()}<br>
                            Last updated: ${new Date(vehicle.edited).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Fetch and add the detailed data for pilots and films
            if (pilotsCount > 0) {
                const pilotsContainer = card.querySelector('.pilots-container');
                pilotsContainer.innerHTML = '';
                
                for (const pilotUrl of vehicle.pilots) {
                    const pilotData = await getDataFromUrl(pilotUrl);
                    if (pilotData) {
                        const pilotChip = document.createElement('span');
                        pilotChip.className = 'chip';
                        pilotChip.textContent = pilotData.name;
                        pilotsContainer.appendChild(pilotChip);
                    }
                }
            }
            
            if (filmsCount > 0) {
                const filmsContainer = card.querySelector('.films-container');
                filmsContainer.innerHTML = '';
                
                for (const filmUrl of vehicle.films) {
                    const filmData = await getDataFromUrl(filmUrl);
                    if (filmData) {
                        const filmChip = document.createElement('span');
                        filmChip.className = 'chip';
                        filmChip.textContent = filmData.title;
                        filmsContainer.appendChild(filmChip);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>Error Loading Vehicles</h2>
                    <p>Unable to load vehicle data. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Function to fetch and display all starships
async function fetchStarships() {
    try {
        const response = await fetch(`${BASE_URL}/starships/`);
        const data = await response.json();

        const starshipsData = data.results;
        
        const container = document.getElementById('container');
        container.className = 'starship-grid';
        container.innerHTML = '';

        for (const starship of starshipsData) {
            const card = document.createElement('div');
            card.className = 'starship-card';

            // Count the number of films and pilots
            const filmsCount = getResourceCount(starship.films);
            const pilotsCount = getResourceCount(starship.pilots);
            
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${starship.name}</h2>
                    <div class="starship-model">${starship.model}</div>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Class</div>
                        <div class="info-value">${starship.starship_class}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Manufacturer</div>
                        <div class="info-value">${starship.manufacturer}</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Specifications</div>
                        <div class="info-value">
                            Length: ${starship.length}m<br>
                            Cost: ${starship.cost_in_credits !== "unknown" ? `${Number(starship.cost_in_credits).toLocaleString()} credits` : "unknown"}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Capacity</div>
                        <div class="info-value">
                            Crew: ${starship.crew}<br>
                            Passengers: ${starship.passengers}
                        </div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Technical Details</div>
                        <div class="info-value">
                            Hyperdrive Rating: ${starship.hyperdrive_rating}<br>
                            MGLT: ${starship.MGLT}<br>
                            Max Atmosphering Speed: ${starship.max_atmosphering_speed}<br>
                            Cargo Capacity: ${starship.cargo_capacity !== "unknown" ? `${Number(starship.cargo_capacity).toLocaleString()} kg` : "unknown"}<br>
                            Consumables: ${starship.consumables}
                        </div>
                    </div>
                    
                    ${pilotsCount > 0 ? `
                    <div class="info-group">
                        <div class="info-label">Pilots</div>
                        <div class="info-value">
                            <div class="chip-container pilots-container">
                                <span class="loading">Loading pilots...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="info-group">
                        <div class="info-label">Films</div>
                        <div class="info-value">
                            <div class="chip-container films-container">
                                <span class="loading">Loading films...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Data Info</div>
                        <div class="info-value">
                            Created: ${new Date(starship.created).toLocaleDateString()}<br>
                            Last updated: ${new Date(starship.edited).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Fetch and add the detailed data for pilots and films
            if (pilotsCount > 0) {
                const pilotsContainer = card.querySelector('.pilots-container');
                pilotsContainer.innerHTML = '';
                
                for (const pilotUrl of starship.pilots) {
                    const pilotData = await getDataFromUrl(pilotUrl);
                    if (pilotData) {
                        const pilotChip = document.createElement('span');
                        pilotChip.className = 'chip';
                        pilotChip.textContent = pilotData.name;
                        pilotsContainer.appendChild(pilotChip);
                    }
                }
            }
            
            if (filmsCount > 0) {
                const filmsContainer = card.querySelector('.films-container');
                filmsContainer.innerHTML = '';
                
                for (const filmUrl of starship.films) {
                    const filmData = await getDataFromUrl(filmUrl);
                    if (filmData) {
                        const filmChip = document.createElement('span');
                        filmChip.className = 'chip';
                        filmChip.textContent = filmData.title;
                        filmsContainer.appendChild(filmChip);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching starship data:', error);
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>Error Loading Starships</h2>
                    <p>Unable to load starship data. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Function to fetch and display all planets
async function fetchPlanets() {
    try {
        const response = await fetch(`${BASE_URL}/planets/`);
        const data = await response.json();

        const planetsData = data.results;
        
        const container = document.getElementById('container');
        container.className = 'planet-grid';
        container.innerHTML = '';

        for (const planet of planetsData) {
            const card = document.createElement('div');
            card.className = 'planet-card';

            // Count the number of films and residents
            const filmsCount = getResourceCount(planet.films);
            const residentsCount = getResourceCount(planet.residents);
            
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${planet.name}</h2>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Climate & Terrain</div>
                        <div class="info-value">
                            Climate: ${planet.climate}<br>
                            Terrain: ${planet.terrain}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Orbital Data</div>
                        <div class="info-value">
                            Rotation Period: ${planet.rotation_period} hours<br>
                            Orbital Period: ${planet.orbital_period} days
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Specifications</div>
                        <div class="info-value">
                            Diameter: ${planet.diameter !== "unknown" ? `${Number(planet.diameter).toLocaleString()} km` : "unknown"}<br>
                            Gravity: ${planet.gravity}
                        </div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Surface Data</div>
                        <div class="info-value">
                            Surface Water: ${planet.surface_water}%<br>
                            Population: ${planet.population !== "unknown" ? `${Number(planet.population).toLocaleString()}` : "unknown"}
                        </div>
                    </div>
                    
                    ${residentsCount > 0 ? `
                    <div class="info-group">
                        <div class="info-label">Notable Residents (${residentsCount})</div>
                        <div class="info-value">
                            <div class="chip-container residents-container">
                                <span class="loading">Loading residents...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="info-group">
                        <div class="info-label">Films</div>
                        <div class="info-value">
                            <div class="chip-container films-container">
                                <span class="loading">Loading films...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Data Info</div>
                        <div class="info-value">
                            Created: ${new Date(planet.created).toLocaleDateString()}<br>
                            Last updated: ${new Date(planet.edited).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Fetch and add the detailed data for residents and films
            if (residentsCount > 0) {
                const residentsContainer = card.querySelector('.residents-container');
                residentsContainer.innerHTML = '';
                
                for (const residentUrl of planet.residents) {
                    const residentData = await getDataFromUrl(residentUrl);
                    if (residentData) {
                        const residentChip = document.createElement('span');
                        residentChip.className = 'chip';
                        residentChip.textContent = residentData.name;
                        residentsContainer.appendChild(residentChip);
                    }
                }
            }
            
            if (filmsCount > 0) {
                const filmsContainer = card.querySelector('.films-container');
                filmsContainer.innerHTML = '';
                
                for (const filmUrl of planet.films) {
                    const filmData = await getDataFromUrl(filmUrl);
                    if (filmData) {
                        const filmChip = document.createElement('span');
                        filmChip.className = 'chip';
                        filmChip.textContent = filmData.title;
                        filmsContainer.appendChild(filmChip);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching planet data:', error);
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>Error Loading Planets</h2>
                    <p>Unable to load planet data. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Function to fetch and display all species
async function fetchSpecies() {
    try {
        const response = await fetch(`${BASE_URL}/species/`);
        const data = await response.json();

        const speciesData = data.results;
        
        const container = document.getElementById('container');
        container.className = 'species-grid';
        container.innerHTML = '';

        for (const species of speciesData) {
            const card = document.createElement('div');
            card.className = 'species-card';

            // Count the number of films and people
            const filmsCount = getResourceCount(species.films);
            const peopleCount = getResourceCount(species.people);
            let homeworldName = 'Unknown';
            
            // Get homeworld data if available
            if (species.homeworld) {
                const homeworldData = await getDataFromUrl(species.homeworld);
                homeworldName = homeworldData ? homeworldData.name : 'Unknown';
            }
            
            card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${species.name}</h2>
                    <div class="species-classification">${species.classification}</div>
                </div>
                <div class="card-body">
                    <div class="info-group">
                        <div class="info-label">Biology</div>
                        <div class="info-value">
                            Designation: ${species.designation}<br>
                            Average Height: ${species.average_height}cm<br>
                            Average Lifespan: ${species.average_lifespan} years
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Appearance</div>
                        <div class="info-value">
                            Skin Colors: ${species.skin_colors}<br>
                            Hair Colors: ${species.hair_colors}<br>
                            Eye Colors: ${species.eye_colors}
                        </div>
                    </div>
                </div>
                <button class="details-toggle" onclick="toggleDetails(this)">Show More Details</button>
                <div class="details-section">
                    <div class="info-group">
                        <div class="info-label">Culture</div>
                        <div class="info-value">
                            Language: ${species.language}<br>
                            Homeworld: ${homeworldName}
                        </div>
                    </div>
                    
                    ${peopleCount > 0 ? `
                    <div class="info-group">
                        <div class="info-label">Notable Members (${peopleCount})</div>
                        <div class="info-value">
                            <div class="chip-container people-container">
                                <span class="loading">Loading members...</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="info-group">
                        <div class="info-label">Films</div>
                        <div class="info-value">
                            <div class="chip-container films-container">
                                <span class="loading">Loading films...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Data Info</div>
                        <div class="info-value">
                            Created: ${new Date(species.created).toLocaleDateString()}<br>
                            Last updated: ${new Date(species.edited).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Fetch and add the detailed data for people and films
            if (peopleCount > 0) {
                const peopleContainer = card.querySelector('.people-container');
                peopleContainer.innerHTML = '';
                
                for (const personUrl of species.people) {
                    const personData = await getDataFromUrl(personUrl);
                    if (personData) {
                        const personChip = document.createElement('span');
                        personChip.className = 'chip';
                        personChip.textContent = personData.name;
                        peopleContainer.appendChild(personChip);
                    }
                }
            }
            
            if (filmsCount > 0) {
                const filmsContainer = card.querySelector('.films-container');
                filmsContainer.innerHTML = '';
                
                for (const filmUrl of species.films) {
                    const filmData = await getDataFromUrl(filmUrl);
                    if (filmData) {
                        const filmChip = document.createElement('span');
                        filmChip.className = 'chip';
                        filmChip.textContent = filmData.title;
                        filmsContainer.appendChild(filmChip);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching species data:', error);
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>Error Loading Species</h2>
                    <p>Unable to load species data. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
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

    } else if(path === '/planets-page' || path === '/planets-page.html') {
        fetchPlanets();

    } else if(path === '/species-page' || path === '/species-page.html') {
        fetchSpecies();

    } else if(path === '/starships-page' || path === '/starships-page.html') {
        fetchStarships();

    } else if(path === '/vehicles-page' || path === '/vehicles-page.html') {
        fetchVehicles();

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