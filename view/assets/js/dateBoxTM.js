function loadDateBox(strComponente, blnVisible, blnValidacion, blnReadOnly, strDisplayFormat, strType, strPickerType) {
    const now = new Date();
    if (blnValidacion) {
        $(strComponente).dxDateBox({
            displayFormat: strDisplayFormat,
            showClearButton: true,
            visible: blnVisible,
            readOnly: blnReadOnly,
            pickerType: strPickerType,
            value: now,
            type: strType,
        }).dxValidator({
            validationRules: [{
                type: 'required',
                message: 'Requerido',
            }],
        });
    } else {
        $(strComponente).dxDateBox({
            displayFormat: strDisplayFormat,
            showClearButton: true,
            visible: blnVisible,
            readOnly: blnReadOnly,
            pickerType: strPickerType,
            value: now,
            type: strType,
        })
    }
}