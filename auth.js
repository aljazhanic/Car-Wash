document.addEventListener('DOMContentLoaded', () => {
    const navRight = document.getElementById('navRight');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!navRight) {
        console.log('navRight element not found!');
        return;
    }

    if (currentUser) {
        navRight.innerHTML = `
            <li class="user-icon">
                <img src="Profilna.png" alt="User" />
                <span class="tooltip">
                    ${currentUser.ime} 
                    <br>
                    <a href="#" id="logout">Odjava</a>
                </span>
            </li>
        `;

        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                 
                setTimeout(() => {
        window.location.href = 'Car_Wash.html';
    }, 300);
            });
        }
    } else {
        navRight.innerHTML = `
            <li><a href="Prijava.html">Prijava</a></li>
            <li><a href="Registracija.html">Registracija</a></li>
        `;
    }
});