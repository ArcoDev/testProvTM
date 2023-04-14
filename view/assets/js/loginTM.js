$(document).ready(function () {
    /*********************************************************
    Variables globales para consultar la API                               
    *******************************************************/
    // const url = 'https://192.168.1.22'
    // const url = 'https://tmsystem.grupo-tm.com'
    const url = 'https://tmsystem.grupo-tm.com:449'
    // https://tmsystem.grupo-tm/
    let tokenUsr

    function login() {
        /*********************************************************
        PETICION AJAX PARA LA BASE DE DATOS Y PASAR DATOS POR POST
        PARA EL INGRESO AL SISTEMA                               
        *******************************************************/
        $('#send').click(function (event) {
            event.preventDefault()
            const user = $('#user').val()
            const pw = $('#pw').val()
            const request = $.ajax({
                url: `${url}/Access`,
                type: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "Data": `{Usuario: '${user}', Password: '${pw}' }`
                })
            })
            request.done(function (jsonResponse) {
                tokenUsr = jsonResponse.dataResponse
                $.post('./view/includes/post.php', {
                    user: user,
                    pw: pw,
                    token: tokenUsr,
                }, function (data) {
                    if (data != null) {
                        if (tokenUsr == null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo entrar al sistema, verifique sus credenciales o contacte al administrador',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Bienvenido al Portal TM!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function () {
                                window.location.href = "./?ruta=Perfil"
                            }, 1000)
                        }
                    } else {
                        console.log("Error")
                    }
                })
            })
            request.fail(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la petición del servidor, contacta a un personal de sistemas',
                    showConfirmButton: false,
                })
            })
        })
    }
    login()
})