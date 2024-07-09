document.addEventListener('DOMContentLoaded', async function() {
    const logoutButton = document.getElementById('btnLogout');
    logoutButton.addEventListener('click', async function() {
        localStorage.removeItem('idUsuario');
        window.location.href = '../../../index.html';
    });
});