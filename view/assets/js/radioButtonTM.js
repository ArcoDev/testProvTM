function loadRadioButton(strComponente, arrayItems, strLayout, blnReadOnly){
    $(strComponente).dxRadioGroup({
        items: arrayItems,
        value: arrayItems[0],
        layout: strLayout,
        readOnly: blnReadOnly
    });
}