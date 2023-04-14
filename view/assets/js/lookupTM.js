function loadSelect(strUrl, strAccion, strData, strComponente, blnVisible, strVariable, blnValidacion, strToken, blnReadOnly) {
    const request = $.ajax({
        url: strUrl,
        type: 'POST',
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
        strVariable = JSON.parse(response.dataResponse);
        const strCodigo = strVariable.codigo
        const strMensaje = strVariable.message
        if (strCodigo == '600' || strCodigo == '601') {
            Swal.fire({
                icon: 'error',
                title: strMensaje,
                showConfirmButton: true
            });

        } else {
            if (blnValidacion) {
                $(strComponente).dxLookup({
                    items: strVariable.Table,
                    placeholder: 'Selecciona',
                    showClearButton: true,
                    searchEnabled: true,
                    displayExpr: 'Nombre',
                    valueExpr: 'Id',
                    visible: blnVisible,
                    readOnly: blnReadOnly
                }).dxValidator({
                    validationRules: [{
                        type: 'required',
                        message: 'Este campo no puede ir Vacio'
                    }]
                })
            } else {
                $(strComponente).dxLookup({
                    items: strVariable.Table,
                    placeholder: 'Selecciona',
                    showClearButton: true,
                    searchEnabled: true,
                    displayExpr: 'Nombre',
                    valueExpr: 'Id',
                    visible: blnVisible,
                    readOnly: blnReadOnly
                })
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

}