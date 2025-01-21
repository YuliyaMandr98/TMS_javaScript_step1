const body = document.body;

const trelloContainer = body.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-container' })
);

const headerWrapTrello = trelloContainer.appendChild(
    Object.assign(document.createElement('header'), { className: 'header-wrap-trello' })
);

const headerTrello = headerWrapTrello.appendChild(
    Object.assign(document.createElement('div'), { className: 'header-trello' })
);

const headerText = headerTrello.appendChild(
    Object.assign(document.createElement('h1'), { className: 'header-text', innerText: 'Trello' })
);

const clockHeaderTime = headerTrello.appendChild(
    Object.assign(document.createElement('h3'), { className: 'trello-card-todo-header-info-time' })
);

// Функция для обновления времени
const updateTime = () => {
    clockHeaderTime.innerText = new Date().toLocaleString().slice(11, -3);
};

// Обновляем время сразу при загрузке
updateTime();
setInterval(updateTime, 1000);

const trelloWrapCard = trelloContainer.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-wrap-card' })
);

const trelloCardTodo = trelloWrapCard.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-todo', id: 'todo' })
);

const trelloCardTodoHead = trelloCardTodo.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-todo-head' })
);

const trelloCardTodoHeadText = trelloCardTodoHead.appendChild(
    Object.assign(document.createElement('h2'), { className: 'trello-card-todo-head-text', innerText: 'TODO:' })
);

const trelloCardTodoCounter = trelloCardTodoHead.appendChild(
    Object.assign(document.createElement('h2'), { className: 'trello-card-todo-counter', innerText: '0' })
);

const trelloCardTodoBody = trelloCardTodo.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-todo-body' })
);

//обновлене счётчиков
function updateCounters() {
    trelloCardTodoCounter.innerText = `${trelloCardTodoBody.querySelectorAll('div.trello-card-todo-item').length}`
}

function generateId() {
    return '_' + Math.random().toString(36).slice(2, 11);
}

let todoCards = [];

function createToDoTrello(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo = {
        title,
        desc,
        id: id || generateId(),
        user: user || 'user',
        time,
    };

    todoCards.push(todo);
    saveToDo();

    const trelloCardTodoItem = trelloCardTodoBody.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-todo-item', id: todo.id })
    );

    const trelloCardTodoWrapButtons = trelloCardTodoItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-todo-wrap-buttons' })
    );

    const trelloCardTodoButtonEdit = trelloCardTodoWrapButtons.appendChild(
        Object.assign(document.createElement('button'), { className: 'trello-card-todo-button-edit', innerText: 'Edit' })
    );

    trelloCardTodoButtonEdit.addEventListener('click', function () {
        const modal = createEditModal(todo, trelloCardTodoItem);
        modal.style.display = 'block';
    });

    const trelloCardTodoButtonDelete = trelloCardTodoWrapButtons.appendChild(
        Object.assign(document.createElement('button'), { className: 'trello-card-todo-button-delete', innerText: 'Delete' })
    );

    trelloCardTodoButtonDelete.addEventListener('click', function () {
        todoCards = todoCards.filter((elem) => elem.id !== todo.id);
        saveToDo();
        trelloCardTodoItem.remove();
        updateCounters();
    });

    const trelloCardTodoWrapTitle = trelloCardTodoItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-todo-wrap-title' })
    );
    trelloCardTodoWrapTitle.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-todo-title-text', innerHTML: `<span>Title: </span>${title.replace(' ', '<br>')}` })
    );

    const trelloCardTodoWrapDescription = trelloCardTodoItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-todo-wrap-description' })
    );
    trelloCardTodoWrapDescription.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-todo-description', innerHTML: `<span>Description: </span>${desc}` })
    );

    const trelloCardTodoWrapUserInfo = trelloCardTodoItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-todo-wrap-user-info' })
    );
    trelloCardTodoWrapUserInfo.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-todo-user-info-text', innerHTML: `<span>User: </span>${user}` })
    );
    trelloCardTodoWrapUserInfo.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-todo-user-info-time', innerText: time })
    );

    const trelloCardTodoButtonMore = trelloCardTodoWrapDescription.appendChild(
        Object.assign(document.createElement('button'), { className: 'trello-card-todo-button-more', innerText: '>' })
    );

    function createModalProgress() {
        const modalProgress = Object.assign(document.createElement('div'), { className: 'modal-progress' });
        const modalContentProgress = Object.assign(document.createElement('div'), { className: 'modal-content-progress' });

        const titleProgress = Object.assign(document.createElement('h3'), { className: 'modal-title-progress', textContent: 'Warning!' });
        modalContentProgress.appendChild(titleProgress);

        const descriptionProgress = Object.assign(document.createElement('h4'), { className: 'modal-description-progress', textContent: 'Пожалуйста выполните предыдущие задачи перед добавлением новых задач' });
        modalContentProgress.appendChild(descriptionProgress);

        const wrapButton = Object.assign(document.createElement('div'), { className: 'wrap-button-progress' });
        modalContentProgress.appendChild(wrapButton);

        const saveButtonProgress = Object.assign(document.createElement('button'), { className: 'save-button-progress', innerText: 'Confirm' });
        saveButtonProgress.addEventListener('click', function () {
            modalProgress.style.display = 'none';
        });
        wrapButton.appendChild(saveButtonProgress);

        const cancelButtonProgress = Object.assign(document.createElement('button'), { className: 'cancel-button-progress', innerText: 'Cancel' });
        cancelButtonProgress.addEventListener('click', function () {
            modalProgress.style.display = 'none';
        });
        wrapButton.appendChild(cancelButtonProgress);

        modalProgress.appendChild(modalContentProgress);
        document.body.appendChild(modalProgress);

        return modalProgress;
    }

    // Обработчик клика на кнопку ">"
    trelloCardTodoButtonMore.addEventListener('click', function () {
        const inProgressCards = JSON.parse(localStorage.getItem('inProgressCards')) || [];
        const maxCards = 6;

        if (inProgressCards.length >= maxCards) {
            const modalProgress = createModalProgress();
            modalProgress.style.display = "block";

            // Закрытие модального окна при клике вне окна
            window.onclick = function (event) {
                if (event.target === modalProgress) {
                    modalProgress.style.display = "none";
                }
            };
            return;
        }

        const time = new Date().toLocaleString().slice(11, -3);
        createInProgress(todo.title, todo.desc, todo.id, todo.user, time);

        inProgressCards.push({ title: todo.title, desc: todo.desc, id: todo.id, user: todo.user, time });
        saveInProgress();

        trelloCardTodoItem.remove();
        todoCards = todoCards.filter(function (elem) {
            return elem.id !== todo.id;
        });
        trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) - 1;
        saveToDo();
    });
}

const trelloCardTodoButtonAdd = trelloCardTodo.appendChild(
    Object.assign(document.createElement('button'), { className: 'trello-card-todo-button-add', innerText: 'Add todo' })
);

trelloCardTodoButtonAdd.addEventListener('click', function () {
    createModal().style.display = 'block';
});

function createModal() {
    const modal = document.body.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal' })
    );
    const modalContent = modal.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal-content' })
    );

    const titleInput = modalContent.appendChild(
        Object.assign(document.createElement('input'), { className: 'modal-input', type: 'text', placeholder: 'Title' })
    );

    const descriptionInput = modalContent.appendChild(
        Object.assign(document.createElement('textarea'), { className: 'modal-input2', placeholder: 'Description' })
    );

    const select = modalContent.appendChild(
        Object.assign(document.createElement('select'), { className: 'select-css', id: `select-${Date.now()}` })
    );

    fetchUsers(select);

    const wrapButton = modalContent.appendChild(
        Object.assign(document.createElement('div'), { className: 'wrap-button' })
    );

    const saveButton = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'save-button', innerText: 'Confirm' })
    );

    saveButton.addEventListener('click', function () {
        const title = titleInput.value;
        const desc = descriptionInput.value;
        const user = select.value;
        const id = generateId();
        const time = new Date().toLocaleString().slice(11, -3);

        createToDoTrello(title, desc, id, user, time);
        trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) + 1;
        modal.style.display = 'none';
    });

    const cancelButton = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'cancel-button', innerText: 'Cancel' })
    );

    cancelButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    return modal;
}

async function fetchUsers(select) {
    return fetch("https://jsonplaceholder.typicode.com/users") // Возвращаем промис
        .then((response) => response.json())
        .then((users) => {
            users.forEach((user) => {
                select.appendChild(Object.assign(document.createElement('option'), { value: user.name, innerText: user.name }));
            });
        })
        .catch((error) => console.error("Error fetching users", error));
}

function createEditModal(todo, todoItem) {
    const editModal = document.body.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal' })
    );

    const editModalContent = editModal.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal-content' })
    );

    const editTitleInput = editModalContent.appendChild(
        Object.assign(document.createElement('input'), { className: 'modal-input', type: 'text', placeholder: 'Title', value: todo.title })
    );

    const editDescriptionInput = editModalContent.appendChild(
        Object.assign(document.createElement('textarea'), { className: 'modal-input2', placeholder: 'Description', value: todo.desc })
    );

    const editSelect = editModalContent.appendChild(
        Object.assign(document.createElement('select'), { className: 'select-css', id: `select-${Date.now()}` })
    );

    fetchUsers(editSelect).then(() => {
        // Установка текущего пользователя в селект после загрузки
        editSelect.value = todo.user;
    });

    const wrapButton = editModalContent.appendChild(
        Object.assign(document.createElement('div'), { className: 'wrap-button' })
    );

    const editSaveButton = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'save-button', innerText: 'Confirm' })
    );

    editSaveButton.addEventListener('click', function () {
        todo.title = editTitleInput.value;
        todo.desc = editDescriptionInput.value;
        todo.user = editSelect.value;

        // Обновление отображения карточки
        const titleText = todoItem.querySelector('.trello-card-todo-title-text');
        const descText = todoItem.querySelector('.trello-card-todo-description');
        const userText = todoItem.querySelector('.trello-card-todo-user-info-text');

        titleText.innerHTML = `<span>Title: </span>${todo.title.replace(' ', '<br>')}`;
        descText.innerHTML = `<span>Description: </span>${todo.desc}`;
        userText.innerHTML = `<span>User: </span>${todo.user}`; // Обновление пользователя

        editModal.style.display = 'none';
        saveToDo();
        updateCounters();
    });

    const editCancelButton = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'cancel-button', innerText: 'Cancel' })
    );

    editCancelButton.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    return editModal;
}


//IN PROGRESS
const trelloCardInProgress = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress', id: 'progress' });
trelloWrapCard.appendChild(trelloCardInProgress);

const trelloCardInProgressHead = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-head' });
trelloCardInProgress.appendChild(trelloCardInProgressHead);

const trelloCardInProgressHeadText = Object.assign(document.createElement('h2'), { className: 'trello-card-in-progress-head-text', innerText: 'IN PROGRESS:' });
trelloCardInProgressHead.appendChild(trelloCardInProgressHeadText);

const trelloCardInProgressCounter = Object.assign(document.createElement('h2'), { className: 'trello-card-in-progress-counter', innerText: '0' });
trelloCardInProgressHead.appendChild(trelloCardInProgressCounter);

const trelloCardInProgressBody = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-body' });
trelloCardInProgress.appendChild(trelloCardInProgressBody);

let inProgressCards = [];

function createInProgress(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo2 = { title, desc, id, user, time };
    inProgressCards.push(todo2);
    saveInProgress();

    const trelloCardInProgressItem = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-item' });
    trelloCardInProgressBody.appendChild(trelloCardInProgressItem);

    const trelloCardInProgressWrapButtons = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-wrap-buttons' });
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapButtons);

    const trelloCardInProgressButtonBack = Object.assign(document.createElement('button'), { className: 'trello-card-in-progress-button-back', innerText: 'Back' });
    trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonBack);

    trelloCardInProgressButtonBack.addEventListener('click', function () {
        createToDoTrello(todo2.title, todo2.desc, todo2.id, todo2.user, todo2.time);
        updateCounters();
        saveToDo();

        trelloCardInProgressItem.remove();
        inProgressCards = inProgressCards.filter(elem => elem.id !== todo2.id);
        trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
        saveInProgress();
    });

    const trelloCardInProgressButtonComplete = Object.assign(document.createElement('button'), { className: 'trello-card-in-progress-button-complete', innerText: 'Complete' });
    trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonComplete);

    trelloCardInProgressButtonComplete.addEventListener('click', function () {
        const completedTime = new Date().toLocaleString().slice(11, -3);
        createDone(todo2.title, todo2.desc, todo2.id, todo2.user, completedTime);
        trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) + 1;
        saveDone();

        trelloCardInProgressItem.remove();
        inProgressCards = inProgressCards.filter(elem => elem.id !== todo2.id);
        trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
        saveInProgress();
    });

    const trelloCardInProgressWrapTitle = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-wrap-title' });
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapTitle);

    const trelloCardInProgressTitleText = Object.assign(document.createElement('h3'), { className: 'trello-card-in-progress-title-text', innerHTML: `<span>Title: </span>${title}` });
    trelloCardInProgressWrapTitle.appendChild(trelloCardInProgressTitleText);

    const trelloCardInProgressWrapDescription = Object.assign(document.createElement('div'), { className: 'trello-card-in-progress-wrap-description' });
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapDescription);

    const trelloCardInProgressDescription = Object.assign(document.createElement('h3'), { className: 'trello-card-in-progress-description', innerHTML: `<span>Description: </span>${desc}` });
    trelloCardInProgressWrapDescription.appendChild(trelloCardInProgressDescription);

    const trelloCardInProgressWrapUserInfo = Object.assign(document.createElement('div'), { className: 'trello-card-inProgress-wrap-user-info' });
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapUserInfo);

    const trelloCardInProgressUserInfoText = Object.assign(document.createElement('h3'), { className: 'trello-card-inProgress-user-info-text', innerHTML: `<span>User: </span>${user}` });
    trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoText);

    const trelloCardInProgressUserInfoTime = Object.assign(document.createElement('h3'), { className: 'trello-card-inProgress-user-info-time', innerText: time });
    trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoTime);

    trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) + 1;
}


//DONE
const trelloCardDone = trelloWrapCard.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-done', id: 'done' })
);

const trelloCardDoneHead = trelloCardDone.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-done-head' })
);

const trelloCardDoneHeadText = trelloCardDoneHead.appendChild(
    Object.assign(document.createElement('h2'), { className: 'trello-card-done-head-text', innerText: 'DONE:' })
);

const trelloCardDoneCounter = trelloCardDoneHead.appendChild(
    Object.assign(document.createElement('h2'), { className: 'trello-card-done-counter', innerText: '0' })
);

const trelloCardDoneBody = trelloCardDone.appendChild(
    Object.assign(document.createElement('div'), { className: 'trello-card-done-body' })
);

let doneCards = [];

function createDone(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo3 = { title, desc, id, user, time };
    doneCards.push(todo3);
    saveDone();

    const trelloCardDoneItem = trelloCardDoneBody.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-done-item' })
    );

    const trelloCardDoneWrapButtons = trelloCardDoneItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-done-wrap-buttons' })
    );

    const trelloCardDoneButtonDelete = trelloCardDoneWrapButtons.appendChild(
        Object.assign(document.createElement('button'), { className: 'trello-card-done-button-delete', innerText: 'Delete' })
    );

    trelloCardDoneButtonDelete.addEventListener('click', function () {
        trelloCardDoneItem.remove();
        doneCards = doneCards.filter(elem => elem.id !== id);
        trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) - 1;
        saveDone();
    });

    const trelloCardDoneWrapTitle = trelloCardDoneItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-done-wrap-title' })
    );

    const trelloCardDoneTitleText = trelloCardDoneWrapTitle.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-done-title-text', innerHTML: '<span>Title: </span>' + title })
    );

    const trelloCardDoneWrapDescription = trelloCardDoneItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-done-wrap-description' })
    );

    const trelloCardDoneDescription = trelloCardDoneWrapDescription.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-done-description', innerHTML: '<span>Description: </span>' + desc })
    );

    const trelloCardDoneWrapUserInfo = trelloCardDoneItem.appendChild(
        Object.assign(document.createElement('div'), { className: 'trello-card-done-wrap-user-info' })
    );

    const trelloCardDoneUserInfoText = trelloCardDoneWrapUserInfo.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-done-user-info-text', innerHTML: '<span>User: </span>' + user })
    );

    const trelloCardDoneUserInfoTime = trelloCardDoneWrapUserInfo.appendChild(
        Object.assign(document.createElement('h3'), { className: 'trello-card-done-user-info-time', innerText: time })
    );
}

const trelloDeleteAllButton = trelloCardDone.appendChild(
    Object.assign(document.createElement('button'), { className: 'trello-delete-all-button', innerText: 'Delete All' })
);

function createModalDone() {
    const modalDone = document.body.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal-done' })
    );

    const modalContentDone = modalDone.appendChild(
        Object.assign(document.createElement('div'), { className: 'modal-content-done' })
    );

    const titleDone = modalContentDone.appendChild(
        Object.assign(document.createElement('h3'), { className: 'modal-title-done', textContent: 'Warning!' })
    );

    const descriptionDone = modalContentDone.appendChild(
        Object.assign(document.createElement('h4'), { className: 'modal-description-done', textContent: 'Вы уверены, что хотите удалить весь список?' })
    );

    const wrapButton = modalContentDone.appendChild(
        Object.assign(document.createElement('div'), { className: 'wrap-button-done' })
    );

    const saveButtonDone = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'save-button-done', innerText: 'Confirm' })
    );
    saveButtonDone.addEventListener('click', function () {
        trelloCardDoneBody.innerHTML = '';
        doneCards = [];
        trelloCardDoneCounter.innerText = '0';
        saveDone();
        modalDone.style.display = 'none';
    });

    const cancelButtonDone = wrapButton.appendChild(
        Object.assign(document.createElement('button'), { className: 'cancel-button-done', innerText: 'Cancel' })
    );
    cancelButtonDone.addEventListener('click', function () {
        modalDone.style.display = 'none';
    });
}

trelloDeleteAllButton.addEventListener('click', function () {
    createModalDone();
    const modalDone = document.querySelector('.modal-done');
    modalDone.style.display = 'block';
});


// загрузка данных из LocalStorage
function getNamesTodo() {
    const storedTodos = JSON.parse(localStorage.getItem('todoCards')) || [];

    storedTodos.forEach(todo => {
        createToDoTrello(todo.title, todo.desc, todo.id, todo.user, todo.time);
    });
    updateCounters()

}

function getNamesInProgress() {
    const storedTodos = JSON.parse(localStorage.getItem('inProgressCards')) || [];

    storedTodos.forEach(todo => {
        createInProgress(todo.title, todo.desc, todo.id, todo.user, todo.time);
    });
    trelloCardInProgressCounter.innerText = inProgressCards.length;

}

function getNamesDone() {
    const storedTodos = JSON.parse(localStorage.getItem('doneCards')) || [];

    storedTodos.forEach(todo => {
        createDone(todo.title, todo.desc, todo.id, todo.user, todo.time);
    });
    trelloCardDoneCounter.innerText = doneCards.length;
}

// Сохранение карточек в localStorage
function saveToDo() {
    localStorage.setItem('todoCards', JSON.stringify(todoCards));
}

function saveInProgress() {
    localStorage.setItem('inProgressCards', JSON.stringify(inProgressCards));
}

function saveDone() {
    localStorage.setItem('doneCards', JSON.stringify(doneCards));

}

window.addEventListener('load', function () {
    getNamesTodo(); getNamesInProgress(); getNamesDone();

});
