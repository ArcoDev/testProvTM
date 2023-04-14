function loadTextArea(strComponente, blnValidacion, intHeight, blnReadOnly, placeholder) {
    if (blnValidacion) {
        $(strComponente).dxTextArea({
            height: intHeight,
            readOnly: blnReadOnly,
            showClearButton: true,
            placeholder: placeholder 
        }).dxValidator({
            validationRules: [{
                type: 'required',
                message: 'Requerido',
            }],
        })
    } else {
        $(strComponente).dxTextArea({
            height: intHeight,
            readOnly: blnReadOnly,
            showClearButton: true,
            placeholder: placeholder
        })
    }
}