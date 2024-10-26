

//создание общего контейнера
const body = document.querySelector('body');
const trelloContainer = document.createElement('div');
trelloContainer.classList.add('trello-container');
body.appendChild(trelloContainer);

//создание header
import { createHeader } from './header.js';
createHeader();


//создание родителя для карточек trello
const trelloWrapCard = document.createElement('div');
trelloWrapCard.classList.add('trello-wrap-card');
trelloContainer.appendChild(trelloWrapCard);

//создание карточки todo trello
const trelloCardTodo = document.createElement('div');
trelloCardTodo.classList.add('trello-card-todo');
trelloWrapCard.appendChild(trelloCardTodo);

//создание шапки карточки todo trello
const trelloCardTodoHead = document.createElement('div');
trelloCardTodoHead.classList.add('trello-card-todo-head');
trelloCardTodo.appendChild(trelloCardTodoHead);

//создание текста в шапке карточки todo trello
const trelloCardTodoHeadText = document.createElement('h2');
trelloCardTodoHeadText.classList.add('trello-card-todo-head-text');
trelloCardTodoHeadText.innerText = 'TODO:';
trelloCardTodoHead.appendChild(trelloCardTodoHeadText);

//создание счётчика в шапке карточки todo trello
const trelloCardTodoCounter = document.createElement('div');
trelloCardTodoCounter.classList.add('trello-card-todo-counter');
trelloCardTodoCounter.innerText = '0';
trelloCardTodoHead.appendChild(trelloCardTodoCounter);