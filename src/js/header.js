
//создание header
export function createHeader() {//СОЗДАНИЕ РОДИТЕЛЯ header
    const trello = document.querySelector('.trello-container');
    const headerWrapTrello = document.createElement('header');
    headerWrapTrello.classList.add('header-wrap-trello');
    trello.appendChild(headerWrapTrello);
    
    
    const headerTrello = document.createElement('div');
    headerTrello.classList.add('header-trello');
    headerWrapTrello.appendChild(headerTrello);
    
    //создание текста в header
    const headerText = document.createElement('h1');
    headerText.classList.add('header-text');
    headerText.innerText = 'Trello';
    headerTrello.appendChild(headerText);

    //создание часов
    const clockHeaderTime = document.createElement('input');
    clockHeaderTime.setAttribute('type', 'time',);
    clockHeaderTime.setAttribute('value', new Date().toLocaleString().slice(0,-11));
    clockHeaderTime.classList.add('clock-header-time');
    headerTrello.appendChild(clockHeaderTime);
    }