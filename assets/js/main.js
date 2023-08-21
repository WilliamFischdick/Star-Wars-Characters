/*Variáveis*/
let currentPageUrl = 'https://swapi.dev/api/people/'



/* Functions*/

async function loadCharacters (url) {
    
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = '';
}




window.onload = async () => {

    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards dos personagens');
    }
};
