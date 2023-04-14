window.addEventListener('DOMContentLoaded', () => {
    // const url = 'http://transmonteslerdo.fortidyndns.com:8045/'
    // const url = 'https://tmsystem.grupo-tm.com/'
    const url = 'https://201.151.59.194:449/'
    const valToken = $('#valToken').val()
    const userActive = $('#userActive').text()

    //? VARIABLES
    let strConsulta, strConsultaProv, strData, infoLicitacion, ltsTorreon, ltsManz, ltsQrt, ltsMty, ltsNvoLaredo, strConsultaPago, arrayAgenciaId, xmlTrc, xmlMty, xmlQrt, xmlManz, xmlNvoLaredo, idTrc, idMty, idQrt, idManz, idNvoLaredo
    let colLicitaciones = [{
        dataField: 'Id',
        caption: '#',
        dataType: 'number'
    }, {
        dataField: 'FechaCierre',
        caption: 'Fecha Cierre',
        dataType: 'datetime',
        format: 'dd/MM/yyyy h:mm:ss a',
    }, {
        dataField: 'LtsTrc',
        caption: 'Torreón',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'LtsMty',
        caption: 'Monterrey',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'LtsNvoLaredo',
        caption: 'Nuevo Laredo',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'LtsManz',
        caption: 'Manzanillo',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'LtsQrt',
        caption: 'Queretaro',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'LtsTotales',
        caption: 'Total',
        dataType: 'number',
        format: '#,##0.## lts'
    }, {
        dataField: 'Estatus',
        caption: 'Estatus',
        dataType: 'string',
        visible: false
    }]

    //? DATOS LICITACION
    loadDateBox('#dateBoxCierreLicitacion', true, false, true, 'dd/MM/yyyy, h:mm:ss a', 'datetime', 'calendar')
    $('#dateBoxCierreLicitacion').dxDateBox({
        value: ''
    })
    generarNumberBox('#numberBoxLitrosPedidos', false, '#,##0.## lts', 1500, '', true)
    generarNumberBox('#numberBoxOfertadores', false, '#,##0', '', '', true)
    generarNumberBox('#numberBoxOfertadoresPendientes', false, '#,##0.##', '', '', true)

    function generarNumberBox(strComponente, blnShowBtn, strFormat, intVal, intMax, blnReadOnly) {
        loadNumberBox(strComponente, '', false, '0', strFormat, blnReadOnly, intMax, 0, blnShowBtn)
        $(strComponente).dxNumberBox({
            value: intVal,
        })
    }

    //? TORREON
    generarNumberBox('#numberBoxLtsTorreon', false, '#,##0.## lts', 0, 80000, true)
    generarNumberBox('#numberBoxContadoTrc', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxAmeTrc', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito4Trc', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito7Trc', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxPrepagoTrc', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxIVATrc', false, '#0%', 0, '', false)

    //? NUEVO LAREDO
    generarNumberBox('#numberBoxLtsNvoLaredo', false, '#,##0.## lts', 0, 80000, true)
    generarNumberBox('#numberBoxContadoNvoLaredo', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxAmeNvoLaredo', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito4NvoLaredo', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito7NvoLaredo', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxPrepagoNvoLaredo', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxIVANvoLaredo', false, '#0%', 0, '', false)

    //? QUERETARO
    generarNumberBox('#numberBoxLtsQrt', false, '#,##0.## lts', 0, 80000, true)
    generarNumberBox('#numberBoxContadoQrt', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxAmeQrt', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito4Qrt', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito7Qrt', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxPrepagoQrt', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxIVAQrt', false, '#0%', 0, '', false)

    //? MANZANILLO
    generarNumberBox('#numberBoxLtsManz', false, '#,##0.## lts', 0, 30000, true)
    generarNumberBox('#numberBoxContadoManz', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxAmeManz', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito4Manz', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito7Manz', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxPrepagoManz', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxIVAManz', false, '#0%', 0, '', false)

    //? MONTERREY
    generarNumberBox('#numberBoxLtsMty', false, '#,##0.## lts', 0, 30000, true)
    generarNumberBox('#numberBoxContadoMty', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxAmeMty', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito4Mty', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxCredito7Mty', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxPrepagoMty', false, '$#,##0.##', 0, '', true)
    generarNumberBox('#numberBoxIVAMty', false, '#0%', 0, '', false)

    //? LITROS TOTALES
    generarNumberBox('#numberBoxTotalLitros', true, '#,##0.## lts', '', '', true)

    //? BOTONES
    loadBoton('#btnCalcularTotal', 'Calcular Total', 'success', false, true, true)
    loadBoton('#btnEnviarPuja', 'Enviar Puja', 'default', false, true, true)
    loadBoton('#btnLimpiar', 'Limpiar', 'danger', false, true, false)

    //? CATALOGO LICITACIONES ABIERTAS
    const strConsultaLic = loadfuncionAjax(`${url}Proyectos`, 'PRYLicitacionDiesel', `<clsParametros><Opcion>CLE</Opcion></clsParametros>`, valToken, false)
    loadDropDown('#lookUpEditLicitaciones', strConsultaLic.Table, colLicitaciones, '', true, false)

    //? CONSULTA LICITACION SELECCIONADA
    $('#lookUpEditLicitaciones').dxDropDownBox({
        onValueChanged(e) {
            console.log(e)
            const idLicitacion = e.value
            console.log(idLicitacion)
            if (idLicitacion === null || idLicitacion === '') {
                $('#textAgencia').addClass('d-none')
                $('#cajaTrc').addClass('d-none')
                $('#cajaMty').addClass('d-none')
                $('#cajaQrt').addClass('d-none')
                $('#cajaManz').addClass('d-none')
                $('#cajaNvoLaredo').addClass('d-none')
                $('#alert').addClass('d-none')
                const fechaActual = Date()
                $('#dateBoxCierreLicitacion').dxDateBox({
                    value: fechaActual
                })
                $('#numLicitacion').text('#')
                $('#numberBoxOfertadores').dxNumberBox({
                    value: 0
                })
                $('#numberBoxOfertadoresPendientes').dxNumberBox({
                    value: 0
                })
            } else {
                $('#textAgencia').addClass('d-none')
                $('#idLicitacion').val(idLicitacion)
                strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYLicitacionDiesel', `<clsParametros><Opcion>CI</Opcion><clsPRY_LicitacionDiesel><Id>${idLicitacion}</Id></clsPRY_LicitacionDiesel></clsParametros>`, valToken, false)
                infoLicitacion = strConsulta.Table[0]
                console.log(infoLicitacion)
                strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CDN</Opcion></clsParametros>`, valToken, false)
                const provPendientes = strConsulta.Table[0].ProvPendientes
                $('#numLicitacion').text(`#${infoLicitacion.Id}`)
                $('#dateBoxCierreLicitacion').dxDateBox({
                    value: infoLicitacion.FechaCierre
                })
                $('#numberBoxOfertadores').dxNumberBox({
                    value: infoLicitacion.ProvOferta
                })
                $('#numberBoxOfertadoresPendientes').dxNumberBox({
                    value: provPendientes
                })
                $('#alert').removeClass('d-none')
                $('#estatus').text(infoLicitacion.Estatus)

                //? CONULTAR TIPO DE PAGO DE PROVEEDOR LOGEADO 
                strConsultaProv = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CPU</Opcion><Usuario>${userActive}</Usuario></clsParametros>`, valToken, false)
                console.log(strConsultaProv)
                $('#idProveedor').val(strConsultaProv.Table[0].Id)
                const strAgencia = strConsultaProv.Table[0].PresenciaAgencia
                const arrayAgencia = strAgencia.split(',')
                const strAgenciaId = strConsultaProv.Table[0].IdAgencia
                arrayAgenciaId = strAgenciaId.split(',')
                const strPago = strConsultaProv.Table[0].FormaDePago
                const arrayPago = strPago.split(',')
                const arrayPagoTrc = []
                const arrayPagoManz = []
                const arrayPagoQrt = []
                const arrayPagoMty = []
                const arrayPagoNvoLaredo = []
                strConsultaPago = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>CAT_ProvDFormaPago</ClaveTipo></clsParametros>', valToken, false)
                strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', `<clsParametros><Opcion>CPP</Opcion><clsPRY_ProveedorDiesel><Id>${strConsultaProv.Table[0].Id}</Id></clsPRY_ProveedorDiesel></clsParametros>`, valToken, false)
                const pagoProveedor = strConsulta.Table
                for (item in pagoProveedor) {
                    arrayPagoTrc.push(pagoProveedor[item].Id)
                    $('#tagListTrc').dxTagBox({
                        dataSource: strConsultaPago.Table,
                        valueExpr: 'Id',
                        value: arrayPagoTrc,
                        displayExpr: 'Nombre',
                        disabled: true,
                    })
                }
                for (item in pagoProveedor) {
                    arrayPagoNvoLaredo.push(pagoProveedor[item].Id)
                    $('#tagListNvoLaredo').dxTagBox({
                        dataSource: strConsultaPago.Table,
                        valueExpr: 'Id',
                        value: arrayPagoNvoLaredo,
                        displayExpr: 'Nombre',
                        disabled: true,
                    })
                }
                for (item in pagoProveedor) {
                    arrayPagoQrt.push(pagoProveedor[item].Id)
                    $('#tagListQrt').dxTagBox({
                        dataSource: strConsultaPago.Table,
                        valueExpr: 'Id',
                        value: arrayPagoQrt,
                        displayExpr: 'Nombre',
                        disabled: true,
                    })
                }
                for (item in pagoProveedor) {
                    arrayPagoManz.push(pagoProveedor[item].Id)
                    $('#tagListManz').dxTagBox({
                        dataSource: strConsultaPago.Table,
                        valueExpr: 'Id',
                        value: arrayPagoManz,
                        displayExpr: 'Nombre',
                        disabled: true,
                    })
                }
                for (item in pagoProveedor) {
                    arrayPagoMty.push(pagoProveedor[item].Id)
                    $('#tagListMty').dxTagBox({
                        dataSource: strConsultaPago.Table,
                        valueExpr: 'Id',
                        value: arrayPagoMty,
                        displayExpr: 'Nombre',
                        disabled: true,
                    })
                }
                //debugger
                for (pago in arrayPago) {
                    const tipoPago = arrayPago[pago]
                    const convertTipoPago = tipoPago.trim()
                    console.log(convertTipoPago)
                    if (convertTipoPago === 'American Express') {
                        $('#numberBoxAmeTrc').dxNumberBox({
                            readOnly: false
                        })
                        $('#numberBoxAmeMty').dxNumberBox({
                            readOnly: false
                        })
                        $('#numberBoxAmeManz').dxNumberBox({
                            readOnly: false
                        })
                        $('#numberBoxAmeNvoLaredo').dxNumberBox({
                            readOnly: false
                        })
                        $('#numberBoxAmeQrt').dxNumberBox({
                            readOnly: false
                        })
                    } else {
                        if (convertTipoPago === 'Contado') {
                            $('#numberBoxContadoTrc').dxNumberBox({
                                readOnly: false
                            })
                            $('#numberBoxContadoMty').dxNumberBox({
                                readOnly: false
                            })
                            $('#numberBoxContadoManz').dxNumberBox({
                                readOnly: false
                            })
                            $('#numberBoxContadoNvoLaredo').dxNumberBox({
                                readOnly: false
                            })
                            $('#numberBoxContadoQrt').dxNumberBox({
                                readOnly: false
                            })
                        } else {
                            if (convertTipoPago === 'Credito 4 Días') {
                                $('#numberBoxCredito4Trc').dxNumberBox({
                                    readOnly: false
                                })
                                $('#numberBoxCredito4Mty').dxNumberBox({
                                    readOnly: false
                                })
                                $('#numberBoxCredito4Manz').dxNumberBox({
                                    readOnly: false
                                })
                                $('#numberBoxCredito4NvoLaredo').dxNumberBox({
                                    readOnly: false
                                })
                                $('#numberBoxCredito4Qrt').dxNumberBox({
                                    readOnly: false
                                })
                            } else {
                                if (convertTipoPago === 'Credito 7 Días') {
                                    $('#numberBoxCredito7Trc').dxNumberBox({
                                        readOnly: false
                                    })
                                    $('#numberBoxCredito7Mty').dxNumberBox({
                                        readOnly: false
                                    })
                                    $('#numberBoxCredito7Manz').dxNumberBox({
                                        readOnly: false
                                    })
                                    $('#numberBoxCredito7NvoLaredo').dxNumberBox({
                                        readOnly: false
                                    })
                                    $('#numberBoxCredito7Qrt').dxNumberBox({
                                        readOnly: false
                                    })
                                } else {
                                    if (convertTipoPago === 'Prepago') {
                                        $('#numberBoxPrepagoTrc').dxNumberBox({
                                            readOnly: false
                                        })
                                        $('#numberBoxPrepagoMty').dxNumberBox({
                                            readOnly: false
                                        })
                                        $('#numberBoxPrepagoManz').dxNumberBox({
                                            readOnly: false
                                        })
                                        $('#numberBoxPrepagoNvoLaredo').dxNumberBox({
                                            readOnly: false
                                        })
                                        $('#numberBoxPrepagoQrt').dxNumberBox({
                                            readOnly: false
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
                for (agencia in arrayAgencia) {
                    const agenciaActiva = arrayAgencia[agencia]
                    const convertAgenciaActiva = agenciaActiva.trim()
                    if (convertAgenciaActiva === 'Torreón') {
                        $('#cajaTrc').removeClass('d-none')
                        $('#numberBoxLtsTorreon').dxNumberBox({
                            value: infoLicitacion.LtsTrc,
                            max: infoLicitacion.LtsTrc,
                            readOnly: false
                        })
                    } else {
                        if (convertAgenciaActiva === 'Nuevo Laredo') {
                            $('#cajaNvoLaredo').removeClass('d-none')
                            $('#numberBoxLtsNvoLaredo').dxNumberBox({
                                value: infoLicitacion.LtsNvoLaredo,
                                max: infoLicitacion.LtsNvoLaredo,
                                readOnly: false
                            })
                        } else {
                            if (convertAgenciaActiva === 'Queretaro') {
                                $('#cajaQrt').removeClass('d-none')
                                $('#numberBoxLtsQrt').dxNumberBox({
                                    value: infoLicitacion.LtsQrt,
                                    max: infoLicitacion.LtsQrt,
                                    readOnly: false
                                })

                            } else {
                                if (convertAgenciaActiva === 'Manzanillo') {
                                    $('#cajaManz').removeClass('d-none')
                                    $('#numberBoxLtsManz').dxNumberBox({
                                        value: infoLicitacion.LtsManz,
                                        max: infoLicitacion.LtsManz,
                                        readOnly: false
                                    })
                                } else {
                                    if (convertAgenciaActiva === 'Monterrey') {
                                        $('#cajaMty').removeClass('d-none')
                                        $('#numberBoxLtsMty').dxNumberBox({
                                            value: infoLicitacion.LtsMty,
                                            max: infoLicitacion.LtsMty,
                                            readOnly: false
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
                //? VALIDARE QUE LOS LITROS SEAN DIFERNETE DE 0
                ltsTorreon = $('#numberBoxLtsTorreon').children('input[type="hidden"]').val()
                ltsNvoLaredo = $('#numberBoxLtsNvoLaredo').children('input[type="hidden"]').val()
                ltsQrt = $('#numberBoxLtsQrt').children('input[type="hidden"]').val()
                ltsManz = $('#numberBoxLtsManz').children('input[type="hidden"]').val()
                ltsMty = $('#numberBoxLtsMty').children('input[type="hidden"]').val()
                console.log(ltsTorreon)
                if (ltsTorreon != '0' || ltsNvoLaredo != '0' || ltsQrt != '0' || ltsManz != '0' || ltsMty != '0') {
                    $('#btnCalcularTotal').dxButton({
                        disabled: false
                    })
                }
            }
        }
    })


    //? ACCIONES 
    $('#btnCalcularTotal').dxButton({
        icon: 'fas fa-calculator',
        onClick() {
            ltsTorreon = $('#numberBoxLtsTorreon').children('input[type="hidden"]').val()
            ltsNvoLaredo = $('#numberBoxLtsNvoLaredo').children('input[type="hidden"]').val()
            ltsQrt = $('#numberBoxLtsQrt').children('input[type="hidden"]').val()
            ltsManz = $('#numberBoxLtsManz').children('input[type="hidden"]').val()
            ltsMty = $('#numberBoxLtsMty').children('input[type="hidden"]').val()
            // console.log(ltsTorreon, ltsNvoLaredo, ltsQrt, ltsManz, ltsMty)
            const totaLts = parseFloat(ltsTorreon) + parseFloat(ltsNvoLaredo) + parseFloat(ltsQrt) + parseFloat(ltsManz) + parseFloat(ltsMty)
            console.log(totaLts)
            $('#numberBoxTotalLitros').dxNumberBox({
                format: '#,##0.## lts',
                value: totaLts
            })
            $('#btnEnviarPuja').dxButton({
                disabled: false
            })
        }
    })
    $('#btnLimpiar').dxButton({
        icon: 'fas fa-brush',
        onClick() {
            $('#numberBoxLtsTorreon').dxNumberBox({
                value: 0
            })
            $('#numberBoxLtsNvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxLtsQrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxLtsManz').dxNumberBox({
                value: 0
            })
            $('#numberBoxLtsMty').dxNumberBox({
                value: 0
            })
            $('#numberBoxTotalLitros').dxNumberBox({
                value: 0
            })
            $('#btnEnviarPuja').dxButton({
                disabled: true
            })
            $('#numberBoxLtsTorreon').dxNumberBox({
                value: 0
            })
            $('#numberBoxContadoTrc').dxNumberBox({
                value: 0
            })
            $('#numberBoxAmeTrc').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito4Trc').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito7Trc').dxNumberBox({
                value: 0
            })
            $('#numberBoxPrepagoTrc').dxNumberBox({
                value: 0
            })
            $('#numberBoxIVATrc').dxNumberBox({
                value: 0
            })

            //? NUEVO LAREDO
            $('#numberBoxLtsNvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxContadoNvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxAmeNvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito4NvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito7NvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxPrepagoNvoLaredo').dxNumberBox({
                value: 0
            })
            $('#numberBoxIVANvoLaredo').dxNumberBox({
                value: 0
            })

            //? QUERETARO
            $('#numberBoxLtsQrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxContadoQrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxAmeQrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito4Qrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito7Qrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxPrepagoQrt').dxNumberBox({
                value: 0
            })
            $('#numberBoxIVAQrt').dxNumberBox({
                value: 0
            })

            //? MANZANILLO
            $('#numberBoxLtsManz').dxNumberBox({
                value: 0
            })
            $('#numberBoxContadoManz').dxNumberBox({
                value: 0
            })
            $('#numberBoxAmeManz').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito4Manz').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito7Manz').dxNumberBox({
                value: 0
            })
            $('#numberBoxPrepagoManz').dxNumberBox({
                value: 0
            })
            $('#numberBoxIVAManz').dxNumberBox({
                value: 0
            })

            //? MONTERREY
            $('#numberBoxLtsMty').dxNumberBox({
                value: 0
            })
            $('#numberBoxContadoMty').dxNumberBox({
                value: 0
            })
            $('#numberBoxAmeMty').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito4Mty').dxNumberBox({
                value: 0
            })
            $('#numberBoxCredito7Mty').dxNumberBox({
                value: 0
            })
            $('#numberBoxPrepagoMty').dxNumberBox({
                value: 0
            })
            $('#numberBoxIVAMty').dxNumberBox({
                value: 0
            })
        }
    })
    $('#btnEnviarPuja').dxButton({
        icon: 'fas fa-paper-plane',
        onClick() {
            const idProv = $('#idProveedor').val()
            console.log(idProv)
            const idLic = $('#idLicitacion').val()
            //? TORREON
            ltsTorreon = $('#numberBoxLtsTorreon').children('input[type="hidden"]').val()
            const precioContadoTrc = $('#numberBoxContadoTrc').children('input[type="hidden"]').val()
            const precioAmeTrc = $('#numberBoxAmeTrc').children('input[type="hidden"]').val()
            const precioCredito4Trc = $('#numberBoxCredito4Trc').children('input[type="hidden"]').val()
            const precioCredito7Trc = $('#numberBoxCredito7Trc').children('input[type="hidden"]').val()
            const precioPrepagoTrc = $('#numberBoxPrepagoTrc').children('input[type="hidden"]').val()
            const precioIVATrc = $('#numberBoxIVATrc').children('input[type="hidden"]').val()

            //? NVO LAREDO
            ltsNvoLaredo = $('#numberBoxLtsNvoLaredo').children('input[type="hidden"]').val()
            const precioContadoNvoLaredo = $('#numberBoxContadoNvoLaredo').children('input[type="hidden"]').val()
            const precioAmeNvoLaredo = $('#numberBoxAmeNvoLaredo').children('input[type="hidden"]').val()
            const precioCredito4NvoLaredo = $('#numberBoxCredito4NvoLaredo').children('input[type="hidden"]').val()
            const precioCredito7NvoLaredo = $('#numberBoxCredito7NvoLaredo').children('input[type="hidden"]').val()
            const precioPrepagoNvoLaredo = $('#numberBoxPrepagoNvoLaredo').children('input[type="hidden"]').val()
            const precioIVANvoLaredo = $('#numberBoxIVANvoLaredo').children('input[type="hidden"]').val()

            //? QUERETARO
            ltsQrt = $('#numberBoxLtsQrt').children('input[type="hidden"]').val()
            const precioContadoQrt = $('#numberBoxContadoQrt').children('input[type="hidden"]').val()
            const precioAmeQrt = $('#numberBoxAmeQrt').children('input[type="hidden"]').val()
            const precioCredito4Qrt = $('#numberBoxCredito4Qrt').children('input[type="hidden"]').val()
            const precioCredito7Qrt = $('#numberBoxCredito7Qrt').children('input[type="hidden"]').val()
            const precioPrepagoQrt = $('#numberBoxPrepagoQrt').children('input[type="hidden"]').val()
            const precioIVAQrt = $('#numberBoxIVAQrt').children('input[type="hidden"]').val()

            //? MANZANILLO
            ltsManz = $('#numberBoxLtsManz').children('input[type="hidden"]').val()
            const precioContadoManz = $('#numberBoxContadoManz').children('input[type="hidden"]').val()
            const precioAmeManz = $('#numberBoxAmeManz').children('input[type="hidden"]').val()
            const precioCredito4Manz = $('#numberBoxCredito4Manz').children('input[type="hidden"]').val()
            const precioCredito7Manz = $('#numberBoxCredito7Manz').children('input[type="hidden"]').val()
            const precioPrepagoManz = $('#numberBoxPrepagoManz').children('input[type="hidden"]').val()
            const precioIVAManz = $('#numberBoxIVAManz').children('input[type="hidden"]').val()

            //? MONTERREY
            ltsMty = $('#numberBoxLtsMty').children('input[type="hidden"]').val()
            const precioContadoMty = $('#numberBoxContadoMty').children('input[type="hidden"]').val()
            const precioAmeMty = $('#numberBoxAmeMty').children('input[type="hidden"]').val()
            const precioCredito4Mty = $('#numberBoxCredito4Mty').children('input[type="hidden"]').val()
            const precioCredito7Mty = $('#numberBoxCredito7Mty').children('input[type="hidden"]').val()
            const precioPrepagoMty = $('#numberBoxPrepagoMty').children('input[type="hidden"]').val()
            const precioIVAMty = $('#numberBoxIVAMty').children('input[type="hidden"]').val()

            const litrosTotales = $('#numberBoxTotalLitros').children('input[type="hidden"]').val()

            if (litrosTotales === '0' || litrosTotales === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Los litros totales tienen que se mayor a cero!',
                    timer: 2000,
                    showConfirmButton: false,
                })
            } else {
                //? ENVIAR PUJA
                for (IdAgencia in arrayAgenciaId) {
                    const strIdAgencia = arrayAgenciaId[IdAgencia]
                    const convertAgencia = strIdAgencia.trim()
                    console.log(convertAgencia)
                    idTrc = $('#idAgenciaTrc').val()
                    idMty = $('#idAgenciaMty').val()
                    idQrt = $('#idAgenciaQrt').val()
                    idManz = $('#idAgenciaManz').val()
                    idNvoLaredo = $('#idAgenciaNvoLaredo').val()
                    //? TORREON
                    if (convertAgencia === '68928') {
                        idTrc = '68928'
                        if (idTrc !== '0') {
                            xmlTrc = `<AgenciaDetalle>
                                        <Id_CATAgencia>${idTrc}</Id_CATAgencia>
                                        <PRE_Contado>${precioContadoTrc}</PRE_Contado>
                                        <PRE_Prepago>${precioPrepagoTrc}</PRE_Prepago>
                                        <PRE_Cred4>${precioCredito4Trc}</PRE_Cred4>
                                        <PRE_Cred7>${precioCredito7Trc}</PRE_Cred7>
                                        <PRE_Amex>${precioAmeTrc}</PRE_Amex>
                                        <IVA>${precioIVATrc}</IVA>
                                        <LTS_Totales>${litrosTotales}</LTS_Totales>
                                    </AgenciaDetalle>`
                            $('#xmlTrc').text(xmlTrc)
                        } else {
                            $('#xmlTrc').text('')
                        }
                    } else {
                        //? MONTERREY
                        if (convertAgencia === '68929') {
                            idMty = '68929'
                            console.log(idMty)
                            if (idMty !== '0') {
                                xmlMty = `<AgenciaDetalle>
                                            <Id_CATAgencia>${idMty}</Id_CATAgencia>
                                            <PRE_Contado>${precioContadoMty}</PRE_Contado>
                                            <PRE_Prepago>${precioPrepagoMty}</PRE_Prepago>
                                            <PRE_Cred4>${precioCredito4Mty}</PRE_Cred4>
                                            <PRE_Cred7>${precioCredito7Mty}</PRE_Cred7>
                                            <PRE_Amex>${precioAmeMty}</PRE_Amex>
                                            <IVA>${precioIVAMty}</IVA>
                                            <LTS_Totales>${litrosTotales}</LTS_Totales>
                                        </AgenciaDetalle>`
                                $('#xmlMty').text(xmlMty)
                            } else {
                                $('#xmlMty').text('')
                            }
                        } else {
                            //? MANZANILLO
                            if (convertAgencia === '68932') {
                                idManz = '68932'
                                if (idManz !== '0') {
                                    xmlManz = `<AgenciaDetalle>
                                                <Id_CATAgencia>${idManz}</Id_CATAgencia>
                                                <PRE_Contado>${precioContadoManz}</PRE_Contado>
                                                <PRE_Prepago>${precioPrepagoManz}</PRE_Prepago>
                                                <PRE_Cred4>${precioCredito4Manz}</PRE_Cred4>
                                                <PRE_Cred7>${precioCredito7Manz}</PRE_Cred7>
                                                <PRE_Amex>${precioAmeManz}</PRE_Amex>
                                                <IVA>${precioIVAManz}</IVA>
                                                <LTS_Totales>${litrosTotales}</LTS_Totales>
                                            </AgenciaDetalle>`
                                    $('#xmlManz').text(xmlManz)
                                } else {
                                    $('#xmlManz').text('')
                                }
                            } else {
                                //? NUEVO LAREDO
                                if (convertAgencia === '68930') {
                                    idNvoLaredo = '68930'
                                    if (idNvoLaredo !== '0') {
                                        xmlNvoLaredo = `<AgenciaDetalle>
                                                            <Id_CATAgencia>${idNvoLaredo}</Id_CATAgencia>

                                                            <PRE_Contado>${precioContadoNvoLaredo}</PRE_Contado>
                                                            <PRE_Prepago>${precioPrepagoNvoLaredo}</PRE_Prepago>
                                                            <PRE_Cred4>${precioCredito4NvoLaredo}</PRE_Cred4>
                                                            <PRE_Cred7>${precioCredito7NvoLaredo}</PRE_Cred7>
                                                            <PRE_AmeX>${precioAmeNvoLaredo}</PRE_AmeX>
                                                            <IVA>${precioIVANvoLaredo}</IVA>
                                                            <LTS_Totales>${litrosTotales}</LTS_Totales>
                                                        </AgenciaDetalle>`
                                        $('#xmlNvoLaredo').text(xmlNvoLaredo)
                                    } else {
                                        $('#xmlNvoLaredo').text('')
                                    }
                                } else {
                                    //? QUERETARO
                                    if (convertAgencia === '68931') {
                                        idQrt = '68931'
                                        if (idQrt !== '0') {
                                            xmlQrt = `<AgenciaDetalle>
                                                        <Id_CATAgencia>${idQrt}</Id_CATAgencia>
                                                        <PRE_ContadoT>${precioContadoQrt}</PRE_ContadoT>
                                                        <PRE_Prepago>${precioPrepagoQrt}</PRE_Prepago>
                                                        <PRE_Cred4>${precioCredito4Qrt}</PRE_Cred4>
                                                        <PRE_Cred7>${precioCredito7Qrt}</PRE_Cred7>
                                                        <PRE_Amex>${precioAmeQrt}</PRE_Amex>
                                                        <IVA>${precioIVAQrt}</IVA>
                                                        <LTS_Totales>${litrosTotales}</LTS_Totales>
                                                    </AgenciaDetalle>`
                                            $('#xmlQrt').text(xmlQrt)
                                        } else {
                                            $('#xmlQrt').text('')
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                const xmlTextTrc = $('#xmlTrc').text()
                const xmlTextMty = $('#xmlMty').text()
                const xmlTextQrt = $('#xmlQrt').text()
                const xmlTextManz = $('#xmlManz').text()
                const xmlTextNvoLaredo = $('#xmlNvoLaredo').text()
                const strPuja = `<clsParametros>
                                    <Opcion>GPP</Opcion>
                                    <Usuario>${userActive}</Usuario>
                                    <IdProv>${idProv}</IdProv>
                                    <IdLic>${idLic}</IdLic>
                                    <clsPRY_ProveedorDiesel>
                                        <Puja>
                                            ${xmlTextTrc}
                                            ${xmlTextMty}
                                            ${xmlTextQrt}
                                            ${xmlTextManz}
                                            ${xmlTextNvoLaredo}
                                        </Puja>
                                    </clsPRY_ProveedorDiesel>
                                </clsParametros>`
                console.log(strPuja)
                const pujaProv = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', strPuja, valToken, true)
                console.log(pujaProv)
                if (pujaProv !== null) {
                    strData = `<clsParametros>
                                    <Opcion>G</Opcion>
                                    <Usuario>${userActive}</Usuario>
                                    <clsPRY_LicitacionDieselDetalle>
                                        <Id>0</Id>
                                        <IdProv>${idProv}</IdProv>
                                        <IdLic>${idLic}</IdLic>
                                        <LTS_Trc>${ltsTorreon}</LTS_Trc>
                                        <PREContadoTrc>${precioContadoTrc}</PREContadoTrc>
                                        <PREPrepagoTrc>${precioPrepagoTrc}</PREPrepagoTrc>
                                        <PRECredito4Trc>${precioCredito4Trc}</PRECredito4Trc>
                                        <PRECredito7Trc>${precioCredito7Trc}</PRECredito7Trc>
                                        <PREAmeTrc>${precioAmeTrc}</PREAmeTrc>
                                        <IVA_Trc>${precioIVATrc}</IVA_Trc>
                                        <LTS_Mty>${ltsMty}</LTS_Mty>
                                        <PREContadoMty>${precioContadoMty}</PREContadoMty>
                                        <PREPrepagoMty>${precioPrepagoMty}</PREPrepagoMty>
                                        <PRECredito4Mty>${precioCredito4Mty}</PRECredito4Mty>
                                        <PRECredito7Mty>${precioCredito7Mty}</PRECredito7Mty>
                                        <PREAmeMty>${precioAmeMty}</PREAmeMty>
                                        <IVA_Mty>${precioIVAMty}</IVA_Mty>
                                        <LTS_Qrt>${ltsQrt}</LTS_Qrt>
                                        <PREContadoQrt>${precioContadoQrt}</PREContadoQrt>
                                        <PREPrepagoQrt>${precioPrepagoQrt}</PREPrepagoQrt>
                                        <PRECredito4Qrt>${precioCredito4Qrt}</PRECredito4Qrt>
                                        <PRECredito7Qrt>${precioCredito7Qrt}</PRECredito7Qrt>
                                        <PREAmeQrt>${precioAmeQrt}</PREAmeQrt>
                                        <IVA_Qrt>${precioIVAQrt}</IVA_Qrt>
                                        <LTS_NvoLaredo>${ltsNvoLaredo}</LTS_NvoLaredo>
                                        <PREContadoNvoLaredo>${precioContadoNvoLaredo}</PREContadoNvoLaredo>
                                        <PREPrepagoNvoLaredo>${precioPrepagoNvoLaredo}</PREPrepagoNvoLaredo>
                                        <PRECredito4NvoLaredo>${precioCredito4NvoLaredo}</PRECredito4NvoLaredo>
                                        <PRECredito7NvoLaredo>${precioCredito7NvoLaredo}</PRECredito7NvoLaredo>
                                        <PREAmeNvoLaredo>${precioAmeNvoLaredo}</PREAmeNvoLaredo>
                                        <IVA_NvoLaredo>${precioIVANvoLaredo}</IVA_NvoLaredo>
                                        <LTS_Manz>${ltsManz}</LTS_Manz>
                                        <PREContadoManz>${precioContadoManz}</PREContadoManz>
                                        <PREPrepagoManz>${precioPrepagoManz}</PREPrepagoManz>
                                        <PRECredito4Manz>${precioCredito4Manz}</PRECredito4Manz>
                                        <PRECredito7Manz>${precioCredito7Manz}</PRECredito7Manz>
                                        <PREAmeManz>${precioAmeManz}</PREAmeManz>
                                        <IVA_Manz>${precioIVAManz}</IVA_Manz>
                                    </clsPRY_LicitacionDieselDetalle>
                                </clsParametros>`
                    const strConsultaLicitacion = loadfuncionAjax(`${url}Proyectos`, 'PRYLicitacionDieselDetalle', strData, valToken, true)
                    console.log(strConsultaLicitacion)
                    if (strConsultaLicitacion !== null) {
                        //? ACTUALIZAR EL ESTATUS DEL PROVEEDOR 
                        const strActualizaEstatusProv = `<clsParametros>
                                                            <Opcion>AEP</Opcion>
                                                            <clsPRY_ProveedorDiesel>
                                                                <Id>${idProv}</Id>
                                                                <Estatus>Pujando</Estatus>
                                                            </clsPRY_ProveedorDiesel>
                                                        </clsParametros>`
                        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYProveedoresDiesel', strActualizaEstatusProv, valToken, true)
                        //? ACTUALIZA EL VALOR DE LA OFERTA PROVEEDOR
                        const strActualizaOfertaLic = `<clsParametros>
                                                        <Opcion>APO</Opcion>
                                                        <clsPRY_LicitacionDieselDetalle>
                                                            <Id>${idLic}</Id>
                                                        </clsPRY_LicitacionDieselDetalle>
                                                    </clsParametros>`
                        strConsulta = loadfuncionAjax(`${url}Proyectos`, 'PRYLicitacionDieselDetalle', strActualizaOfertaLic, valToken, true)
                    }
                }
            }
        }
    })
})