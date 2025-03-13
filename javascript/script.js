// Base URL
const BASE_URL = 'https://swapi.dev/api';

//Function to fetch all people/charcters
async function fetchPeople() {
    try{
        const response = await fetch(`${BASE_URL}/people/`);
        const data = await response.json();

        const peopleData = data.results;

        console.log('People data: ', peopleData);
        
        const container = document.getElementById('container');
            container.innerHTML=  '';

        peopleData.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';

            const filmsCount = getResourceCount(character.films);
            const vehiclesCount = getResourceCount(character.vehicles);
            const starshipsCount = getResourceCount(character.starships);
            const speciesCount = getResourceCount(character.species);
              
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
                            <div class="info-value">Planet ID: ${getIdFromUrl(character.homeworld)}</div>
                        </div>
                        
                        <div class="info-group">
                            <div class="info-label">Films</div>
                            <div class="info-value">
                                <div class="chip-container">
                                    ${character.films.map(film => `<span class="chip">Film ${getIdFromUrl(film)}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        
                        ${vehiclesCount ? `
                        <div class="info-group">
                            <div class="info-label">Vehicles</div>
                            <div class="info-value">
                                <div class="chip-container">
                                    ${character.vehicles.map(vehicle => `<span class="chip">Vehicle ${getIdFromUrl(vehicle)}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        
                        ${starshipsCount ? `
                        <div class="info-group">
                            <div class="info-label">Starships</div>
                            <div class="info-value">
                                <div class="chip-container">
                                    ${character.starships.map(starship => `<span class="chip">Starship ${getIdFromUrl(starship)}</span>`).join('')}
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
            
        });
    }
    catch (error) {
        console.error('Error fetching the people data: ', error);
        return;
    }  
}

// Get count of resource arrays (films, vehicles, etc.)
function getResourceCount(arr) {
    return arr && arr.length ? arr.length : 0;
}

// Extract ID from URL
function getIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
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
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredCharacters = characters.filter(char => 
        char.name.toLowerCase().includes(searchTerm) ||
        char.gender.toLowerCase().includes(searchTerm) ||
        char.eye_color.toLowerCase().includes(searchTerm) ||
        char.hair_color.toLowerCase().includes(searchTerm) ||
        char.skin_color.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('character-grid');
    grid.innerHTML = '';
    
    if (filteredCharacters.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 30px;">No characters found matching your search.</div>';
        return;
    }
    
    filteredCharacters.forEach(character => {
        // Create and append character cards 
        const card = document.createElement('div');
        card.className = 'character-card';
        // Populate card with character info (same as above)
        card.innerHTML = `<h1>${character.name}Populate with filtered information</h1>`;
        grid.appendChild(card);
    });
});


function initializeApp(){
    //Fetch the people data
    fetchPeople();

}
// Run when the page is loaded
document.addEventListener('DOMContentLoaded', initializeApp);