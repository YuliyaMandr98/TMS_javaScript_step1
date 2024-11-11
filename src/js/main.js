const body = document.querySelector('body');
const trelloContainer = document.createElement('div');
trelloContainer.classList.add('trello-container');
body.appendChild(trelloContainer);

const headerWrapTrello = document.createElement('header');
headerWrapTrello.classList.add('header-wrap-trello');
trelloContainer.appendChild(headerWrapTrello);

const headerTrello = document.createElement('div');
headerTrello.classList.add('header-trello');
headerWrapTrello.appendChild(headerTrello);

const headerText = document.createElement('h1');
headerText.classList.add('header-text');
headerText.innerText = 'Trello';
headerTrello.appendChild(headerText);

const clockHeaderTime = document.createElement('h3');
clockHeaderTime.classList.add('trello-card-todo-header-info-time');
clockHeaderTime.innerText = new Date().toLocaleString().slice(11, -3);
headerTrello.appendChild(clockHeaderTime);

const trelloWrapCard = document.createElement('div');
trelloWrapCard.classList.add('trello-wrap-card');
trelloContainer.appendChild(trelloWrapCard);

const trelloCardTodo = document.createElement('div');
trelloCardTodo.classList.add('trello-card-todo');
trelloCardTodo.setAttribute('id', 'todo');
trelloWrapCard.appendChild(trelloCardTodo);

const trelloCardTodoHead = document.createElement('div');
trelloCardTodoHead.classList.add('trello-card-todo-head');
trelloCardTodo.appendChild(trelloCardTodoHead);

const trelloCardTodoHeadText = document.createElement('h2');
trelloCardTodoHeadText.classList.add('trello-card-todo-head-text');
trelloCardTodoHeadText.innerText = 'TODO:';
trelloCardTodoHead.appendChild(trelloCardTodoHeadText);

const trelloCardTodoCounter = document.createElement('h2');
trelloCardTodoCounter.classList.add('trello-card-todo-counter');
trelloCardTodoCounter.innerText = '0';
trelloCardTodoHead.appendChild(trelloCardTodoCounter);

const trelloCardTodoBody = document.createElement('div');
trelloCardTodoBody.classList.add('trello-card-todo-body');
trelloCardTodo.appendChild(trelloCardTodoBody);

//обновлене счётчиков
function updateCounters() {

    trelloCardTodoCounter.innerText = `${trelloCardTodoBody.querySelectorAll('div.trello-card-todo-item').length}`
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

let todoCards = [];

function createToDoTrello(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo = {
        title: title,
        desc: desc,
        id: id || generateId(),
        user: user || 'user',
        time: time,
    };

    todoCards.push(todo);
    saveToDo();

    const trelloCardTodoItem = document.createElement('div');
    trelloCardTodoItem.classList.add('trello-card-todo-item');
    trelloCardTodoItem.setAttribute('id', todo.id);
    trelloCardTodoBody.appendChild(trelloCardTodoItem);

    const trelloCardTodoWrapButtons = document.createElement('div');
    trelloCardTodoWrapButtons.classList.add('trello-card-todo-wrap-buttons');
    trelloCardTodoItem.appendChild(trelloCardTodoWrapButtons);

    const trelloCardTodoButtonEdit = document.createElement('button');
    trelloCardTodoButtonEdit.classList.add('trello-card-todo-button-edit');
    trelloCardTodoButtonEdit.innerText = 'Edit';
    trelloCardTodoWrapButtons.appendChild(trelloCardTodoButtonEdit);

    function createEditModal() {

        const editModal = document.createElement('div');
        editModal.classList.add('modal');

        const editModalContent = document.createElement('div');
        editModalContent.classList.add('modal-content');

        const editTitleInput = document.createElement('input');
        editTitleInput.classList.add('modal-input');
        editTitleInput.setAttribute('type', 'text');
        editTitleInput.setAttribute('placeholder', 'Title');
        editModalContent.appendChild(editTitleInput);

        const editDescriptionInput = document.createElement('textarea');
        editDescriptionInput.classList.add('modal-input2');
        editDescriptionInput.setAttribute('placeholder', 'Description');
        editModalContent.appendChild(editDescriptionInput);

        const editSelectId = `select-${Date.now()}`; // Уникальный идентификатор для выбора пользователя
        const editSelect = document.createElement('select');
        editSelect.classList.add('select-css');
        editSelect.setAttribute('id', editSelectId);
        //установить значение уже выбранного option
        const selectedUser = todo.user;
        const selectedOption = document.querySelector(`#${editSelectId} option[value="${selectedUser}"]`);
        if (selectedOption) {
            selectedOption.selected = true;
        } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = selectedUser;
            defaultOption.innerText = selectedUser;
            editSelect.appendChild(defaultOption);
        }
        editModalContent.appendChild(editSelect);

        //получение пользователей из api
        function fetchUsersEdit() {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => {
                    return response.json();
                })
                .then((users) => {
                    users.forEach((user) => {
                        const optionEdit = document.createElement('option');
                        optionEdit.classList.add('option');
                        optionEdit.setAttribute('value', user.name);
                        optionEdit.innerText = user.name;
                        editSelect.appendChild(optionEdit);
                    });
                })
                .catch((error) => console.error("Error fetching users", error));
        }
        fetchUsersEdit();

        const wrapButton = document.createElement('div');
        wrapButton.classList.add('wrap-button');
        editModalContent.appendChild(wrapButton)

        const editSaveButton = document.createElement('button');
        editSaveButton.classList.add('save-button');
        editSaveButton.innerText = 'Confirm';
        editSaveButton.addEventListener('click', function () {

            const title = editTitleInput.value;
            const desc = editDescriptionInput.value;
            const user = editSelect.value; // Получение выбранного пользователя
            const id = todo.id;
            const time = todo.time;

            todo.title = title;
            todo.desc = desc;
            todo.user = user;
            todo.id = id;
            todo.time = time;

            editModal.style.display = 'none';
        });
        wrapButton.appendChild(editSaveButton);

        const editCancelButton = document.createElement('button');
        editCancelButton.classList.add('cancel-button');
        editCancelButton.innerText = 'Cancel';
        editCancelButton.addEventListener('click', function () {
            editModal.style.display = 'none';
        });
        wrapButton.appendChild(editCancelButton);

        editModal.appendChild(editModalContent);
        document.body.appendChild(editModal);

        return editModal;
    }


    // Обработчик события для кнопки Edit
    trelloCardTodoButtonEdit.addEventListener('click', function () {
        const modal = createEditModal();
        modal.style.display = 'block';

        // Заполнение полей модального окна существующими данными
        const editTitleInput = modal.querySelector('.modal-input');
        const editDescriptionInput = modal.querySelector('.modal-input2');
        const editSaveButton = modal.querySelector('.save-button');
        const editCancelButton = modal.querySelector('.cancel-button');
        const editSelect = modal.querySelector('.select-css');

        //присваиваю аргументам функции значения переменных
        editTitleInput.value = todo.title;
        editDescriptionInput.value = todo.desc;
        editSelect.value = user;

        editCancelButton.addEventListener('click', function () {
            const editModal = document.querySelector('.modal');
            editModal.style.display = 'none';
        });

        editSaveButton.addEventListener('click', function () {

            const newTitle = editTitleInput.value;
            const newDesc = editDescriptionInput.value;
            const newUser = editSelect.value;
            const newId = todo.id;
            const newTime = todo.time;

            // Обновление текста на карточке
            trelloCardTodoTitleText.innerHTML = '<span>Title: </span>' + newTitle;
            trelloCardTodoDescription.innerHTML = '<span>Description: </span>' + newDesc;
            trelloCardTodoUserInfoText.innerHTML = '<span>User: </span>' + newUser;
            trelloCardTodoUserInfoTime.innerHTML = newTime;

            saveToDo();
            updateCounters();

            editTitleInput.style.display = 'none';
        });
    });

    const trelloCardTodoButtonDelete = document.createElement('button');
    trelloCardTodoButtonDelete.classList.add('trello-card-todo-button-delete');
    trelloCardTodoButtonDelete.innerText = 'Delete';
    trelloCardTodoWrapButtons.appendChild(trelloCardTodoButtonDelete);
    // клик trelloCardTodoButtonDelete
    trelloCardTodoButtonDelete.addEventListener('click', function () {

        // Удаление карточки из todoCards
        todoCards = todoCards.filter(function (elem) {
            return elem.id !== todo.id;
        });
        saveToDo();

        // Удаление карточки из DOM
        trelloCardTodoItem.remove();
        updateCounters();
    });

    const trelloCardTodoWrapTitle = document.createElement('div');
    trelloCardTodoWrapTitle.classList.add('trello-card-todo-wrap-title');
    trelloCardTodoItem.appendChild(trelloCardTodoWrapTitle);

    const trelloCardTodoTitleText = document.createElement('h3');
    trelloCardTodoTitleText.classList.add('trello-card-todo-title-text');
    trelloCardTodoTitleText.innerHTML = '<span>Title: </span>' + title.replace(' ', '<br>'); //перенос текста в новую строку
    trelloCardTodoWrapTitle.appendChild(trelloCardTodoTitleText);

    const trelloCardTodoWrapDescription = document.createElement('div');
    trelloCardTodoWrapDescription.classList.add('trello-card-todo-wrap-description');
    trelloCardTodoItem.appendChild(trelloCardTodoWrapDescription);

    const trelloCardTodoDescription = document.createElement('h3');
    trelloCardTodoDescription.classList.add('trello-card-todo-description');
    trelloCardTodoDescription.innerHTML = '<span>Description: </span>' + desc;
    trelloCardTodoWrapDescription.appendChild(trelloCardTodoDescription);

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

        const wrapButton = document.createElement('div');
        wrapButton.classList.add('wrap-button-progress');
        modalContentProgress.appendChild(wrapButton);

        const saveButtonProgress = document.createElement('button');
        saveButtonProgress.classList.add('save-button-progress');
        saveButtonProgress.innerText = 'Confirm';
        saveButtonProgress.addEventListener('click', function () {
            modalProgress.style.display = 'none';
        });
        wrapButton.appendChild(saveButtonProgress);

        const cancelButtonProgress = document.createElement('button');
        cancelButtonProgress.classList.add('cancel-button-progress');
        cancelButtonProgress.innerText = 'Cancel';
        cancelButtonProgress.addEventListener('click', function () {
            modalProgress.style.display = 'none';
        });
        wrapButton.appendChild(cancelButtonProgress);

        modalProgress.appendChild(modalContentProgress);
        document.body.appendChild(modalProgress);

        return modalProgress;
    }

    // клик trelloCardTodoButtonMore
    trelloCardTodoButtonMore.addEventListener('click', function () {
        const inProgressCards = JSON.parse(localStorage.getItem('inProgressCards')) || [];
        const max_cards = 6;

        if (inProgressCards.length >= max_cards) {
            const modalProgress = createModalProgress();
            modalProgress.style.display = "block";

            const close = document.querySelector(".cancel-button-progress");
            close.onclick = function () {
                modalProgress.style.display = "none";
            }

            // Закрытие модального окна при клике вне окна
            window.onclick = function (event) {
                if (event.target == modalProgress) {
                    modalProgress.style.display = "none";
                }
            }

            return;
        }

        const time = new Date().toLocaleString().slice(11, -3);
        createInProgress(todo.title, todo.desc, todo.id, todo.user, time);

        inProgressCards.push({ title, desc, id, user, time });
        saveInProgress()

        trelloCardTodoItem.remove();
        todoCards = todoCards.filter(function (elem) {
            return elem.id !== id;
        });
        trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) - 1;
        saveToDo();
    });

    const trelloCardTodoWrapUserInfo = document.createElement('div');
    trelloCardTodoWrapUserInfo.classList.add('trello-card-todo-wrap-user-info');
    trelloCardTodoItem.appendChild(trelloCardTodoWrapUserInfo);

    const trelloCardTodoUserInfoText = document.createElement('h3');
    trelloCardTodoUserInfoText.classList.add('trello-card-todo-user-info-text');
    trelloCardTodoUserInfoText.innerHTML = '<span>User: </span>' + user;
    trelloCardTodoWrapUserInfo.appendChild(trelloCardTodoUserInfoText);

    const trelloCardTodoUserInfoTime = document.createElement('h3');
    trelloCardTodoUserInfoTime.classList.add('trello-card-todo-user-info-time');
    trelloCardTodoUserInfoTime.innerText = time;
    trelloCardTodoWrapUserInfo.appendChild(trelloCardTodoUserInfoTime);
}

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
    const select = document.createElement('select');
    select.classList.add('select-css');
    select.setAttribute('id', selectId);
    modalContent.appendChild(select);

    function fetchUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                users.forEach((user) => {
                    const option = document.createElement('option');
                    option.classList.add('option');
                    option.setAttribute('value', user.name);
                    option.innerText = user.name;
                    select.appendChild(option);
                });
            })
            .catch((error) => console.error("Error fetching users", error));
    }
    fetchUsers();

    const wrapButton = document.createElement('div');
    wrapButton.classList.add('wrap-button');
    modalContent.appendChild(wrapButton);

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.innerText = 'Confirm';
    saveButton.addEventListener('click', function () {

        const title = titleInput.value;
        const desc = descriptionInput.value;
        const user = document.getElementById(selectId).value;
        const id = generateId();
        const time = new Date().toLocaleString().slice(11, -3);

        createToDoTrello(title, desc, id, user, time);
        trelloCardTodoCounter.innerText = parseInt(trelloCardTodoCounter.innerText) + 1;

        modal.style.display = 'none';
    });
    wrapButton.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    wrapButton.appendChild(cancelButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
}

trelloCardTodoButtonAdd.addEventListener('click', function () {
    createModal().style.display = 'block';
});


//IN PROGRESS

const trelloCardInProgress = document.createElement('div');
trelloCardInProgress.classList.add('trello-card-in-progress');
trelloCardInProgress.setAttribute('id', 'progress');
trelloWrapCard.appendChild(trelloCardInProgress);

const trelloCardInProgressHead = document.createElement('div');
trelloCardInProgressHead.classList.add('trello-card-in-progress-head');
trelloCardInProgress.appendChild(trelloCardInProgressHead);

const trelloCardInProgressHeadText = document.createElement('h2');
trelloCardInProgressHeadText.classList.add('trello-card-in-progress-head-text');
trelloCardInProgressHeadText.innerText = 'IN PROGRESS:';
trelloCardInProgressHead.appendChild(trelloCardInProgressHeadText);

const trelloCardInProgressCounter = document.createElement('h2');
trelloCardInProgressCounter.classList.add('trello-card-in-progress-counter');
trelloCardInProgressCounter.innerText = '0';
trelloCardInProgressHead.appendChild(trelloCardInProgressCounter);

const trelloCardInProgressBody = document.createElement('div');
trelloCardInProgressBody.classList.add('trello-card-in-progress-body');
trelloCardInProgress.appendChild(trelloCardInProgressBody);

let inProgressCards = [];

function createInProgress(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo2 = {
        title: title,
        desc: desc,
        id: id,
        user: user,
        time: time,
    };

    inProgressCards.push(todo2);
    saveInProgress();

    const trelloCardInProgressItem = document.createElement('div');
    trelloCardInProgressItem.classList.add('trello-card-in-progress-item');
    trelloCardInProgressBody.appendChild(trelloCardInProgressItem);

    const trelloCardInProgressWrapButtons = document.createElement('div');
    trelloCardInProgressWrapButtons.classList.add('trello-card-in-progress-wrap-buttons');
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapButtons);

    const trelloCardInProgressButtonBack = document.createElement('button');
    trelloCardInProgressButtonBack.classList.add('trello-card-in-progress-button-back');
    trelloCardInProgressButtonBack.innerText = 'Back';
    trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonBack);

    trelloCardInProgressButtonBack.addEventListener('click', function () {
        const title = todo2.title;
        const desc = todo2.desc;
        const id = todo2.id;
        const user = todo2.user;
        const time = todo2.time;

        createToDoTrello(title, desc, id, user, time);
        updateCounters();
        saveToDo();

        trelloCardInProgressItem.remove();
        inProgressCards = inProgressCards.filter(function (elem) {
            return elem.id !== id;
        });
        trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
        saveInProgress();
    });

    const trelloCardInProgressButtonComplete = document.createElement('button');
    trelloCardInProgressButtonComplete.classList.add('trello-card-in-progress-button-complete');
    trelloCardInProgressButtonComplete.innerText = 'Complete';
    trelloCardInProgressWrapButtons.appendChild(trelloCardInProgressButtonComplete);

    trelloCardInProgressButtonComplete.addEventListener('click', function () {
        const title = todo2.title;
        const desc = todo2.desc;
        const id = todo2.id;
        const user = todo2.user;
        const time = new Date().toLocaleString().slice(11, -3);

        createDone(title, desc, id, user, time);
        trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) + 1;
        saveDone();

        trelloCardInProgressItem.remove();
        inProgressCards = inProgressCards.filter(function (elem) {
            return elem.id !== id;
        });
        trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) - 1;
        saveInProgress();
    })

    const trelloCardInProgressWrapTitle = document.createElement('div');
    trelloCardInProgressWrapTitle.classList.add('trello-card-in-progress-wrap-title');
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapTitle);

    const trelloCardInProgressTitleText = document.createElement('h3');
    trelloCardInProgressTitleText.classList.add('trello-card-in-progress-title-text');
    trelloCardInProgressTitleText.innerHTML = '<span>Title: </span>' + title;
    trelloCardInProgressWrapTitle.appendChild(trelloCardInProgressTitleText);

    const trelloCardInProgressWrapDescription = document.createElement('div');
    trelloCardInProgressWrapDescription.classList.add('trello-card-in-progress-wrap-description');
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapDescription);

    const trelloCardInProgressDescription = document.createElement('h3');
    trelloCardInProgressDescription.classList.add('trello-card-in-progress-description');
    trelloCardInProgressDescription.innerHTML = '<span>Description: </span>' + desc;
    trelloCardInProgressWrapDescription.appendChild(trelloCardInProgressDescription);

    const trelloCardInProgressWrapUserInfo = document.createElement('div');
    trelloCardInProgressWrapUserInfo.classList.add('trello-card-inProgress-wrap-user-info');
    trelloCardInProgressItem.appendChild(trelloCardInProgressWrapUserInfo);

    const trelloCardInProgressUserInfoText = document.createElement('h3');
    trelloCardInProgressUserInfoText.classList.add('trello-card-inProgress-user-info-text');
    trelloCardInProgressUserInfoText.innerHTML = '<span>User: </span>' + user;
    trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoText);

    const trelloCardInProgressUserInfoTime = document.createElement('h3');
    trelloCardInProgressUserInfoTime.classList.add('trello-card-inProgress-user-info-time');
    trelloCardInProgressUserInfoTime.innerText = time;
    trelloCardInProgressWrapUserInfo.appendChild(trelloCardInProgressUserInfoTime);
    trelloCardInProgressCounter.innerText = parseInt(trelloCardInProgressCounter.innerText) + 1;
}


//DONE

const trelloCardDone = document.createElement('div');
trelloCardDone.classList.add('trello-card-done');
trelloCardDone.setAttribute('id', 'done');
trelloWrapCard.appendChild(trelloCardDone);

const trelloCardDoneHead = document.createElement('div');
trelloCardDoneHead.classList.add('trello-card-done-head');
trelloCardDone.appendChild(trelloCardDoneHead);

const trelloCardDoneHeadText = document.createElement('h2');
trelloCardDoneHeadText.classList.add('trello-card-done-head-text');
trelloCardDoneHeadText.innerText = 'DONE:';
trelloCardDoneHead.appendChild(trelloCardDoneHeadText);

const trelloCardDoneCounter = document.createElement('h2');
trelloCardDoneCounter.classList.add('trello-card-done-counter');
trelloCardDoneCounter.innerText = '0';
trelloCardDoneHead.appendChild(trelloCardDoneCounter);

const trelloCardDoneBody = document.createElement('div');
trelloCardDoneBody.classList.add('trello-card-done-body');
trelloCardDone.appendChild(trelloCardDoneBody);

let doneCards = [];
let swiper = null; // Переменная для хранения экземпляра Swiper

function createDone(title, desc, id, user, time = new Date().toLocaleString().slice(11, -3)) {
    const todo3 = {
        title: title,
        desc: desc,
        id: id,
        user: user,
        time: time,
    };

    doneCards.push(todo3);
    saveDone();

    const trelloCardDoneItem = document.createElement('div');
    trelloCardDoneItem.classList.add('trello-card-done-item');
    trelloCardDoneBody.appendChild(trelloCardDoneItem);

    const trelloCardDoneWrapButtons = document.createElement('div');
    trelloCardDoneWrapButtons.classList.add('trello-card-done-wrap-buttons');
    trelloCardDoneItem.appendChild(trelloCardDoneWrapButtons);

    const trelloCardDoneButtonDelete = document.createElement('button');
    trelloCardDoneButtonDelete.classList.add('trello-card-done-button-delete');
    trelloCardDoneButtonDelete.innerText = 'Delete';
    trelloCardDoneWrapButtons.appendChild(trelloCardDoneButtonDelete);

    trelloCardDoneButtonDelete.addEventListener('click', function () {
        trelloCardDoneItem.remove();
        doneCards = doneCards.filter(function (elem) {
            return elem.id !== id;
        });
        trelloCardDoneCounter.innerText = parseInt(trelloCardDoneCounter.innerText) - 1;
        saveDone();
    });

    const trelloCardDoneWrapTitle = document.createElement('div');
    trelloCardDoneWrapTitle.classList.add('trello-card-done-wrap-title');
    trelloCardDoneItem.appendChild(trelloCardDoneWrapTitle);

    const trelloCardDoneTitleText = document.createElement('h3');
    trelloCardDoneTitleText.classList.add('trello-card-done-title-text');
    trelloCardDoneTitleText.innerHTML = '<span>Title: </span>' + title;
    trelloCardDoneWrapTitle.appendChild(trelloCardDoneTitleText);

    const trelloCardDoneWrapDescription = document.createElement('div');
    trelloCardDoneWrapDescription.classList.add('trello-card-done-wrap-description');
    trelloCardDoneItem.appendChild(trelloCardDoneWrapDescription);

    const trelloCardDoneDescription = document.createElement('h3');
    trelloCardDoneDescription.classList.add('trello-card-done-description');
    trelloCardDoneDescription.innerHTML = '<span>Description: </span>' + desc;
    trelloCardDoneWrapDescription.appendChild(trelloCardDoneDescription);

    const trelloCardDoneWrapUserInfo = document.createElement('div');
    trelloCardDoneWrapUserInfo.classList.add('trello-card-done-wrap-user-info');
    trelloCardDoneItem.appendChild(trelloCardDoneWrapUserInfo);

    const trelloCardDoneUserInfoText = document.createElement('h3');
    trelloCardDoneUserInfoText.classList.add('trello-card-done-user-info-text');
    trelloCardDoneUserInfoText.innerHTML = '<span>User: </span>' + user;
    trelloCardDoneWrapUserInfo.appendChild(trelloCardDoneUserInfoText);

    const trelloCardDoneUserInfoTime = document.createElement('h3');
    trelloCardDoneUserInfoTime.classList.add('trello-card-done-user-info-time');
    trelloCardDoneUserInfoTime.innerText = time;
    trelloCardDoneWrapUserInfo.appendChild(trelloCardDoneUserInfoTime);

}

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

    const wrapButton = document.createElement('div');
    wrapButton.classList.add('wrap-button-done');
    modalContentDone.appendChild(wrapButton);

    const saveButtonDone = document.createElement('button');
    saveButtonDone.classList.add('save-button-done');
    saveButtonDone.innerText = 'Confirm';
    saveButtonDone.addEventListener('click', function () {
        trelloCardDoneBody.innerHTML = '';
        doneCards = [];
        trelloCardDoneCounter.innerText = '0';
        saveDone();
        modalDone.style.display = 'none';
    });
    wrapButton.appendChild(saveButtonDone);

    const cancelButtonDone = document.createElement('button');
    cancelButtonDone.classList.add('cancel-button-done');
    cancelButtonDone.innerText = 'Cancel';
    cancelButtonDone.addEventListener('click', function () {
        modalDone.style.display = 'none';
    });
    wrapButton.appendChild(cancelButtonDone);

    modalDone.appendChild(modalContentDone);
    const body = document.querySelector('body');
    body.appendChild(modalDone);

    return createModalDone;
};

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
