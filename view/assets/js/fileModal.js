function loadFileModal(strUrl, strToken, strUsuario, arrayColumnas) {
    const $form = document.getElementById('formFile')
    $form.addEventListener('submit', (e) => {
        e.preventDefault()
        intIdentify = $('#rowID').text()
        const formData = new FormData()
        const infoFile = $('#filePod')[0].files[0]
        formData.append('filePod', infoFile)
        const urlNav = window.location.search
        const modulo = urlNav.replace('?ruta=', '')
        cambiarGuionModulo = modulo.replace('-', '_')
        $('#modulo').val(cambiarGuionModulo)
        formData.append('modulo', cambiarGuionModulo)
        const extension = infoFile.name
        const formatExt = extension.split(".")
        const tipoPod = $('#lookupCatTipoPod').children('input[type="hidden"]').val()
        const nombre = $('#textBoxNombre').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val()
        const texto = $('#textAreaTexto').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('textarea').val()
        const añoActual = moment().format('YYYY')
        const mesActual = moment().format('MM')
        const ruta = 'docs_tmsystem\\' + cambiarGuionModulo + '\\' + añoActual + '\\' + mesActual + '\\'
        const fechaArchivo = new Date()
        const formatFecha = moment(fechaArchivo).format('YYYY-MM-DD')
        const formatNomArchivo = infoFile.name
        const nombreArchivo = formatNomArchivo.replace('.pdf', '')
        console.log(infoFile)
        console.log(texto)
        if (infoFile.name == '' || tipoPod === '' || nombre === '' || texto === '') {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Todos los campos son obligatorios!',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            strData = `<clsParametros>
                        <Opcion>G</Opcion>
                        <Usuario>${strUsuario}</Usuario>
                        <clsDocumentos>
                            <Id>0</Id>
                            <IdDocumentosTablas>97</IdDocumentosTablas>
                            <ValorTabla>${intIdentify}</ValorTabla>
                            <Nombre>${nombre}</Nombre>
                            <Texto>${texto}</Texto>
                            <RutaOriginal></RutaOriginal>
                            <NombreArchivo>${nombreArchivo}</NombreArchivo>
                            <Extension>${formatExt[1]}</Extension>
                            <Peso>${infoFile.size}</Peso>
                            <FechaArchivo>${formatFecha}</FechaArchivo>
                            <Ruta>${ruta}</Ruta>
                            <Activo>1</Activo>
                        </clsDocumentos>
                    </clsParametros>`
            console.log(strData)
            strConsulta = loadfuncionAjax(`${strUrl}CORE`, 'COREDoctos', strData, strToken, false)
            idDoctoPOD = strConsulta.Table[0].Id

            $('#nomDocto').val(idDoctoPOD)
            const nomDocto = $('#nomDocto').val()
            formData.append('nomDocto', nomDocto)

            $('#extension').val(formatExt[1])
            const ext = $('#extension').val()
            formData.append('extension', ext)
            $.ajax({
                url: './view/includes/cargarServerDocsPorFecha.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false
            })
            const cargaGridPod = `<clsParametros>
                                    <Opcion>C</Opcion>
                                    <Usuario>${strUsuario}</Usuario>
                                    <Tabla>TTF_OrdenServicio</Tabla>
                                    <Campo>ORS_Id</Campo>
                                    <Valor>${intIdentify}</Valor>
                                </clsParametros>`
            console.log(cargaGridPod)
            strConsulta = loadfuncionAjax(`${strUrl}CORE`, 'COREDoctos', cargaGridPod, strToken, true)
            console.log(strConsulta)
            loadDataGrid('#gridDoctos', 300, 15, 'POD', arrayColumnas, strConsulta.Table)
            $('#gridDoctos').dxDataGrid({
                onSelectionChanged(e) {
                    console.log(e)
                    const urlNav = window.location.search
                    const modulo = urlNav.replace('?ruta=', '')
                    cambiarGuionModulo = modulo.replace('-', '_')
                    $('#modulo').val(cambiarGuionModulo)
                    const añoActual = moment().format('YYYY')
                    const mesActual = moment().format('MM')
                    const idPod = e.selectedRowsData[0].Id
                    const extension = e.selectedRowsData[0].Extension
                    let nombreArchivo = idPod + '.' + extension
                    $('#btnDownloadFile').removeClass('disabled')
                    $('#btnDownloadFile').attr('href', `./view/doctos/${cambiarGuionModulo}/${añoActual}/${mesActual}/${nombreArchivo}`)
                    $('#btnEditFile').removeClass('disabled')
                    $('#btnEditFile').click(() => {
                        $('#loadFile').modal('show')
                    })
                },
                editing: {
                    // mode: 'row',
                    allowUpdating: false,
                    allowAdding: false,
                    allowDeleting: true,
                    selectTextOnEditStart: true,
                    startEditAction: 'click',
                    useIcons: true,
                },
                columns: [{
                    type: 'buttons',
                    buttons: ['delete', 'save', 'cancel'],
                }],
                onRowRemoved(e) {
                    const infoRow = e.data
                    const formatDate = moment(infoRow.FechaArchivo).format('DD/MMM/YYYY')
                    const strDataUpdate = `<clsParametros>
                                            <Opcion>G</Opcion>
                                            <Usuario>${strUsuario}</Usuario>
                                            <clsDocumentos>
                                                <Id>${infoRow.Id}</Id>
                                                <Activo>0</Activo>
                                                <IdDocumentosTablas>97</IdDocumentosTablas>
                                                <ValorTabla>${intIdentify}</ValorTabla>
                                                <Nombre>${infoRow.Nombre}</Nombre>
                                                <Texto>${infoRow.Texto}</Texto>
                                                <RutaFisica>${infoRow.RutaFisica}</RutaFisica>
                                                <NombreArchivo>${infoRow.NombreArchivo}</NombreArchivo>
                                                <Extension>${infoRow.Extension}</Extension>
                                                <Peso>${infoRow.Peso}</Peso>
                                                <FechaArchivo>${formatDate}</FechaArchivo>
                                                <Ruta>${infoRow.Ruta}</Ruta>
                                            </clsDocumentos>
                                        </clsParametros>`
                    strConsulta = loadfuncionAjax(`${strUrl}CORE`, 'COREDoctos', strDataUpdate, strToken, true)
                }
            })
            $('#loadFile').modal('hide')
        }
    })
}