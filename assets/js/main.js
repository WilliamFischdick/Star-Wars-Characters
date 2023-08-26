/*Variáveis*/
let currentPageUrl = 'https://swapi.dev/api/people/'
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');



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
                modalContent.innerHTML = '';

                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = "character-image";

                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`;

                const characterHeight = document.createElement("span");
                characterHeight.className = "character-details";
                characterHeight.innerHTML = `Altura: ${convertHeight(character.height)}`;

                const mass = document.createElement("span");
                mass.className = "character-details";
                mass.innerText = `Peso: ${convertMass(character.mass)}`;

                const eyeColor = document.createElement("span");
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos Olhos: ${translateEyeColor(character.eye_color)}`;

                const birthYear = document.createElement("span");
                birthYear.className = "character-details";
                birthYear.innerText = `Nascimento: ${converBirthYear(character.birth_year)}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(mass);
                modalContent.appendChild(eyeColor);
                modalContent.appendChild(birthYear);
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

/* Translate Functions */

function translateEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "marrom",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "castanho",
        unknown: "desconhecido"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return(height/100).toFixed(2);
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`;
}

function converBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecida"
    }

    return birthYear
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
