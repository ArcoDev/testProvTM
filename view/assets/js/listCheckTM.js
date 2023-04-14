function loadListSelection(strSelector, strVariable, strDestino, data, strTypeList, intHeight) {
    if(strTypeList == 'check') {
        strVariable = $(strSelector).dxList({
            dataSource: new DevExpress.data.DataSource({
                store: new DevExpress.data.ArrayStore({
                    key: 'Id',
                    data: data,
                }),
            }),
            height: intHeight,
            searchEnabled: true,
            searchExpr: 'text',
            showSelectionControls: true,
            selectionMode: 'all',
            onSelectionChanged() {
                $(strDestino).text(strVariable.option('selectedItemKeys').join(', '))
            },
        }).dxList('instance')
    } else if(strTypeList == 'dragging') {
        $(strSelector).dxList({
            dataSource: data,
            repaintChangesOnly: true,
            keyExpr: 'Id',
            searchEnabled: true,
            searchExpr: 'text',
            height: intHeight,
            itemDragging: {
                allowReordering: true,
                data: data,
                group: 'data',
                onDragStart(e) {
                    e.itemData = e.fromData[e.fromIndex]
                },
                onAdd(e) {
                    e.toData.splice(e.toIndex, 0, e.itemData)
                    let addItems = []
                    for (let i = 0; i < e.toData.length; i++) {
                        addItems.push(e.toData[i].Id)
                    }
                    $(strDestino).text(addItems)
                    e.component.reload()
                },
                onRemove(e) {
                    e.fromData.splice(e.fromIndex, 1)
                    e.component.reload()
                },
            },
        })
    }
}