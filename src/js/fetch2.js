import * as MainModule from './main.js';

export function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            users.forEach((user) => {
                const option1 = document.createElement('option');
                option1.classList.add('option');
                option1.setAttribute('value', user.name);
                option1.innerText = user.name;
                select1.appendChild(option1);
                console.log(user.name + " Email: " + user.email);
            });
        })
        .catch((error) => console.error("Error fetching users", error));

    fetchUsers();
}
