window.addEventListener('DOMContentLoaded', () => {
    // const url = 'http://transmonteslerdo.fortidyndns.com:8045/'
    // const url = 'https://tmsystem.grupo-tm.com/'
    const url = 'https://201.151.59.194:449/'
    const valToken = $('#valToken').val()
    const userActive = $('#userActive').text()
    const perId = $('#perId').val()

    //? VARIABLES 
    let strConsulta, agenciaId, pagoId, strConsultaAgencia, strConsultaPago

    const passwordEditor = $('#textBoxPassword').dxTextBox({
        mode: 'password',
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: 'fa fa-eye',
                type: 'default',
                onClick() {
                    passwordEditor.option('mode', passwordEditor.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance')

    //? TIPOS DE USUARIO
    if (perId == 1) {
        //ES ADMINISTRADOR
        $('#btnVerLicitaciones').addClass('d-none')
        $('#seccionProveedor').addClass('d-none')
        loadBoton('#btnCambiarPassword', 'Actualizar', 'success', false, true, true)

        $('#textBoxUsuario').dxTextBox({
            value: userActive
        })
    } else if (perId == 20) {
        //ES PROVEEDOR
        $('#btnVerLicitaciones').removeClass('d-none')
        $('#seccionProveedor').removeClass('d-none')
        loadBoton('#btnCambiarPassword', 'Actualizar', 'success', false, true, false)

        //? CONSULTA PARA TRAER EL PROVEEDOR DE ID 
        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>VPW</Opcion><Usuario>${userActive}</Usuario></clsParametros>`, valToken, false)
        const idProv = strConsulta.Table[0].IdProv
        // console.log(strConsulta)
        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CI</Opcion><clsPRY_ProveedorDiesel><Id>${idProv}</Id></clsPRY_ProveedorDiesel></clsParametros>`, valToken, false)
        const perfil = strConsulta.Table[0]
        console.log(perfil)
        $('#Id').val(perfil.Id)
        $('#textBoxUsuario').dxTextBox({
            value: perfil.UsuarioReset
        })
        $('#textBoxPassword').dxTextBox({
            value: perfil.PasswordReset
        })
        $('#textBoxNombreVendedor').dxTextBox({
            value: perfil.NombreVendedor
        })
        $('#textBoxProveedor').dxTextBox({
            value: perfil.Proveedor
        })
        $('#textBoxTelefono').dxTextBox({
            value: perfil.Telefono,
            mask: "(000)000-0000"
        })
        $('#textBoxCorreo').dxTextBox({
            value: perfil.Correo
        })
        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CPA</Opcion><clsPRY_ProveedorDiesel><Id>${perfil.Id}</Id></clsPRY_ProveedorDiesel></clsParametros>`, valToken, false)
        const agenciaProveedor = strConsulta.Table
        console.log(agenciaProveedor)
        //? PRESENCIA AGENCIA
        strConsultaAgencia = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>Cat_ProvDPresenciaAgencia</ClaveTipo></clsParametros>', valToken, false)
        console.log(strConsultaAgencia)
        loadTagList('#tagListAgencia', strConsultaAgencia.Table, true)
        const arrayAgencia = []
        const arrayPago = []
        for (item in agenciaProveedor) {
            arrayAgencia.push(agenciaProveedor[item].Id)
            $('#tagListAgencia').dxTagBox({
                dataSource: strConsultaAgencia.Table,
                valueExpr: 'Id',
                value: arrayAgencia,
                displayExpr: 'Nombre',
            })
        }
        $('#tagListAgencia').dxTagBox({
            showSelectionControls: true,
            applyValueMode: 'useButtons',
            onValueChanged(e) {
                const ids = e.value
                const xmlAgencia = []
                for (idAge in ids) {
                    const idAgencia = ids[idAge]
                    agenciaId = `<agencia>
                                    <clsPresenciaAgencia>
                                        <idCatAgencia>${idAgencia}</idCatAgencia>
                                    </clsPresenciaAgencia>
                                </agencia>`
                    xmlAgencia.push(agenciaId)
                    $('#xmlAgencia').text(xmlAgencia)
                }
            }
        })
        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CPP</Opcion><clsPRY_ProveedorDiesel><Id>${perfil.Id}</Id></clsPRY_ProveedorDiesel></clsParametros>`, valToken, false)
        const pagoProveedor = strConsulta.Table
        console.log(pagoProveedor)
        //? FORMA DE PAGO
        strConsultaPago = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>CAT_ProvDFormaPago</ClaveTipo></clsParametros>', valToken, false)
        console.log(strConsultaPago.Table)
        for (item in pagoProveedor) {
            arrayPago.push(pagoProveedor[item].Id)
            $('#tagListPago').dxTagBox({
                dataSource: strConsultaPago.Table,
                valueExpr: 'Id',
                value: arrayPago,
                displayExpr: 'Nombre',
            })
        }
        loadTagList('#tagListPago', strConsultaPago.Table, true)
        $('#tagListPago').dxTagBox({
            showSelectionControls: true,
            applyValueMode: 'useButtons',
            onValueChanged(e) {
                const ids = e.value
                const xmlPago = []
                for (idPag in ids) {
                    const idPago = ids[idPag]
                    pagoId = `<pago>
                                    <clsFormaDePago>
                                        <idCatPago>${idPago}</idCatPago>
                                    </clsFormaDePago>
                                </pago>`
                    xmlPago.push(pagoId)
                    $('#xmlPago').text(xmlPago)
                }
            }
        })
        loadBoton('#btnSaveProv', 'Guardar', 'success', true, true, false)
        $('#btnSaveProv').dxButton({
            icon: 'fas fa-save'
        })
        loadBoton('#btnLimpiar', 'Limpiar', 'default', true, true, false)
        $('#btnLimpiar').dxButton({
            icon: 'fas fa-brush'
        })

        //? RESET
        function resetInput() {
            //$('#Id').val(0)
            $('#textBoxUsuario').dxTextBox({
                value: false
            })
            $('#textBoxPassword').dxTextBox({
                value: false
            })
            $('#textBoxNombreVendedor').dxTextBox({
                value: false
            })
            $('#textBoxProveedor').dxTextBox({
                value: false
            })
            $('#textBoxTelefono').dxTextBox({
                value: false
            })
            $('#textBoxCorreo').dxTextBox({
                value: false
            })
            $('#tagListPago').dxTagBox({
                value: false
            })
            $('#xmlPago').text('')
            $('#tagListAgencia').dxTagBox({
                value: false
            })
            $('#xmlAgencia').text('')
        }

        //? GURDAR
        function guardar() {
            const Id = $('#Id').val()
            const nombreVendedor = $('#textBoxNombreVendedor').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val()
            const proveedor = $('#textBoxProveedor').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val()
            const telefono = $('#textBoxTelefono').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val()
            const correo = $('#textBoxCorreo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val()
            const presenciaAgencia = $('#xmlAgencia').text()
            const formaPago = $('#xmlPago').text()
            console.log(presenciaAgencia)
            strData = `<clsParametros>
                                <Opcion>G</Opcion>
                                <Usuario>${userActive}</Usuario>
                                <clsPRY_ProveedorDiesel>
                                    <Id>${Id}</Id>
                                    <NombreVendedor>${nombreVendedor}</NombreVendedor>
                                    <Proveedor>${proveedor}</Proveedor>
                                    <Telefono>${telefono}</Telefono>
                                    <Correo>${correo}</Correo>
                                    <Activo>1</Activo>
                                    ${presenciaAgencia}
                                    ${formaPago}
                                </clsPRY_ProveedorDiesel>
                            </clsParametros>`
            console.log(strData)
            strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', strData, valToken, true)
            // console.log(strConsulta)
        }

        loadBoton('#btnVerLicitaciones', 'Ver Licitaciones', 'default', false, true, false)
        loadTextBox('#textBoxNombreVendedor', true, 'Ingresa el nombre del vendedor', true, false)
        loadTextBox('#textBoxProveedor', true, 'Ingresa el proveedor', true, false)
        loadTextBox('#textBoxTelefono', true, 'Ingresa el teléfono', true, false)
        loadTextBox('#textBoxCorreo', true, 'Ingresa el correo electronico', true, false)
    } else if (perId == 26) {
        //ES CLIENTE
        $('#btnVerLicitaciones').addClass('d-none')
        $('#seccionProveedor').addClass('d-none')
        loadBoton('#btnCambiarPassword', 'Actualizar', 'success', false, true, false)

        $('#textBoxUsuario').dxTextBox({
            value: userActive
        })
    }

    //? COMPONENTES ALTA PROVEEDOR
    loadTextBox('#textBoxUsuario', true, 'Ingresa tu usuario', true, true)
    loadTextBox('#textBoxPassword', true, 'Ingresa tu contraseña', true, false)

    //? ACCIONES
    $('#btnCambiarPassword').dxButton({
        icon: 'fas fa-save',
        onClick() {
            if (perId == 20) {
                //ES PROVEEDOR
                const Id = $('#Id').val()
                const password = $('#textBoxPassword').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="password"]').val()
                const strConsultaUsr = `<clsParametros>
                                                <Opcion>UPD</Opcion>
                                                <Id>${Id}</Id>
                                                <Password>${password}</Password>
                                            </clsParametros>`
                console.log(strConsultaUsr)
                strConsulta = loadfuncionAjax(`${url}OperacionesWEB`, 'LoginProveedores', strConsultaUsr, valToken, false)
            } else if (perId == 26) {
                //ES CLIENTE
                const password = $('#textBoxPassword').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="password"]').val()
                const strConsultaUsr = `<clsParametros>
                                                <Opcion>MCC</Opcion>
                                                <Usuario>${userActive}</Usuario>
                                                <Password>${password}</Password>
                                            </clsParametros>`
                strConsulta = loadfuncionAjax(`${url}OperacionesWEB`, 'LoginProveedores', strConsultaUsr, valToken, true)
            }
            $('#valToken').val('')
            window.location = './destroySession.php'
        }
    })
    $('#btnVerLicitaciones').dxButton({
        icon: 'fas fa-eye',
        onClick() {
            window.location = './?ruta=Pujar-Licitacion'
        }
    })
    $('#addProveedor').on('submit', (e) => {
        e.preventDefault()
        guardar()
    })
    $('#btnLimpiar').dxButton({
        onClick() {
            resetInput()
        }
    })
    $('#consulta').click(() => {
        generarGrid('C')
    })
    $('#consultaTodo').click(() => {
        generarGrid('CT')
    })
})