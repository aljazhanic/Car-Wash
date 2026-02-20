const form = document.querySelector('form');
const errorMessage = document.getElementById('errorMessage');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');



cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});


expiryDateInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});


cvvInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

   
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    const email = document.getElementById('email').value.trim();
    const geslo = document.getElementById('geslo').value;
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const expiryDate = expiryDateInput.value;
    const cvv = cvvInput.value;

    
    if (!email || !geslo) {
        showError('Prosim, vnesite email in geslo!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.geslo === geslo);

    if (!user) {
        showError('Uporabnik ni registriran ali napačni podatki! Prosim registrirajte se.');
        return;
    }

    
    if (!cardNumber || cardNumber.length !== 16) {
        showError('Številka kartice mora vsebovati 16 številk!');
        return;
    }

    if (!expiryDate || expiryDate.length !== 5) {
        showError('Vnesite veljavnost kartice (MM/YY)!');
        return;
    }

    if (!cvv || cvv.length !== 3) {
        showError('CVV mora vsebovati 3 številke!');
        return;
    }

    
    const [month, year] = expiryDate.split('/');
    if (parseInt(month) < 1 || parseInt(month) > 12) {
        showError('Neveljavni mesec v datumu veljavnosti!');
        return;
    }

   
    const purchase = {
        customerName: `${user.ime} ${user.priimek}`,
        email: user.email,
        location: user.kraj,
        package: 'Standard',
        price: '40.00€',
        discountedPrice: '32.00€', 
        date: new Date().toISOString(),
        cardLastFour: cardNumber.slice(-4),
        userType: 'registered'
    };

   
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));

    showSuccess('Nakup uspešen! Hvala za vaš nakup.');
    setTimeout(() => { 
        window.location.href = 'Car_Wash.html';
    }, 1200); 
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.backgroundColor = '#d4edda';
    errorMessage.style.color = '#155724';
    errorMessage.style.borderColor = '#c3e6cb';
    errorMessage.style.display = 'block';
}