function loadfuncionAjax(strUrl, strAccion, strData, strToken, blnAlert) {
    let strRespuesta;
    let strCodigo;
    let strMensaje;

    const request = $.ajax({
        url: strUrl,
        type: 'POST',
        async: false,
        cache: true,
        headers: {
            'Content-Type': 'application/json',
        },
        dataType: 'json',
        data: JSON.stringify({
            "Accion": strAccion,
            "Data": strData,
            "Token": strToken
        })
    });
    request.done(function (response) {
        strRespuesta = JSON.parse(response.dataResponse);
        strCodigo = response.codigo;
        strMensaje = response.mensaje;
        if (strCodigo == 600 || strCodigo == 601) {
            Swal.fire({
                icon: 'error',
                title: strMensaje,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            if (blnAlert) {
                Swal.fire({
                    icon: 'success',
                    title: 'Información guardada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                // $('#add').modal('hide')
            }
        }
    });
    request.fail(function () {
        Swal.fire({
            icon: 'error',
            title: 'Error en la petición del servidor, contacta a un personal de sistemas',
            showConfirmButton: false,
        });
    });


    return strRespuesta;
}