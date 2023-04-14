function generarGridNotas(strOpcion, strTabla) {
    //Propiedades
    const url = 'https://192.168.1.22/'
    const valToken = $('#valToken').val()
    const userActive = $('#userActive').text()
    intIdentify = $('#rowID').text()
    // Consulta Catalogo Departamentos
    // strConsulta = loadfuncionAjax(`${url}CORE`, 'COREDoctosClientes', `<clsParametros><Opcion>CTC</Opcion><ClaveTipo>06</ClaveTipo></clsParametros>`, valToken)
    arrayColumnasNotas = [{
        dataField: 'NombreTipo',
        caption: 'Tipo',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]
    },
    {
        dataField: 'Nombre',
        caption: 'Nombre',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]
    },
    {
        dataField: 'Usuario',
        caption: 'Usuario',
        dataType: 'string',
    },
    {
        dataField: 'FechaArchivo',
        caption: 'Fecha',
        dataType: 'Date',
        format: 'dd/MMM/yyyy',
        visible: false,
    },
    {
        dataField: 'NombreArchivo',
        caption: 'Nombre Archivo',
        dataType: 'string',
        validationRules: [{
            type: 'required',
        }]
    },
    {
        dataField: 'Peso',
        caption: 'Peso',
        dataType: 'string'
    },
    ]
    // Generar DataGrid con documentos del cliente seleccionado
    strConsulta = loadfuncionAjax(`${url}CORE`, 'COREDocumentosDEV', `<clsParametros>
        <Opcion>${strOpcion}</Opcion>
        <Usuario>${userActive}</Usuario>
        <Tabla>${strTabla}</Tabla>
        <Campo>CTE_Id</Campo>
        <Valor>${intIdentify}</Valor>
        </clsParametros>`, valToken)
    loadDataGrid('#gridDoctos', 350, 10, 'Doctos-Clientes', arrayColumnasNotas, strConsulta.Table, false)
    $('#gridDoctos').dxDataGrid({
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
        onSelectionChanged: function (e) {
            const data = e.selectedRowsData[0].Id
            $('#docId').val(data)
            $('#documento').val('')
            $('#downloadBtn').prop('disabled', false)
            $('#btnUpdateDocto').prop('disabled', false)
            $('#btnDeleteDocto').prop('disabled', false)
            $('#archivoActual').removeClass('d-none')
            cargarInformacionDocto()
        },
    })
}

function cargarInformacionDocto() {
    //Propiedades
    const url = 'https://192.168.1.22/'
    const valToken = $('#valToken').val()
    const userActive = $('#userActive').text()
    let IdDocto = $('#docId').val()
    let empresa = $('#empresa').val()
    let fecha;
    let año;
    let mes;
    let mesFormateado;

    strConsultaDoc = loadfuncionAjax(`${url}CORE`, 'COREDocumentosDEV', `<clsParametros><Opcion>CI</Opcion><clsDocumentos><Id>${IdDocto}</Id></clsDocumentos></clsParametros>`, valToken);
    responseArrayDoctos = strConsultaDoc.Table[0]
    console.log(responseArrayDoctos)
    $('#insertedID').val(responseArrayDoctos.Id)
    $('#docId').val(responseArrayDoctos.Id)
    loadSwitch('#switchDocActivo', responseArrayDoctos.Activo, true, false)
    $('#lookUPCAT_TipoArchivo').dxLookup({value: responseArrayDoctos.IdTipo})
    $('#lookUPCAT_NombreArchivo').dxLookup({value: responseArrayDoctos.Nombre})
    $('#textBoxDescripcionArchivo').dxTextBox({value: responseArrayDoctos.Texto})
    $('#archivoActual').text(responseArrayDoctos.NombreArchivo + '.' + responseArrayDoctos.Extension)
    $('#nombreArchivo').val(responseArrayDoctos.NombreArchivo)
    $('#extension').val(responseArrayDoctos.Extension)
    $('#peso').val(responseArrayDoctos.Peso)
    $('#ruta').val(responseArrayDoctos.Ruta)
    fecha = responseArrayDoctos.Fecha
    año = moment(fecha).format('YYYY');
    mesFormateado = moment(fecha).format('M');
    if (mesFormateado.toString().length == 1) {
        mes = '0' + mesFormateado;
    } else {
        mes = mesFormateado;
    }
    $('#btnDownload').attr('href', 'view/includes/doctos-clientes/' + empresa + '/' + año + '/' + mes + '/' + responseArrayDoctos.Id + '.' + responseArrayDoctos.Extension);
    $('#btnDownload').attr('download', responseArrayDoctos.Id + '.' + responseArrayDoctos.Extension);
    $('#archivoActual').attr('href', 'view/includes/doctos-clientes/' + empresa + '/' + año + '/' + mes + '/' + responseArrayDoctos.Id + '.' + responseArrayDoctos.Extension);
    $('#archivoActual').attr('download', responseArrayDoctos.Id + '.' + responseArrayDoctos.Extension);
}

function limpiar() {
    $('#docId').val('')
    $('#insertedID').val('')
    $('#documento').val('')
    $('#nombreArchivo').val('')
    $('#extension').val('')
    $('#peso').val('')
    $('#ruta').val('')
    $('#archivoActual').text('')
    $('#lookUPCAT_TipoArchivo').dxLookup({value: 1})
    $('#lookUPCAT_NombreArchivo').dxLookup({value: ''})
    $('#textBoxDescripcionArchivo').dxTextBox({value: false})
    $('#archivoActual').addClass('d-none')
}