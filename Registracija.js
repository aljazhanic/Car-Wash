const form = document.querySelector('form');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();

 
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    const ime = document.getElementById('ime').value.trim();
    const priimek = document.getElementById('priimek').value.trim();
    const kraj = document.getElementById('kraj').value.trim();
    const posta = document.getElementById('posta').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const geslo = document.getElementById('geslo').value;
    const potrditevGesla = document.getElementById('potrditevGesla').value;

    if (!ime || !priimek || !kraj || !posta || !email || !username || !geslo || !potrditevGesla) {
        showError('Prosim, izpolnite vsa polja!');
        return;
    }

    if (geslo !== potrditevGesla) {
        showError('Geslo in potrditev gesla se ne ujemata!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        showError('Uporabniško ime ali email že obstaja!');
        return;
    }

    users.push({ ime, priimek, kraj, posta, email, username, geslo });
    localStorage.setItem('users', JSON.stringify(users));
    showSuccess('Uspešno ste se registrirali!'); 
    setTimeout(() => {
        window.location.href = 'Prijava.html';
    }, 1200);
});

  
    function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.backgroundColor = '#d4edda';
    errorMessage.style.color = '#155724';
    errorMessage.style.borderColor = '#c3e6cb';
    errorMessage.style.display = 'block';
}



