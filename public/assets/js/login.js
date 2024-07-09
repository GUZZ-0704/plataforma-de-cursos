document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('login-form')[0].addEventListener('submit', async function(e) {
        e.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var errormessage = document.getElementById('errormessage');
        var errorMessageEmail = document.getElementById('errorMessageEmail');
        var errorMessagePassword = document.getElementById('errorMessagePassword');

        // Limpia los mensajes de error previos
        errorMessageEmail.innerHTML = '';
        errorMessagePassword.innerHTML = '';
        errormessage.innerHTML = '';

        // Validación de campos vacíos
        if (email === '' && password === '') {
            errorMessageEmail.innerHTML = 'El campo email no puede estar vacío';
            errorMessagePassword.innerHTML = 'El campo password no puede estar vacío';
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
            var response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            var data = await response.json();

            if (response.ok) {
                localStorage.setItem('idUsuario', data.body.usuario.id);
                if(data.body.usuario.rol === 'admin'){
                    window.location.href = '../admin-view/courses_a.html';
                }else {
                    window.location.href = '../user-view/courses_u.html';
                }
            } else {
                errormessage.innerHTML = data.message;
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
        }
    });
});
