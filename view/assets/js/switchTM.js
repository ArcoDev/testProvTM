function loadSwitch(strComponente,blnValue, blnReadOnly, blnDisabled) {
    $(() => {
        $(strComponente).dxSwitch({
            value: blnValue,
            readOnly: blnReadOnly,
            disabled: blnDisabled,
            switchedOffText: 'No',
            switchedOnText: 'Si'
        });
    });     

}