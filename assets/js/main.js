/*Variáveis*/
let currentPageUrl = 'https://swapi.dev/api/people/'
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const modal = document.getElementById('modal');



/* Functions*/


window.onload = async () => {

    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters (url) {
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson =  await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";
            
            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick = () => {
                modal.style.visibility = "visible";
            }

            mainContent.appendChild(card);
        })

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";
        currentPageUrl = url;

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards');
    }
}

function hideModal() {
    modal.style.visibility = "hidden";
}

/* Buttons */

async function loadNextPage() {

    if (!currentPageUrl) return;

    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();

      await loadCharacters(responseJson.next);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {

    if (!currentPageUrl) return;

    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
      
      await loadCharacters(responseJson.previous);
      
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}
