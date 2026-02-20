const loginForm = document.querySelector('form');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showError('Prosim, izpolnite vsa polja!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.geslo === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showSuccess('Uspešno ste se vpisali!');
        setTimeout(() => {
        window.location.href = 'Car_Wash.html';
    }, 1200);
}   else {
        showError('Nepravilno uporabniško ime ali geslo!');
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.backgroundColor = '#fd8783';
    errorMessage.style.color = '#c02621';
    errorMessage.style.borderColor = '#f37974';
    errorMessage.style.display = 'block';
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.backgroundColor = '#d4edda';
    errorMessage.style.color = '#155724';
    errorMessage.style.borderColor = '#c3e6cb';
    errorMessage.style.display = 'block';
}