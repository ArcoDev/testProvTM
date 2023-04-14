function loadBoton(strComponente, strText, strType, blnSubmit, blnVisible, blnDisabled) {
    $(strComponente).dxButton({
        text: strText,
        type: strType,
        useSubmitBehavior: blnSubmit,
        visible: blnVisible,
        disabled: blnDisabled
    })
}