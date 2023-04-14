function loadTextBox(strComponente, blnVisible, strPlaceHolder, blnValidacion, blnReadOnly) {
    if (blnValidacion)
    {
        $(strComponente).dxTextBox({
            showClearButton: true, 
            placeholder: strPlaceHolder,
            visible:blnVisible,
            readOnly: blnReadOnly,
          }).dxValidator({
            validationRules: [{
              type: 'required',
              message: 'Requerido',
            }
            /*, {
              type: 'pattern',
              pattern: /^[^0-9]+$/,
              message: 'Do not use digits in the Name.',
            }, {
              type: 'stringLength',
              min: 2,
              message: 'Name must have at least 2 symbols',
            
            }*/
        ],
          });
    }
    else
    {
        $(strComponente).dxTextBox({
            showClearButton: true,
            placeholder: strPlaceHolder,
            visible:blnVisible,
            readOnly: blnReadOnly,
          })   

    }

}