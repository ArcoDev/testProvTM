 // Input number 
function loadNumberBox(strSelector, strMessage, blnValidation, strPlaceHolder, strFormat, blnReadOnly, floatMax, floatMin, blnClearButton) {
    if (blnValidation) {
        $(strSelector).dxNumberBox({
            format: strFormat,
            value: 0,
            placeholder: strPlaceHolder,
            showSpinButtons: true,
            showClearButton: blnClearButton,
            readOnly: blnReadOnly,
            max: floatMax,
            min: floatMin,
        }).dxValidator({
            validationRules: [{
                type: 'required',
                message: strMessage
            }]
        })
    } else {
        $(strSelector).dxNumberBox({
            format: strFormat,
            value: 0,
            placeholder: strPlaceHolder,
            showSpinButtons: true,
            showClearButton: blnClearButton,
            readOnly: blnReadOnly,
            max: floatMax,
            min: floatMin,
        })
    }
}