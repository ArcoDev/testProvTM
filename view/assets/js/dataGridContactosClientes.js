function generarGridContactos(strOpcion, strTabla, strCampo) {
    //Propiedades
    const url = 'https://tmsystem.grupo-tm.mx/'
    const valToken = $('#valToken').val()
    const userActive = $('#userActive').text()
    intIdentify = $('#rowID').text()
    // Consulta Catalogo Departamentos
    strConsulta = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', `<clsParametros><Opcion>CTC</Opcion><ClaveTipo>06</ClaveTipo></clsParametros>`, valToken)
    arrayColumnasContacto = [{
        dataField: 'Nombre',
        caption: 'Nombre',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]
    },
    {
        dataField: 'Puesto',
        caption: 'Puesto',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]
    },
    {
        dataField: 'DepaCompleto',
        caption: 'Departamento',
        dataType: 'string',
        lookup: {
            dataSource: strConsulta.Table,
            valueExpr: 'Id',
            displayExpr: 'Nombre'
        }
    },
    {
        dataField: 'Celular',
        caption: 'Celular',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]

    },
    {
        dataField: 'Telefono',
        caption: 'Teléfono',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]

    },
    {
        dataField: 'Fax',
        caption: 'Fax',
        dataType: 'string'
    },
    {
        dataField: 'Correo',
        caption: 'Correo',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]

    },
    ]
    // Generar DataGrid con contactos del cliente seleccionado
    strConsulta = loadfuncionAjax(`${url}CORE`, 'TMSContacto', `<clsParametros><Opcion>${strOpcion}</Opcion><IdReferencia>${intIdentify}</IdReferencia><Tabla>${strTabla}</Tabla><Campo>CTE_Id</Campo></clsParametros>`, valToken)
    loadDataGrid('#gridContactos', 350, 10, 'Contacto-Clientes', arrayColumnasContacto, strConsulta.Table, true)
    if (strConsulta.Table.length >= 1) {
        $('#doctosButtons').removeClass('d-none')
    } else {
        $('#doctosButtons').addClass('d-none')
    }
    // Funcion CRUD para seccion de contactos
    function ajaxContacto(Id, Activo, Nombre, Puesto, Departamento, Telefono, Fax, Celular, Correo) {
        strData = `<clsParametros>
        <Opcion>G</Opcion>
        <Usuario>${userActive}</Usuario>
        <Tabla>${strTabla}</Tabla>
        <Campo>${strCampo}</Campo> 
        <clsContactos>
        <Id>${Id}</Id>
        <IdReferencia>${intIdentify}</IdReferencia>
        <Nombre>${Nombre}</Nombre>
        <Puesto>${Puesto}</Puesto>
        <CAT_Departamento>${Departamento}</CAT_Departamento>
        <Telefono>${Telefono}</Telefono>
        <Extension></Extension>
        <LadaSinCosto></LadaSinCosto>
        <Fax>${Fax}</Fax>
        <Celular>${Celular}</Celular>
        <Notas></Notas>
        <Correo>${Correo}</Correo>
        <Activo>${Activo}</Activo>
        </clsContactos>
        </clsParametros>`
        strConsulta = loadfuncionAjax(`${url}OperacionesTMS`, 'TMSContacto', strData, valToken, true)
    }
    $('#gridContactos').dxDataGrid({
        editing: {
            refreshMode: 'reshape',
            mode: 'form',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            useIcons: true,
        },
        summary: {
            totalItems: [{
                column: 'Nombre',
                summaryType: 'count'
            }, {
                column: 'OrderDate',
                summaryType: 'min',
                customizeText(data) {
                    return `First: ${DevExpress.localization.formatDate(data.value, 'MMM dd, yyyy')}`;
                },
            }]
        },
        columns: [{
            type: 'buttons',
            width: 110,
            buttons: ['edit', 'delete']
        }],
        onSaved(e) {
            const arrayInfo = e.changes[0].data
            const typeAccion = e.changes[0].type
            if (typeAccion == "insert") {
                if (arrayInfo.DepaCompleto == undefined) {
                    arrayInfo.DepaCompleto = ''
                }
                if (arrayInfo.Fax == undefined) {
                    arrayInfo.Fax = ''
                }
                ajaxContacto(0, 1, arrayInfo.Nombre, arrayInfo.Puesto, arrayInfo.DepaCompleto, arrayInfo.Telefono, arrayInfo.Fax, arrayInfo.Celular, arrayInfo.Correo)
                $('#doctosButtons').removeClass('d-none')
            } else if (typeAccion == 'update') {
                if (arrayInfo.DepaCompleto == undefined) {
                    arrayInfo.DepaCompleto = ''
                }
                if (arrayInfo.Fax == undefined) {
                    arrayInfo.Fax = ''
                }
                ajaxContacto(arrayInfo.Id, 1, arrayInfo.Nombre, arrayInfo.Puesto, arrayInfo.DepaCompleto, arrayInfo.Telefono, arrayInfo.Fax, arrayInfo.Celular, arrayInfo.Correo)
            }
        },
        onRowRemoved(e) {
            const arrayInfo = e.data
            ajaxContacto(arrayInfo.Id, 0, arrayInfo.Nombre, arrayInfo.Puesto, arrayInfo.DepaCompleto, arrayInfo.Telefono, arrayInfo.Fax, arrayInfo.Celular, arrayInfo.Correo)
        }
    })
}