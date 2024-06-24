document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('passwordForm');
    const passwordsList = document.getElementById('passwords');

    function loadPasswords() {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordsList.innerHTML = '';
        passwords.forEach((password, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="password-info">
                    <strong>Логин:</strong> ${password.login}<br>
                    <strong>Пароль:</strong> ${password.password}<br>
                    <strong>URL:</strong> <a href="${password.url}" target="_blank">${password.url}</a>
                </div>
                <button onclick="deletePassword(${index})">Удалить</button>
            `;
            passwordsList.appendChild(li);
        });
    }

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const url = document.getElementById('url').value;

        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ login, password, url });
        localStorage.setItem('passwords', JSON.stringify(passwords));

        passwordForm.reset();
        loadPasswords();
    });

    window.deletePassword = (index) => {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
    }

    loadPasswords();
});