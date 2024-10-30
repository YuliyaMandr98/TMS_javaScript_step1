
//создание общего контейнера
const body = document.querySelector('body');
const trelloContainer = document.createElement('div');
trelloContainer.classList.add('trello-container');
body.appendChild(trelloContainer);

//СОЗДАНИЕ РОДИТЕЛЯ header
const headerWrapTrello = document.createElement('header');
headerWrapTrello.classList.add('header-wrap-trello');
trelloContainer.appendChild(headerWrapTrello);

const headerTrello = document.createElement('div');
headerTrello.classList.add('header-trello');
headerWrapTrello.appendChild(headerTrello);

//создание текста в header
const headerText = document.createElement('h1');
headerText.classList.add('header-text');
headerText.innerText = 'Trello';
headerTrello.appendChild(headerText);

//создание часов
const clockHeaderTime = document.createElement('h3');
clockHeaderTime.classList.add('trello-card-todo-header-info-time');
clockHeaderTime.innerText = new Date().toLocaleString().slice(11,-3);
headerTrello.appendChild(clockHeaderTime);

//родитель для всех карточек
const trelloWrapCard = document.createElement('div');
trelloWrapCard.classList.add('trello-wrap-card');
trelloContainer.appendChild(trelloWrapCard);



//создание карточки todo trello
//////////////TODO CARD//////////////////////////
//создание родителя для карточек trello
const trelloWrapCardToDo = document.createElement('div');
trelloWrapCardToDo.classList.add('trello-wrap-card-todo');
trelloWrapCard.appendChild(trelloWrapCardToDo);


//создание карточки todo trello
const trelloCardTodo = document.createElement('div');
trelloCardTodo.classList.add('trello-card-todo');
trelloWrapCardToDo.appendChild(trelloCardTodo);

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
const trelloCardTodoCounter = document.createElement('h2');
trelloCardTodoCounter.classList.add('trello-card-todo-counter');
trelloCardTodoCounter.innerText = '0';
trelloCardTodoHead.appendChild(trelloCardTodoCounter);

//создание родителя для основной части todo trello
const trelloCardTodoBody = document.createElement('div');
trelloCardTodoBody.classList.add('trello-card-todo-body');
trelloCardTodo.appendChild(trelloCardTodoBody);

//обновлене счётчиков
function updateCounters() {
    trelloCardTodoCounter.innerText = `${trelloCardTodoBody.querySelectorAll('div.trello-card-todo-item').length}`
}

let todoCards = [];


// Функция для генерации уникального идентификатора
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function createToDoTrello(title, desc, id, user)
{
    const todo = {
        title: title,
         desc: desc,
         id: id || generateId(), 
         user: user || 'user',
    };

    todoCards.push(todo);
    saveToDo();
//создание карточки todo trello
const trelloCardTodoItem = document.createElement('div');
trelloCardTodoItem.classList.add('trello-card-todo-item');
trelloCardTodoItem.setAttribute('id', todo.id);
trelloCardTodoBody.appendChild(trelloCardTodoItem);

//создание родителя title в карточке todo trello
const trelloCardTodoWrapTitle = document.createElement('div');
trelloCardTodoWrapTitle.classList.add('trello-card-todo-wrap-title');
trelloCardTodoItem.appendChild(trelloCardTodoWrapTitle);

//создание текста в title карточки todo trello
const trelloCardTodoTitleText = document.createElement('h3');
trelloCardTodoTitleText.classList.add('trello-card-todo-title-text');
trelloCardTodoTitleText.textContent = 'Title: ' + title;
trelloCardTodoWrapTitle.appendChild(trelloCardTodoTitleText);

//создание родителя для кнопок в title
const trelloCardTodoWrapButtons = document.createElement('div');
trelloCardTodoWrapButtons.classList.add('trello-card-todo-wrap-buttons');
trelloCardTodoWrapTitle.appendChild(trelloCardTodoWrapButtons);

//создание кнопки edit
const trelloCardTodoButtonEdit = document.createElement('button');
trelloCardTodoButtonEdit.classList.add('trello-card-todo-button-edit');
trelloCardTodoButtonEdit.innerText = 'Edit';
trelloCardTodoWrapButtons.appendChild(trelloCardTodoButtonEdit);





// Обработчик события для кнопки Edit
trelloCardTodoButtonEdit.addEventListener('click', function() {
    const modal = createModal(); // вызов уже созданного модального окна для редактирования
    modal.style.display = 'block';

    // Заполнение полей модального окна существующими данными
    const titleInput = modal.querySelector('.modal-input');
    const descriptionInput = modal.querySelector('.modal-input2');
    const saveButton = modal.querySelector('.save-button');
    const cancelButton = modal.querySelector('.cancel-button');
    const selectInput = modal.querySelector('.select-css');

    //присваиваю аргументам функции значения переменных
    titleInput.value = title;
    descriptionInput.value = desc;
    selectInput.value = user;

    cancelButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        
        const newTitle = titleInput.value;
        const newDesc = descriptionInput.value;
        const newUser = selectInput.value;

        // Обновление данных карточки
        title = newTitle;
        desc = newDesc;
        user = newUser;

        // Обновление текста на карточке
        trelloCardTodoTitleText.textContent = 'Title: ' + newTitle;
        trelloCardTodoDescription.textContent = 'Description: ' + newDesc;
        trelloCardTodoUserInfoText.textContent = 'User: ' + newUser;
        

        //удалить редактируемую карточку 
        const cardToDo = document.querySelector('.trello-card-todo-item');
        cardToDo.remove();
        todoCards = todoCards.filter(function (elem) {
            return elem.id !== todo.id;
        });
        saveToDo();
        updateCounters(); //обновить счётчик после удаления
        
        modal.style.display = 'none';
    });
});


//создание кнопки delete
const trelloCardTodoButtonDelete = document.createElement('button');
trelloCardTodoButtonDelete.classList.add('trello-card-todo-button-delete');
trelloCardTodoButtonDelete.innerText = 'Delete';
trelloCardTodoWrapButtons.appendChild(trelloCardTodoButtonDelete);

// клик trelloCardTodoButtonDelete
trelloCardTodoButtonDelete.addEventListener('click', function() {
    const idToDelete = todo.id;

    // Удаление карточки из todoCards
    todoCards = todoCards.filter(function (elem) {
        return elem.id !== idToDelete;
    });

    // Обновление счётчика
    updateCounters();

    // Сохранение обновленного списка карточек в "TO DO" в localStorage
    saveToDo();

    // Удаление карточки из DOM
    trelloCardTodoItem.remove();

    updateCounters(); //обновить счётчик после удаления
});



//создание родителя для description в todo
const trelloCardTodoWrapDescription = document.createElement('div');
trelloCardTodoWrapDescription.classList.add('trello-card-todo-wrap-description');
trelloCardTodoItem.appendChild(trelloCardTodoWrapDescription);


//создание description в todo
const trelloCardTodoDescription = document.createElement('h3');
trelloCardTodoDescription.classList.add('trello-card-todo-description');
trelloCardTodoDescription.textContent = 'Description: ' +  desc;
trelloCardTodoWrapDescription.appendChild(trelloCardTodoDescription);

//создание кнопки >
const trelloCardTodoButtonMore = document.createElement('button');
trelloCardTodoButtonMore.classList.add('trello-card-todo-button-more');
trelloCardTodoButtonMore.innerText = '>';
trelloCardTodoWrapDescription.appendChild(trelloCardTodoButtonMore);



function createModalProgress() {
    const modalProgress = document.createElement('div');
    modalProgress.classList.add('modal-progress');

    const modalContentProgress = document.createElement('div');
    modalContentProgress.classList.add('modal-content-progress');

    const titleProgress = document.createElement('h3');
    titleProgress.classList.add('modal-title-progress');
    titleProgress.textContent = 'Warning!';
    modalContentProgress.appendChild(titleProgress);

    const descriptionProgress = document.createElement('h4');
    descriptionProgress.classList.add('modal-description-progress');
    descriptionProgress.textContent = `Пожалуйста выполните предыдущие задачи перед добавлением новых задач`
    modalContentProgress.appendChild(descriptionProgress);

    const saveButtonProgress = document.createElement('button');
    saveButtonProgress.classList.add('save-button-progress');
    saveButtonProgress.innerText = 'Confirm';
    saveButtonProgress.addEventListener('click', function() {

        modalProgress.style.display = 'none';
    });
    modalContentProgress.appendChild(saveButtonProgress);

    const cancelButtonProgress = document.createElement('button');
    cancelButtonProgress.classList.add('cancel-button-progress');
    cancelButtonProgress.innerText = 'Cancel';
    cancelButtonProgress.addEventListener('click', function() {
        modalProgress.style.display = 'none';
    });
    modalContentProgress.appendChild(cancelButtonProgress);

    modalProgress.appendChild(modalContentProgress);
    document.body.appendChild(modalProgress);

    return modalProgress;
}

// клик trelloCardTodoButtonMore
trelloCardTodoButtonMore.addEventListener('click', function() {
    const inProgressCards = JSON.parse(localStorage.getItem('inProgressCards')) || [];

    const MAX_CARDS = 6;

    if (inProgressCards.length >= MAX_CARDS) {
        // Показываем модальное окно
        const modalProgress = createModalProgress();
        modalProgress.style.display = "block";

        // Закрытие модального окна при клике на крестик
        const span = document.querySelector(".cancel-button-progress");
        span.onclick = function() {
            modalProgress.style.display = "none";
        }

        // Закрытие модального окна при клике вне окна
        window.onclick = function(event) {
            if (event.target == modalProgress) {
                modalProgress.style.display = "none";
            }
        }

        return;
    }

    // Получение данных карточки из раздела "TO DO"
    const title = todo.title;
    const desc = todo.desc;
    const id = todo.id;
    const user = todo.user;

    // Создание новой карточки в разделе "IN PROGRESS"
    createInProgress(title, desc, id, user);

    // Добавление новой карточки в массив inProgressCards
    inProgressCards.push({ title, desc, id, user });
    saveInProgress()


    // Удаление карточки из "TO DO" и обновление списка карточек в localStorage
    trelloCardTodoItem.remove();
    todoCards = todoCards.filter(function (elem) {
        return elem.id !== id;
    });
    trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) - 1;
    saveToDo(); // Сохранение обновленного списка карточек в "TO DO"
});
    





//создание родителя для описания пользователя и времени добавления карточки
const trelloCardTodoWrapUserInfo = document.createElement('div');
trelloCardTodoWrapUserInfo.classList.add('trello-card-todo-wrap-user-info');
trelloCardTodoItem.appendChild(trelloCardTodoWrapUserInfo);

//создание текста в описании пользователя и времени добавления карточки
const trelloCardTodoUserInfoText = document.createElement('h3');
trelloCardTodoUserInfoText.classList.add('trello-card-todo-user-info-text');
trelloCardTodoUserInfoText.innerText = 'User: ' + user;
trelloCardTodoWrapUserInfo.appendChild(trelloCardTodoUserInfoText);

//создание текста времени добавления карточки
const trelloCardTodoUserInfoTime = document.createElement('h3');
trelloCardTodoUserInfoTime.classList.add('trello-card-todo-user-info-time');
trelloCardTodoUserInfoTime.innerText = new Date().toLocaleString().slice(11,-3);
trelloCardTodoWrapUserInfo.appendChild(trelloCardTodoUserInfoTime); }

//кнопка add todo
const trelloCardTodoButtonAdd = document.createElement('button');
trelloCardTodoButtonAdd.classList.add('trello-card-todo-button-add');
trelloCardTodoButtonAdd.innerText = 'Add todo';
trelloCardTodo.appendChild(trelloCardTodoButtonAdd);





function createModal() {

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const titleInput = document.createElement('input');
    titleInput.classList.add('modal-input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Title');
    modalContent.appendChild(titleInput);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('modal-input2');
    descriptionInput.setAttribute('placeholder', 'Description');
    modalContent.appendChild(descriptionInput);

    const selectId = `select-${Date.now()}`; // Уникальный идентификатор для выбора пользователя
    const select1 = document.createElement('select');
    select1.classList.add('select-css');
    select1.setAttribute('id', selectId);
    select1.innerHTML = '<option value="Mandryk Yuliya">Mandryk Yuliya</option> <option value="Ivanov Ivan">Ivanov Ivan</option> <option value="Selezneva Yana">Selezneva Yana</option> <option value="Kozlova Elena">Kozlova Elena</option> <option value="Kotova Sveta">Kotova Sveta</option>';
    modalContent.appendChild(select1);

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.innerText = 'Confirm';
    saveButton.addEventListener('click', function() {

        const title = titleInput.value;
        const desc = descriptionInput.value;
        const user = document.getElementById(selectId).value;
        const id = generateId();

        createToDoTrello(title, desc, id, user);
        trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) + 1;


        modal.style.display = 'none';
    });
    modalContent.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    modalContent.appendChild(cancelButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
}

// Клик по add
trelloCardTodoButtonAdd.addEventListener('click', function() {
    createModal().style.display = 'block';
});


////////////////////////IN PROGRESS////////////////////////////////////

////создание родителя для карточек in progress
const trelloWrapCardInProgress = document.createElement('div');
trelloWrapCardInProgress.classList.add('trello-wrap-card-in-progress');
trelloWrapCard.appendChild(trelloWrapCardInProgress);

//создание карточки in progress trello
const trelloCardInProgress = document.createElement('div');
trelloCardInProgress.classList.add('trello-card-in-progress');
trelloWrapCardInProgress.appendChild(trelloCardInProgress);

//создание шапки карточки in progress trello
const trelloCardInProgressHead = document.createElement('div');
trelloCardInProgressHead.classList.add('trello-card-in-progress-head');
trelloCardInProgress.appendChild(trelloCardInProgressHead);

//создание текста в шапке карточки in progress trello
const trelloCardInProgressHeadText = document.createElement('h2');
trelloCardInProgressHeadText.classList.add('trello-card-in-progress-head-text');
trelloCardInProgressHeadText.innerText = 'IN PROGRESS:';
trelloCardInProgressHead.appendChild(trelloCardInProgressHeadText);

//создание счётчика в шапке карточки in progress trello
const trelloCardInProgressCounter = document.createElement('h2');
trelloCardInProgressCounter.classList.add('trello-card-in-progress-counter');
trelloCardInProgressCounter.innerText = '0';
trelloCardInProgressHead.appendChild(trelloCardInProgressCounter);

//создание родителя для основной части in progress trello
const trelloCardInProgressBody = document.createElement('div');
trelloCardInProgressBody.classList.add('trello-card-in-progress-body');
trelloCardInProgress.appendChild(trelloCardInProgressBody);

// Инициализация массива для карточек в разделе "IN PROGRESS"
let inProgressCards = [];


    //создание карточки in progress trello
function createInProgress(title, desc, id, user) {
    const todo2 = {
        title: title,
         desc: desc,
         id: id, 
         user: user || 'user',
    };

    inProgressCards.push(todo2);
    saveInProgress();

const trelloCardInProgressItem = document.createElement('div');
trelloCardInProgressItem.classList.add('trello-card-in-progress-item');
trelloCardInProgressBody.appendChild(trelloCardInProgressItem);

//создание родителя title в карточке in progress trello
const trelloCardInProgressWrapTitle = document.createElement('div');
trelloCardInProgressWrapTitle.classList.add('trello-card-in-progress-wrap-title');
trelloCardInProgressItem.appendChild(trelloCardInProgressWrapTitle);

//создание текста в title карточки in progress trello
const trelloCardInProgressTitleText = document.createElement('h3');
trelloCardInProgressTitleText.classList.add('trello-card-in-progress-title-text');
const trelloTitle = document.querySelector('.trello-card-todo-title-text')
trelloCardInProgressTitleText.innerText = 'Title: ' + title;
trelloCardInProgressWrapTitle.appendChild(trelloCardInProgressTitleText);

//создание родителя для кнопок в title
const trelloCardInProgressWrapButtons = document.createElement('div');
trelloCardInProgressWrapButtons.classList.add('trello-card-in-progress-wrap-buttons');
trelloCardInProgressWrapTitle.appendChild(trelloCardInProgressWrapButtons);

//создание кнопки back
const trelloCardInProgressButtonBack = document.createElement('button');
trelloCardInProgressButtonBack.classList.add('trello-card-in-progress-button-back');
trelloCardInProgressButtonBack.innerText = 'Back';
trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonBack);

// при нажатии на кнопку back
trelloCardInProgressButtonBack.addEventListener('click', function() {
    // Получение данных карточки из раздела "IN PROGRESS"
    const title = todo2.title;
    const desc = todo2.desc;
    const id = todo2.id;
    const user = todo2.user;

    // Создание новой карточки в разделе "to do"
    createToDoTrello(title, desc, id, user);
    updateCounters();

    // Сохранение обновленного списка карточек в "to do" в localStorage
    saveToDo();

    // Удаление карточки из "in prjgress" и обновление списка карточек в localStorage
    trelloCardInProgressItem.remove();
    inProgressCards = inProgressCards.filter(function (elem) {
        return elem.id !== id;
    });
    trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
    saveInProgress(); // Сохранение обновленного списка карточек в "in progress" в localStorage
});

//создание кнопки complete
const trelloCardInProgressButtonComplete = document.createElement('button');
trelloCardInProgressButtonComplete.classList.add('trello-card-in-progress-button-complete');
trelloCardInProgressButtonComplete.innerText = 'Complete';
trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonComplete);

// при нажатии на кнопку complete
trelloCardInProgressButtonComplete.addEventListener('click', function() {
    // Получение данных карточки из раздела "IN PROGRESS"
    const title = todo2.title;
    const desc = todo2.desc;
    const id = todo2.id;
    const user = todo2.user;

    // Создание новой карточки в разделе "done"
    createDone(title, desc, id, user);
    //обновить счётчик карточек в done
    trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) + 1;

    // Сохранение обновленного списка карточек в "done" в localStorage
    saveDone();

    // Удаление карточки из "in progress" и обновление списка карточек в localStorage
    trelloCardInProgressItem.remove();
    inProgressCards = inProgressCards.filter(function (elem) {
        return elem.id !== id;
    });
    trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
    saveInProgress();})

//создание родителя для description в in progress
const trelloCardInProgressWrapDescription = document.createElement('div');
trelloCardInProgressWrapDescription.classList.add('trello-card-in-progress-wrap-description');
trelloCardInProgressItem.appendChild(trelloCardInProgressWrapDescription);

//создание description в in progress
const trelloCardInProgressDescription = document.createElement('h3');
trelloCardInProgressDescription.classList.add('trello-card-in-progress-description');
trelloCardInProgressDescription.innerText = 'Description: ' + desc;
trelloCardInProgressWrapDescription.appendChild(trelloCardInProgressDescription);

//создание родителя для описания пользователя и времени добавления карточки in progress
const trelloCardInProgressWrapUserInfo = document.createElement('div');
trelloCardInProgressWrapUserInfo.classList.add('trello-card-inProgress-wrap-user-info');
trelloCardInProgressItem.appendChild(trelloCardInProgressWrapUserInfo);

//создание текста в описании пользователя и времени добавления карточки
const trelloCardInProgressUserInfoText = document.createElement('h3');
trelloCardInProgressUserInfoText.classList.add('trello-card-inProgress-user-info-text');
trelloCardInProgressUserInfoText.innerText = 'User: ' + user;
trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoText);

//создание текста времени добавления карточки
const trelloCardInProgressUserInfoTime = document.createElement('h3');
trelloCardInProgressUserInfoTime.classList.add('trello-card-inProgress-user-info-time');
trelloCardInProgressUserInfoTime.innerText = new Date().toLocaleString().slice(11,-3);
trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoTime);
//увеличение счётчика in progress
trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) + 1;
}


////////////////////////////DONE/////////////////////////

//создание родителя для карточек done
const trelloWrapCardDone = document.createElement('div');
trelloWrapCardDone.classList.add('trello-wrap-card-done');
trelloWrapCard.appendChild(trelloWrapCardDone);

//создание карточки done trello
const trelloCardDone = document.createElement('div');
trelloCardDone.classList.add('trello-card-done');
trelloWrapCardDone.appendChild(trelloCardDone);

//создание шапки карточки done trello
const trelloCardDoneHead = document.createElement('div');
trelloCardDoneHead.classList.add('trello-card-done-head');
trelloCardDone.appendChild(trelloCardDoneHead);

//создание текста в шапке карточки done trello
const trelloCardDoneHeadText = document.createElement('h2');
trelloCardDoneHeadText.classList.add('trello-card-in-progress-head-text');
trelloCardDoneHeadText.innerText = 'DONE:';
trelloCardDoneHead.appendChild(trelloCardDoneHeadText);

//создание счётчика в шапке карточки done trello
const trelloCardDoneCounter = document.createElement('h2');
trelloCardDoneCounter.classList.add('trello-card-done-counter');
trelloCardDoneCounter.innerText = '0';
trelloCardDoneHead.appendChild(trelloCardDoneCounter);

//создание родителя для основной части done trello
const trelloCardDoneBody = document.createElement('div');
trelloCardDoneBody.classList.add('trello-card-done-body');
trelloCardDone.appendChild(trelloCardDoneBody);


// Инициализация массива для карточек в разделе "IN PROGRESS"
let doneCards = [];

    //создание карточки done trello
function createDone(title, desc, id, user) {
    const todo3 = {
        title: title,
         desc: desc,
         id: id, 
         user: user || 'user',
    };

    doneCards.push(todo3);
    saveDone();


//создание карточки done trello
const trelloCardDoneItem = document.createElement('div');
trelloCardDoneItem.classList.add('trello-card-done-item');
trelloCardDoneBody.appendChild(trelloCardDoneItem);

//создание родителя title в карточке done trello
const trelloCardDoneWrapTitle = document.createElement('div');
trelloCardDoneWrapTitle.classList.add('trello-card-done-wrap-title');
trelloCardDoneItem.appendChild(trelloCardDoneWrapTitle);

//создание текста в title карточки done trello
const trelloCardDoneTitleText = document.createElement('h3');
trelloCardDoneTitleText.classList.add('trello-card-done-title-text');
trelloCardDoneTitleText.innerText = 'Title: ' + title;
trelloCardDoneWrapTitle.appendChild(trelloCardDoneTitleText);

//создание родителя для кнопки в title
const trelloCardDoneWrapButtons = document.createElement('div');
trelloCardDoneWrapButtons.classList.add('trello-card-done-wrap-buttons');
trelloCardDoneWrapTitle.appendChild(trelloCardDoneWrapButtons);

//создание кнопки delete
const trelloCardDoneButtonDelete = document.createElement('button');
trelloCardDoneButtonDelete.classList.add('trello-card-done-button-delete');
trelloCardDoneButtonDelete.innerText = 'Delete';
trelloCardDoneWrapButtons.appendChild(trelloCardDoneButtonDelete);

//при нажатии на кнопку delete
trelloCardDoneButtonDelete.addEventListener('click', function() {
    trelloCardDoneItem.remove();
    doneCards = doneCards.filter(function (elem) {
        return elem.id !== id;
    });
    trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) - 1;
    saveDone();
});

//создание родителя для description в done
const trelloCardDoneWrapDescription = document.createElement('div');
trelloCardDoneWrapDescription.classList.add('trello-card-done-wrap-description');
trelloCardDoneItem.appendChild(trelloCardDoneWrapDescription);

//создание description в done
const trelloCardDoneDescription = document.createElement('h3');
trelloCardDoneDescription.classList.add('trello-card-done-description');
trelloCardDoneDescription.innerText = 'Description: ' + desc;
trelloCardDoneWrapDescription.appendChild(trelloCardDoneDescription);

//создание родителя для описания пользователя и времени добавления карточки done
const trelloCardDoneWrapUserInfo = document.createElement('div');
trelloCardDoneWrapUserInfo.classList.add('trello-card-done-wrap-user-info');
trelloCardDoneItem.appendChild(trelloCardDoneWrapUserInfo);

//создание текста в описании пользователя и времени добавления карточки
const trelloCardDoneUserInfoText = document.createElement('h3');
trelloCardDoneUserInfoText.classList.add('trello-card-done-user-info-text');
trelloCardDoneUserInfoText.innerText = 'User: ' + user;
trelloCardDoneWrapUserInfo.appendChild(trelloCardDoneUserInfoText);

//создание текста времени добавления карточки
const trelloCardDoneUserInfoTime = document.createElement('h3');
trelloCardDoneUserInfoTime.classList.add('trello-card-done-user-info-time');
trelloCardDoneUserInfoTime.innerText = new Date().toLocaleString().slice(11,-3);
trelloCardDoneWrapUserInfo.appendChild(trelloCardDoneUserInfoTime);

}

//кнопка delete all
const trelloDeleteAllButton = document.createElement('button');
trelloDeleteAllButton.classList.add('trello-delete-all-button');
trelloDeleteAllButton.innerText = 'Delete All';
trelloCardDone.appendChild(trelloDeleteAllButton);

function createModalDone() {
    const modalDone = document.createElement('div');
    modalDone.classList.add('modal-done');

    const modalContentDone = document.createElement('div');
    modalContentDone.classList.add('modal-content-done');

    const titleDone = document.createElement('h3');
    titleDone.classList.add('modal-title-done');
    titleDone.textContent = 'Warning!';
    modalContentDone.appendChild(titleDone);

    const descriptionDone = document.createElement('h4');
    descriptionDone.classList.add('modal-description-done');
    descriptionDone.textContent = `Вы уверены, что хотите удалить весь список?`
    modalContentDone.appendChild(descriptionDone);

    const saveButtonDone = document.createElement('button');
    saveButtonDone.classList.add('save-button-done');
    saveButtonDone.innerText = 'Confirm';
    saveButtonDone.addEventListener('click', function() {
        trelloCardDoneBody.innerHTML = '';
        doneCards = [];
        trelloCardDoneCounter.innerText = '0';
        saveDone();
        modalDone.style.display = 'none';
    });
    modalContentDone.appendChild(saveButtonDone);

    const cancelButtonDone = document.createElement('button');
    cancelButtonDone.classList.add('cancel-button-done');
    cancelButtonDone.innerText = 'Cancel';
    cancelButtonDone.addEventListener('click', function() {
        modalDone.style.display = 'none';
    });
    modalContentDone.appendChild(cancelButtonDone);

    modalDone.appendChild(modalContentDone);
    const body = document.querySelector('body');
    body.appendChild(modalDone);

    return createModalDone;
};

// Вызываем функцию createModalDone для создания модального окна
createModalDone();

// При нажатии на кнопку delete all удалить карточки done
trelloDeleteAllButton.addEventListener('click', function() {
    // Модальное окно с подтверждением удаления
    const modalDone2 = document.querySelector('.modal-done');
    if (modalDone2) {
        modalDone2.style.display = 'block';
    }
});





// загрузка данных из LocalStorage
function getNamesTodo() {
    const storedTodos = JSON.parse(localStorage.getItem('todoCards')) || [];

    storedTodos.forEach(todo => {;
        createToDoTrello(todo.title, todo.desc, todo.id, todo.user);
    }); updateCounters()
    
}

function getNamesInProgress() {
    const storedTodos = JSON.parse(localStorage.getItem('inProgressCards')) || [];

    storedTodos.forEach(todo => {;
        createInProgress(todo.title, todo.desc, todo.id, todo.user);
    });
    trelloCardInProgressCounter.innerText = inProgressCards.length;
    
}

function getNamesDone() {
    const storedTodos = JSON.parse(localStorage.getItem('doneCards')) || [];
    storedTodos.forEach(todo => {;
        createDone(todo.title, todo.desc, todo.id, todo.user);
    });
    trelloCardDoneCounter.innerText = doneCards.length;
}

// Сохранение карточек из раздела "TO DO" в localStorage
function saveToDo() {
    localStorage.setItem('todoCards', JSON.stringify(todoCards));
}

// Сохранение карточек из раздела "IN PROGRESS" в localStorage
function saveInProgress() {
    localStorage.setItem('inProgressCards', JSON.stringify(inProgressCards));
}

// Сохранение карточек из раздела "DONE" в localStorage
function saveDone() {
    localStorage.setItem('doneCards', JSON.stringify(doneCards));
    //обновление счётчика
    
}


window.addEventListener('load', function() {
    getNamesTodo(); getNamesInProgress(); getNamesDone();

});

