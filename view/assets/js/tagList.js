function loadTagList(strComponente, arrayItems, blnValidation) {

    if (blnValidation) {
        $(strComponente).dxTagBox({
            dataSource: arrayItems,
            displayExpr: 'Nombre',
            valueExpr: 'Id',
        }).dxValidator({
            validationRules: [{
                type: 'required',
                message: 'Este campo no puede ir Vacio'
            }]
        })
    } else {
        $(strComponente).dxTagBox({
            dataSource: arrayItems,
            displayExpr: 'Nombre',
            valueExpr: 'Id',
        })
    }

}