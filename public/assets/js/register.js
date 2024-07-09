document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('register-form')[0].addEventListener('submit', async function(e) {
        e.preventDefault();

        var username = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var errormessage = document.getElementById('errormessage');
        var errorMessageUsername = document.getElementById('errorMessageName');
        var errorMessageEmail = document.getElementById('errorMessageEmail');
        var errorMessagePassword = document.getElementById('errorMessagePassword');

        // Limpia los mensajes de error previos
        errorMessageUsername.innerHTML = '';
        errorMessageEmail.innerHTML = '';
        errorMessagePassword.innerHTML = '';
        errormessage.innerHTML = '';

        // Validación de campos vacíos
        if (username === '' && email === '' && password === '') {
            errorMessageUsername.innerHTML = 'El campo username no puede estar vacío';
            errorMessageEmail.innerHTML = 'El campo email no puede estar vacío';
            errorMessagePassword.innerHTML = 'El campo password no puede estar vacío';
            return;
        }
        if (username === '') {
            errorMessageUsername.innerHTML = 'El campo nombre no puede estar vacío';
            return;
        }
        if (email === '') {
            errorMessageEmail.innerHTML = 'El campo email no puede estar vacío';
            return;
        }
        if (password === '') {
            errorMessagePassword.innerHTML = 'El campo password no puede estar vacío';
            return;
        }

        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            errorMessageEmail.innerHTML = 'El email no es válido';
            return;
        }

        try {
            var response = await fetch('/api/usuarios', { // Asegúrate de que esta ruta coincida con tu configuración en el servidor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: username, email: email, password: password }),
            });

            var data = await response.json();

            if (response.ok) {
                localStorage.setItem('idUsuario', data.body.usuario.id);
                window.location.href = '../user-view/courses_u.html';
            } else {
                errormessage.innerHTML = data.message;
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Ocurrió un error al intentar registrar el usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    });
});