function loadDataGrid(strComponente, intHeight, intPaging, strTabla, strColumnas, strDatos) {
    $(() => {
        let collapsed = false;
        const dataGrid = $(strComponente).dxDataGrid({
            dataSource: strDatos,
            allowColumnResizing: true,
            allowSorting: true,
            allowFiltering: true,
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            closeOnOutsideClick: true,
            height: intHeight,
            //Modal para ocultar columnas
            columnChooser: {
                enabled: true,
            },
            allowColumnReordering: true,
            rowAlternationEnabled: true,
            // Exportar a excel
            export: {
                enabled: true,
                allowExportSelectedData: true,
            },
            // Selector por row
            selection: {
                mode: 'multiple',
            },
            // Paginador
            paging: {
                pageSize: intPaging,
                // enabled: false,
            },
            filterPanel: {
                visible: true
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 45, 100, 200],
                showInfo: true,
            },
            //Modal para indicar que se estan cargando los datos a la tabla
            loadPanel: {
                enabled: true,
            },
            remoteOperations: false,
            // Buscador
            searchPanel: {
                visible: true,
                highlightCaseSensitive: true,
            },
            // Filtros
            filterRow: {
                visible: true,
                applyFilter: 'auto',
            },
            headerFilter: {
                visible: true,
            },
            // Agrupamiento por columnas
            groupPanel: {
                visible: true
            },
            grouping: {
                autoExpandAll: true,
            },
            // Habilotar columnas fijas
            columnFixing: {
                enabled: true,
            },
            // Nombre columnas, tipo  y diseño
            columns: strColumnas,
            //toolbar
            // toolbar: {
            //     items: [
            //         'saveButton',
            //         'addRowButton',
            //         'searchPanel',
            //         {
            //             location: 'after',
            //             widget: 'dxButton',
            //             options: {
            //                 text: 'Contraer',
            //                 width: 136,
            //                 onClick(e) {
            //                     const expanding = e.component.option('text') === 'Expandir';
            //                     dataGrid.option('grouping.autoExpandAll', expanding);
            //                     e.component.option('text', expanding ? 'Contraer' : 'Expandir');
            //                 },
            //             },
            //         },
            //         'exportButton',
            //         'columnChooserButton',

            //         'groupPanel',
            //     ]
            // },
            // Exportar excel
            onExporting(e) {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet(strTabla);

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], {
                            type: 'application/octet-stream'
                        }), `${strTabla}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onContentReady(e) {
                if (!collapsed) {
                    collapsed = true;
                    e.component.expandRow(['EnviroCare']);
                }
            },
            // Detectar y asignar id al dar click al row del grid

        }).dxDataGrid('instance');
    })
}

function loadGrid(strComponente, intHeight, intPaging, strTabla, strColumnas, strDatos, blnEditing) {
    let collapsed = false;
    const dataGrid = $(strComponente).dxDataGrid({
        dataSource: strDatos,
        allowColumnResizing: true,
        allowSorting: true,
        allowFiltering: true,
        columnAutoWidth: true,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        closeOnOutsideClick: true,
        height: intHeight,
        //Modal para ocultar columnas
        columnChooser: {
            enabled: true,
        },
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        // Exportar a excel
        export: {
            enabled: true,
            allowExportSelectedData: true,
        },
        // Paginador
        paging: {
            pageSize: intPaging,
            // enabled: false,
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [15, 30, 45, 100, 200],
            showInfo: true,
        },
        //Modal para indicar que se estan cargando los datos a la tabla
        loadPanel: {
            enabled: true,
        },
        remoteOperations: false,
        // Buscador
        searchPanel: {
            visible: true,
            highlightCaseSensitive: true,
        },
        // Filtros
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },
        headerFilter: {
            visible: true,
        },
        // Agrupamiento por columnas
        groupPanel: {
            visible: true
        },
        grouping: {
            autoExpandAll: true,
        },
        // Habilotar columnas fijas
        columnFixing: {
            enabled: true,
        },
        // Nombre columnas, tipo  y diseño
        columns: strColumnas,
        editing: {
            allowAdding: blnEditing
        },
        //toolbar
        toolbar: {
            items: [
                'addRowButton',
                'searchPanel',
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: 'Contraer',
                        width: 136,
                        onClick(e) {
                            const expanding = e.component.option('text') === 'Expandir';
                            dataGrid.option('grouping.autoExpandAll', expanding);
                            e.component.option('text', expanding ? 'Contraer' : 'Expandir');
                        },
                    },
                },
                'exportButton',
                'columnChooserButton',

                'groupPanel',
            ]
        },
        // Exportar excel
        onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(strTabla);

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), `${strTabla}.xlsx`);
                });
            });
            e.cancel = true;
        },
        onContentReady(e) {
            if (!collapsed) {
                collapsed = true;
                e.component.expandRow(['EnviroCare']);
            }
        },
        // Detectar y asignar id al dar click al row del grid

    }).dxDataGrid('instance');
}