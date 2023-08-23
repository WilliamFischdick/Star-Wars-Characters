/*Variáveis*/
let currentPageUrl = 'https://swapi.dev/api/people/'



/* Functions*/

async function loadCharacters (url) {
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson =  await response.jason();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/1.jpg')`;
            card.className = "cards";
            
            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            mainContent.appendChild(card);
        })

        currentPageUrl = url;

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards');
    }
}




window.onload = async () => {

    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }
};
