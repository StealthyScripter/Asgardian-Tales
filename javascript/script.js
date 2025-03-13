async function fetchPeople() {
    const container = document.getElementById('container');
    container.innerHTML = `<h1>Java Script file works</h1>`
}


function initializeApp(){
    //Fetch the people data
    fetchPeople();

}
// Run when the page is loaded
document.addEventListener('DOMContentLoaded', initializeApp());