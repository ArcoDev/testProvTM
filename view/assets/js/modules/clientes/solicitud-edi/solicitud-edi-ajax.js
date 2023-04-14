window.addEventListener('DOMContentLoaded', () => {
	//Propiedades
  // const url = 'http://transmonteslerdo.fortidyndns.com:8045/';
  let url = 'https://201.151.59.194:449/'

  const valToken = $('#valToken').val();
  const userActive = $('#userActive').text();
  const perId = $('#perId').val()
  let strConsulta;
  let strRespuesta;
  let strData;
  let strParametros;
  let workbook;
  let worksheet;
  let intIdentify;
  let responseId = 0;
  let form = document.getElementById('formAddDocument');
  let arraySolicitudes = [];
  let arrayEspecificaciones = [];
  let arrayContactos = [];
  let arrayDocumentos = [];
  let array214 = [];
  let array210 = [];
  let tiposEDI
  let transmision
  let tipos214
  let tipos210
  let indices
  let horasEventos
  let segmentos

  if (perId == 1) {
    $('#btnSolicitar').addClass('d-none')
    $('#btnComplementar').addClass('d-none')
    $('#btnGuardar').addClass('d-none')
    $('#btnAgregarDocto').addClass('d-none')
  } else {
    $('#btnProcesar').addClass('d-none')
    $('#btnPruebas').addClass('d-none')
    $('#btnFinalizar').addClass('d-none')
  }

  //Obtener catalogos
  tiposEDI = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>TipoEDI</ClaveTipo></clsParametros>', valToken, false);
  tipos214 = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>Tipo214</ClaveTipo></clsParametros>', valToken, false);
  // tipos210 = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>Tipo210</ClaveTipo></clsParametros>', valToken, false);
  indices = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>IndicesEDI</ClaveTipo></clsParametros>', valToken, false);
  horasEventos = loadfuncionAjax(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>HoraEventoEDI</ClaveTipo></clsParametros>', valToken, false);
  segmentos = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>CCT</Opcion></clsParametros>`, valToken, false);

  //Declaración de columnas para dataGrids
  let arrayColumnas = [
    {dataField: 'Folio', caption: 'Folio', dataType: 'number'},
    {dataField: 'NomEstatus', caption: 'Estatus', dataType: 'string'},
    {dataField: 'MinutosCaduca', caption: 'Minutos Caduca', dataType: 'number'},
    {dataField: 'InterChangeId', caption: 'InterChangeId', dataType: 'string'},
    {dataField: 'InterCualifier', caption: 'InterCualifier', dataType: 'string'},
    {dataField: 'UsuarioCrea', caption: 'Usuario Crea', dataType: 'string'},
    {dataField: 'FechaCrea', caption: 'Fecha Crea', dataType: 'date', format: 'dd/MMM/yyyy'},
  ]

  let arrayColumnasEspecificaciones = [
    {dataField: 'TipoEDI_Id', caption: 'Tipo EDI', dataType: 'number',
      validationRules: [{ type: 'required' }],
      setCellValue(rowData, value) {
        rowData.TipoEDI_Id = value;
        rowData.Segmento_Id = null;
        if (value == 69184) {
          rowData.TipoEdiText = '204'
        } else if (value == 69180) {
          rowData.TipoEdiText = '210'
        } else if (value == 69182) {
          rowData.TipoEdiText = '214'
        } else if (value == 69181) {
          rowData.TipoEdiText = '990'
        } else if (value == 69183) {
          rowData.TipoEdiText = '997'
        }
      },
      lookup: {
        dataSource: tiposEDI.Table,
        valueExpr: 'Id',
        displayExpr: 'Nombre',
      },
    },
    {dataField: 'Segmento_Id', caption: 'Segmento', dataType: 'number',
      validationRules: [{ type: 'required' }],
      lookup: {
        dataSource(options) {
          return {
            store: segmentos.Table,
            filter: options.data ? ['Tipo', '=', options.data.TipoEdiText] : null,
          };
        },
        valueExpr: 'Id',
        displayExpr: 'Nombre',
      },
    },
    {dataField: 'Indice', caption: 'Indice', dataType: 'number', 
      validationRules: [{ type: 'required' }],
      lookup: {
        dataSource: indices.Table,
        valueExpr: 'Id',
        displayExpr: 'Nombre',
      },
    },
    {dataField: 'Especificacion', caption: 'Especificación', dataType: 'string', validationRules: [{ type: 'required' }]},
    {dataField: 'TipoEdiText', caption: 'Tipo EDI', dataType: 'string', visible: false, formItem: { visible: false }},
  ]

  let arrayColumnasContactos = [
    {dataField: 'Nombres', caption: 'Nombres', dataType: 'string', 
      validationRules: [
        { type: 'required' },
        { type: "pattern", pattern: "^[a-z A-Z]+$", message: "El nombre es inválido" }
      ],
    },
    {dataField: 'Telefono', caption: 'Telefono', dataType: 'string', 
      validationRules: [
        { type: 'required' },
        { type: "pattern", pattern: "^[0-9]+$", message: "El teléfono es inválido" },
        { type: 'stringLength', min: 10, message: 'El teléfono debe contenter al menos 10 dígitos' },
      ],
    },
    {dataField: 'Correo', caption: 'Correo', dataType: 'string', 
      validationRules: [
        { type: 'required' },
        { type: 'email', message: 'El correo electrónico es inválido' }
      ],
    },
    {dataField: 'Puesto', caption: 'Puesto', dataType: 'string',
      calculateCellValue: function(rowData) {
        if (rowData.Puesto == "null") {
          return ''
        } else {
          return rowData.Puesto
        }
      }
    },
    {dataField: 'HorarioAtencion', caption: 'Horario Atención', dataType: 'string',
      calculateCellValue: function(rowData) {
        if (rowData.HorarioAtencion == "null") {
          return ''
        } else {
          return rowData.HorarioAtencion
        }
      }
    },
  ]

  let arrayColumnasDocumentos = [
    {dataField: 'TipoEjemplo', caption: 'Tipo', dataType: 'string'},
    {dataField: 'Nombre', caption: 'Nombre', dataType: 'string'},
    {dataField: 'Extension', caption: 'Extension', dataType: 'string'},
  ]

  let arrayColumnasTipos214 = [
    {dataField: 'Clave', caption: 'Clave', dataType: 'number', 
      validationRules: [{ type: 'required' }],
      lookup: {
        dataSource: tipos214.Table,
        valueExpr: 'Id',
        displayExpr: 'Nombre',
      },
    },
    {dataField: 'HoraEvento', caption: 'Hora Evento', dataType: 'string',
      validationRules: [
        { type: 'stringLength', min: 4, message: 'El formato es inválido' }
      ],
      editorOptions: {
          mask: "HH:Mm",
          maskRules: {
              H: char => char >= 0 && char <= 9,
              h: (char, index, fullStr) => {
                  if (fullStr[0] == '2')
                      return [0,1,2,3].includes(parseInt(char));
                  else
                      return [0,1,2,3,4,5,6,7,8,9].includes(parseInt(char));
              },
              M: char => char >= 0 && char <= 5,
              m: char => char >= 0 && char <= 9
          },
          maskInvalidMessage: 'El formato es inválido',
        },
    },
  ]

  //Carga de componentes
  loadSelect(`${url}CORE`, 'CORECatalogos', '<clsParametros><Opcion>CTC</Opcion><ClaveTipo>TipoEDI</ClaveTipo></clsParametros>', '#lookUP_TipoDocumento', true, 'lookUP_TipoDocumento', false, valToken, false);
  loadNumberBox('#numberBoxTiempoOferta', '', false, '', '', false);
  loadNumberBox('#numberBoxPuertoProductivo', '', false, '', '', false);
  loadNumberBox('#numberBoxPuertoTest', '', false, '', '', false);
  loadNumberBox('#numberBoxIntervaloX6', '', false, '', '', true);
  loadNumberBox('#numberBoxIntervaloETA', '', false, '', '', true);
  loadTextBox('#textBoxURLProductivo', true, '', false, false);
  loadTextBox('#textBoxFromProductivo', true, '', false, false);
  loadTextBox('#textBoxToProductivo', true, '', false, false);
  loadTextBox('#textBoxUsuarioProductivo', true, '', false, false);
  loadTextBox('#textBoxContrasenaProductivo', true, '', false, false);
  loadTextBox('#textBoxURLTest', true, '', false, false);
  loadTextBox('#textBoxFromTest', true, '', false, false);
  loadTextBox('#textBoxToTest', true, '', false, false);
  loadTextBox('#textBoxUsuarioTest', true, '', false, false);
  loadTextBox('#textBoxContrasenaTest', true, '', false, false);
  loadTextBox('#textBoxInterChangeId', true, '', false, false);
  loadTextBox('#textBoxInterCualifier', true, '', false, false);
  loadTextBox('#textBoxInterChangeIdTest', true, '', false, false);
  loadTextBox('#textBoxInterCualifierTest', true, '', false, false);
  loadSwitch('#switch-FTP', false, false, false);
  loadSwitch('#switch-SFTP', false, false, false);
  loadSwitch('#switch-TestFTP', false, false, false);
  loadSwitch('#switch-TestSFTP', false, false, false);
  loadSwitch('#switch-210', false, false, false);
  loadSwitch('#switch-990', false, false, false);
  loadSwitch('#switch-214', false, false, false);
  loadSwitch('#switch-997', false, false, false);
  loadSwitch('#switch-204', false, false, false);

  $('#switch-FTP').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#switch-FTP').dxSwitch({readOnly: true})
        $('#switch-SFTP').dxSwitch({value: false})
        $('#numberBoxPuertoProductivo').dxNumberBox({value: 21})
      } else {
        $('#switch-FTP').dxSwitch({readOnly: false})
        $('#numberBoxPuertoProductivo').dxNumberBox({value: 0})
      }
    }
  })

  $('#switch-SFTP').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#switch-SFTP').dxSwitch({readOnly: true})
        $('#switch-FTP').dxSwitch({value: false})
        $('#numberBoxPuertoProductivo').dxNumberBox({value: 22})
      } else {
        $('#switch-SFTP').dxSwitch({readOnly: false})
        $('#numberBoxPuertoProductivo').dxNumberBox({value: 0})
      }
    }
  })

  $('#switch-TestFTP').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#switch-TestFTP').dxSwitch({readOnly: true})
        $('#switch-TestSFTP').dxSwitch({value: false})
        $('#numberBoxPuertoTest').dxNumberBox({value: 21})
      } else {
        $('#switch-TestFTP').dxSwitch({readOnly: false})
        $('#numberBoxPuertoTest').dxNumberBox({value: 0})
      }
    }
  })

  $('#switch-TestSFTP').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#switch-TestSFTP').dxSwitch({readOnly: true})
        $('#switch-TestFTP').dxSwitch({value: false})
        $('#numberBoxPuertoTest').dxNumberBox({value: 22})
      } else {
        $('#switch-TestSFTP').dxSwitch({readOnly: false})
        $('#numberBoxPuertoTest').dxNumberBox({value: 0})
      }
    }
  })

  $('#switch-210').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#mandatory210').removeClass('d-none')
        $('#list210').css('pointer-events', '');
        $('#list210').css('opacity', '');
      } else {
        $('#mandatory210').addClass('d-none')
        $('#list210').css('pointer-events', 'none');
        $('#list210').css('opacity', '0.6');
      }
    }
  })

  $('#switch-214').dxSwitch({
    onValueChanged(e) {
      if (e.value) {
        $('#mandatory214').removeClass('d-none')
        $('#grid214').dxDataGrid({
          editing: {
            refreshMode: 'reshape',
            mode: 'form',
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            useIcons: true
          },
        })
      } else {
        $('#mandatory214').addClass('d-none')
        $('#grid214').dxDataGrid({
          editing: {
            refreshMode: 'reshape',
            mode: 'form',
            allowUpdating: false,
            allowDeleting: false,
            allowAdding: false,
            useIcons: false
          },
        })
      }
    }
  })

  $('#dropUpdateGrid').addClass('d-none')

  //Eventos
  $('#reset').click(function () {
    tipos210 = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>CTE</Opcion></clsParametros>`, valToken, false)
    $('#list210').css('pointer-events', 'none');
    $('#list210').css('opacity', '0.6');
    $('#items210').text('')
    $('#add').modal('show')
    $('#addLabel').text('Nuevo: Solicitud Integración EDI')
    $('#rowID').text('')
    $('#arrayEspecificaciones').text('')
    $('#arrayContactos').text('')
    $('#array214').text('')
    arraySolicitudes = []
    arrayEspecificaciones = []
    arrayContactos = []
    arrayDocumentos = []
    array214 = []
    $('#extras').prop('disabled', true)
    $('#btnAgregarDocto').prop('disabled', true)
    $('#btnDescargarDocto').prop('disabled', true)
    let divDownload = document.getElementById('btnDescargarDocto')
    divDownload.innerHTML = `<a><i class="fas fa-download text-white text-decoration-none"></i></a>`
    $('#estatusSolicitud').text('ESTATUS: BORRADOR')
    $('#switch-FTP').dxSwitch({value: false})
    $('#switch-SFTP').dxSwitch({value: false})
    $('#textBoxURLProductivo').dxTextBox({value: ''})
    $('#textBoxFromProductivo').dxTextBox({value: ''})
    $('#textBoxUsuarioProductivo').dxTextBox({value: ''})
    $('#numberBoxPuertoProductivo').dxNumberBox({value: 0})
    $('#textBoxToProductivo').dxTextBox({value: ''})
    $('#textBoxContrasenaProductivo').dxTextBox({value: ''})
    $('#switch-TestFTP').dxSwitch({value: false})
    $('#switch-TestSFTP').dxSwitch({value: false})
    $('#textBoxURLTest').dxTextBox({value: ''})
    $('#textBoxFromTest').dxTextBox({value: ''})
    $('#textBoxUsuarioTest').dxTextBox({value: ''})
    $('#numberBoxPuertoTest').dxNumberBox({value: 0})
    $('#textBoxToTest').dxTextBox({value: ''})
    $('#textBoxContrasenaTest').dxTextBox({value: ''})
    $('#switch-204').dxSwitch({value: false})
    $('#switch-210').dxSwitch({value: false})
    $('#switch-214').dxSwitch({value: false})
    $('#switch-990').dxSwitch({value: false})
    $('#switch-997').dxSwitch({value: false})
    $('#numberBoxTiempoOferta').dxNumberBox({value: 0})
    $('#numberBoxIntervaloETA').dxNumberBox({value: 0})
    $('#numberBoxIntervaloX6').dxNumberBox({value: 0})
    $('#textBoxInterChangeId').dxTextBox({value: ''})
    $('#textBoxInterCualifier').dxTextBox({value: ''})
    $('#textBoxInterChangeIdTest').dxTextBox({value: ''})
    $('#textBoxInterCualifierTest').dxTextBox({value: ''})
    generarGridEspecificaciones(arrayEspecificaciones)
    generarGridContactos(arrayContactos)
    generarGrid214(array214)
    loadListSelection('#list210', 'tipos210', '#items210', tipos210.Table, 'check', 421)
    $('#list210').dxList({selectedItemKeys: []})
    loadDataGrid('#gridDocumentos', 500, 20, 'Documentos', arrayColumnasDocumentos, arrayDocumentos, false);
  });

  $('#btnGuardar').click(function () {
    guardar()
  });

  $('#btnSolicitar').click(function () {
    Swal.fire({
      title: '¿Deseas cambiar el estatus a Solicitado?',
      text: 'No podrás realizar más cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        let urlProd = $('#textBoxURLProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let puertoProd = $('#numberBoxPuertoProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let fromProd = $('#textBoxFromProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let toProd = $('#textBoxToProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let usuarioProd = $('#textBoxUsuarioProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let contrasenaProd = $('#textBoxContrasenaProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let urlTest = $('#textBoxURLTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let puertoTest = $('#numberBoxPuertoTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let fromTest = $('#textBoxFromTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let toTest = $('#textBoxToTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let usuarioTest = $('#textBoxUsuarioTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let contrasenaTest = $('#textBoxContrasenaTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let tiempoOferta = $('#numberBoxTiempoOferta').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        // let intervaloETA = $('#lookUP_IntervaloETA').children('input[type=hidden]').val();
        let interChangeId = $('#textBoxInterChangeId').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let interCualifier = $('#textBoxInterCualifier').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let interChangeIdTest = $('#textBoxInterChangeIdTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let interCualifierTest = $('#textBoxInterCualifierTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
        let t210 = $('#switch-210').children('input[type=hidden]').val()
        let t214 = $('#switch-214').children('input[type=hidden]').val()

        if (urlProd == '' || puertoProd == 0 || fromProd == '' || toProd == '' || usuarioProd == '' || contrasenaProd == '' || urlTest == '' || puertoTest == 0 || fromTest == '' || toTest == '' || usuarioTest == '' || contrasenaTest == '' || tiempoOferta == 0 || tiempoOferta == '' || interChangeId == '' || interCualifier == '' || interChangeIdTest == '' || interCualifierTest == '' || arrayContactos.length == 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Debes ingresar los campos obligatorios para cambiar el estatus a Solicitado',
            showConfirmButton: true,
            timer: 4000
          })
        } else {
          let bandera210 = true, bandera214 = true

          if (t210 == 'true') {
            if ($('#items210').text() != '') {
              bandera210 = true
            } else {
              bandera210 = false
            }
          }

          if (t214 == 'true') {
            if (array214.length >= 1) {
              bandera214 = true
            } else {
              bandera214 = false
            }
          }

          if (bandera210 == true && bandera214 == true) {
            if (tiempoOferta <= 0) {
              Swal.fire({
                icon: 'warning',
                title: 'El tiempo de aceptación de oferta debe ser mayor a 0',
                showConfirmButton: true,
                timer: 3000
              })
            } else {
              if (responseId == 0) {
                intIdentify = $('#rowID').text()
              } else {
                intIdentify = responseId
              }

              guardar()
              loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>ES</Opcion><Usuario>${userActive}</Usuario><clsSolicitudes><Id>${intIdentify}</Id></clsSolicitudes></clsParametros>`, valToken, false)
              generarGrid()
            }
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Debes ingresar los campos obligatorios para cambiar el estatus a Solicitado',
              showConfirmButton: true,
              timer: 4000
            })
          }
        }
      }
    })
  });
  
  $('#btnProcesar').click(function () {
    Swal.fire({
      title: '¿Deseas cambiar el estatus a Procesando?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        if (responseId == 0) {
          intIdentify = $('#rowID').text()
        } else {
          intIdentify = responseId
        }

        loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>EP</Opcion><Usuario>${userActive}</Usuario><clsSolicitudes><Id>${intIdentify}</Id></clsSolicitudes></clsParametros>`, valToken, true)
        $('#add').modal('hide')
        generarGrid()
      }
    })
  });

  $('#btnComplementar').click(function () {
    Swal.fire({
      title: '¿Deseas complementar la solicitud?',
      text: 'Se habilitará el botón de "Guardar" para poder realizar cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        if (responseId == 0) {
          intIdentify = $('#rowID').text()
        } else {
          intIdentify = responseId
        }

        loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>EC</Opcion><Usuario>${userActive}</Usuario><clsSolicitudes><Id>${intIdentify}</Id></clsSolicitudes></clsParametros>`, valToken, true)
        $('#add').modal('hide')
        generarGrid()
      }
    })
  });

  $('#btnPruebas').click(function () {
    Swal.fire({
      title: '¿Deseas cambiar el estatus a Pruebas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        if (responseId == 0) {
          intIdentify = $('#rowID').text()
        } else {
          intIdentify = responseId
        }

        loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>EPR</Opcion><Usuario>${userActive}</Usuario><clsSolicitudes><Id>${intIdentify}</Id></clsSolicitudes></clsParametros>`, valToken, true)
        $('#add').modal('hide')
        generarGrid()
      }
    })
  });

  $('#btnFinalizar').click(function () {
    Swal.fire({
      title: '¿Deseas cambiar el estatus a Finalizado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        if (responseId == 0) {
          intIdentify = $('#rowID').text()
        } else {
          intIdentify = responseId
        }

        loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>EF</Opcion><Usuario>${userActive}</Usuario><clsSolicitudes><Id>${intIdentify}</Id></clsSolicitudes></clsParametros>`, valToken, true)
        $('#add').modal('hide')
        generarGrid()
      }
    })
  });

  $('#btnAgregarDocto').click(function () {
    $('#addDocument').modal('show')
    $('#lookUP_TipoDocumento').dxLookup({value: false})
    $('#documento').val('')
  });

  $(form).on('submit', function(e) {
    e.preventDefault()
    guardarDocumento(this)
  });

  //Funciones
  function cargarInformacion() {
    let ftp, sftp, ftpTest, sftpTest, arrayTemporalEspecs = [], arrayTemporalContactos = [], arrayTemporal214 = [], arrayTemporal210 = []
    let id = $('#rowID').text()
    strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>CI</Opcion><clsSolicitudes><Id>${id}</Id></clsSolicitudes></clsParametros>`, valToken, false);
    arraySolicitudes = strConsulta.Table[0]
    arrayEspecificaciones = strConsulta.Table1
    arrayContactos = strConsulta.Table2
    arrayDocumentos = strConsulta.Table3
    array214 = strConsulta.Table4
    array210 = strConsulta.Table5

    if (arraySolicitudes.ProtocoloProductivo == 'FTP') {
      ftp = true
      sftp = false
    } else if (arraySolicitudes.ProtocoloProductivo == 'SFTP') {
      ftp = false
      sftp = true
    } else {
      ftp = false
      sftp = false
    }

    if (arraySolicitudes.ProtocoloTest == 'FTP') {
      ftpTest = true
      sftpTest = false
    } else if (arraySolicitudes.ProtocoloTest == 'SFTP') {
      ftpTest = false
      sftpTest = true
    } else {
      ftpTest = false
      sftpTest = false
    }

    if (arraySolicitudes.ClaveEstatus == 'BORR') {
      $('#btnGuardar').prop('disabled', false)
      $('#btnAgregarDocto').prop('disabled', false)
      $('#btnSolicitar').css('pointer-events', '')
      $('#btnSolicitar').css('opacity', '')
      $('#btnProcesar').css('pointer-events', 'none')
      $('#btnProcesar').css('opacity', '0.6')
      $('#btnComplementar').css('pointer-events', 'none')
      $('#btnComplementar').css('opacity', '0.6')
      $('#btnPruebas').css('pointer-events', 'none')
      $('#btnPruebas').css('opacity', '0.6')
      $('#btnFinalizar').css('pointer-events', 'none')
      $('#btnFinalizar').css('opacity', '0.6')
    } else if (arraySolicitudes.ClaveEstatus == 'SOL') {
      $('#btnGuardar').prop('disabled', true)
      $('#btnAgregarDocto').prop('disabled', true)
      $('#btnSolicitar').css('pointer-events', 'none')
      $('#btnSolicitar').css('opacity', '0.6')
      $('#btnProcesar').css('pointer-events', '')
      $('#btnProcesar').css('opacity', '')
      $('#btnComplementar').css('pointer-events', 'none')
      $('#btnComplementar').css('opacity', '0.6')
      $('#btnPruebas').css('pointer-events', 'none')
      $('#btnPruebas').css('opacity', '0.6')
      $('#btnFinalizar').css('pointer-events', 'none')
      $('#btnFinalizar').css('opacity', '0.6')
    } else if (arraySolicitudes.ClaveEstatus == 'PROC') {
      $('#btnGuardar').prop('disabled', true)
      $('#btnAgregarDocto').prop('disabled', true)
      $('#btnSolicitar').css('pointer-events', 'none')
      $('#btnSolicitar').css('opacity', '0.6')
      $('#btnProcesar').css('pointer-events', 'none')
      $('#btnProcesar').css('opacity', '0.6')
      $('#btnComplementar').css('pointer-events', '')
      $('#btnComplementar').css('opacity', '')
      $('#btnPruebas').css('pointer-events', '')
      $('#btnPruebas').css('opacity', '')
      $('#btnFinalizar').css('pointer-events', 'none')
      $('#btnFinalizar').css('opacity', '0.6')
    } else if (arraySolicitudes.ClaveEstatus == 'COMP') {
      $('#btnGuardar').prop('disabled', false)
      $('#btnAgregarDocto').prop('disabled', false)
      $('#btnSolicitar').css('pointer-events', '')
      $('#btnSolicitar').css('opacity', '')
      $('#btnProcesar').css('pointer-events', 'none')
      $('#btnProcesar').css('opacity', '0.6')
      $('#btnComplementar').css('pointer-events', 'none')
      $('#btnComplementar').css('opacity', '0.6')
      $('#btnPruebas').css('pointer-events', 'none')
      $('#btnPruebas').css('opacity', '0.6')
      $('#btnFinalizar').css('pointer-events', 'none')
      $('#btnFinalizar').css('opacity', '0.6')
    } else if (arraySolicitudes.ClaveEstatus == 'PRUE') {
      $('#btnGuardar').prop('disabled', true)
      $('#btnAgregarDocto').prop('disabled', true)
      $('#btnSolicitar').css('pointer-events', 'none')
      $('#btnSolicitar').css('opacity', '0.6')
      $('#btnProcesar').css('pointer-events', 'none')
      $('#btnProcesar').css('opacity', '0.6')
      $('#btnComplementar').css('pointer-events', 'none')
      $('#btnComplementar').css('opacity', '0.6')
      $('#btnPruebas').css('pointer-events', 'none')
      $('#btnPruebas').css('opacity', '0.6')
      $('#btnFinalizar').css('pointer-events', '')
      $('#btnFinalizar').css('opacity', '')
    } else if (arraySolicitudes.ClaveEstatus == 'FIN') {
      $('#btnGuardar').prop('disabled', true)
      $('#btnAgregarDocto').prop('disabled', true)
      $('#btnSolicitar').css('pointer-events', 'none')
      $('#btnSolicitar').css('opacity', '0.6')
      $('#btnProcesar').css('pointer-events', 'none')
      $('#btnProcesar').css('opacity', '0.6')
      $('#btnComplementar').css('pointer-events', 'none')
      $('#btnComplementar').css('opacity', '0.6')
      $('#btnPruebas').css('pointer-events', 'none')
      $('#btnPruebas').css('opacity', '0.6')
      $('#btnFinalizar').css('pointer-events', 'none')
      $('#btnFinalizar').css('opacity', '0.6')
    } 

    $('#extras').prop('disabled', false)
    $('#btnDescargarDocto').prop('disabled', true)
    let divDownload = document.getElementById('btnDescargarDocto')
    divDownload.innerHTML = `<a><i class="fas fa-download text-white text-decoration-none"></i></a>`
    $('#addLabel').text('Editar: Solicitud Integración EDI')
    $('#estatusSolicitud').text('ESTATUS: ' + arraySolicitudes.Estatus)
    $('#switch-FTP').dxSwitch({value: ftp})
    $('#switch-SFTP').dxSwitch({value: sftp})
    $('#textBoxURLProductivo').dxTextBox({value: arraySolicitudes.URLProductivo})
    $('#textBoxFromProductivo').dxTextBox({value: arraySolicitudes.FromProductivo})
    $('#textBoxUsuarioProductivo').dxTextBox({value: arraySolicitudes.UsuarioProductivo})
    $('#numberBoxPuertoProductivo').dxNumberBox({value: arraySolicitudes.PuertoProductivo})
    $('#textBoxToProductivo').dxTextBox({value: arraySolicitudes.ToProductivo})
    $('#textBoxContrasenaProductivo').dxTextBox({value: arraySolicitudes.ContrasenaProductivo})
    $('#switch-TestFTP').dxSwitch({value: ftpTest})
    $('#switch-TestSFTP').dxSwitch({value: sftpTest})
    $('#textBoxURLTest').dxTextBox({value: arraySolicitudes.URLTest})
    $('#textBoxFromTest').dxTextBox({value: arraySolicitudes.FromTest})
    $('#textBoxUsuarioTest').dxTextBox({value: arraySolicitudes.UsuarioTest})
    $('#numberBoxPuertoTest').dxNumberBox({value: arraySolicitudes.PuertoTest})
    $('#textBoxToTest').dxTextBox({value: arraySolicitudes.ToTest})
    $('#textBoxContrasenaTest').dxTextBox({value: arraySolicitudes.ContrasenaTest})
    $('#switch-204').dxSwitch({value: arraySolicitudes.EDI204})
    $('#switch-210').dxSwitch({value: arraySolicitudes.EDI210})
    $('#switch-214').dxSwitch({value: arraySolicitudes.EDI214})
    $('#switch-990').dxSwitch({value: arraySolicitudes.EDI990})
    $('#switch-997').dxSwitch({value: arraySolicitudes.EDI997})
    $('#numberBoxTiempoOferta').dxNumberBox({value: arraySolicitudes.TiempoOferta})
    $('#numberBoxIntervaloX6').dxNumberBox({value: arraySolicitudes.IntervaloX6})
    $('#numberBoxIntervaloETA').dxNumberBox({value: arraySolicitudes.IntervaloETA})
    $('#textBoxInterChangeId').dxTextBox({value: arraySolicitudes.InterChangeId})
    $('#textBoxInterCualifier').dxTextBox({value: arraySolicitudes.InterCualifier})
    $('#textBoxInterChangeIdTest').dxTextBox({value: arraySolicitudes.InterChangeIdTest})
    $('#textBoxInterCualifierTest').dxTextBox({value: arraySolicitudes.InterCualifierTest})

    //cargar especificaciones
    $('#arrayEspecificaciones').text('')
      for (var i = 0; i < arrayEspecificaciones.length; i++) {
        arrayTemporalEspecs.push(`<clsEspecificaciones>
                                    <TipoEDI>${arrayEspecificaciones[i].TipoEDI_Id}</TipoEDI>
                                    <Segmento>${arrayEspecificaciones[i].Segmento_Id}</Segmento>
                                    <Indice>${arrayEspecificaciones[i].Indice}</Indice>
                                    <Especificacion>${arrayEspecificaciones[i].Especificacion}</Especificacion>
                                    <TipoEDIText>${arrayEspecificaciones[i].TipoEdiText}</TipoEDIText>
                                  </clsEspecificaciones>`)
    }
    $('#arrayEspecificaciones').text(arrayTemporalEspecs)

    //cargar contactos
    $('#arrayContactos').text('')
      for (var i = 0; i < arrayContactos.length; i++) {
        arrayTemporalContactos.push(`<clsContactos>
                                      <Nombres>${arrayContactos[i].Nombres}</Nombres>
                                      <Telefono>${arrayContactos[i].Telefono}</Telefono>
                                      <Correo>${arrayContactos[i].Correo}</Correo>
                                      <Puesto>${arrayContactos[i].Puesto}</Puesto>
                                      <HorarioAtencion>${arrayContactos[i].HorarioAtencion}</HorarioAtencion>
                                    </clsContactos>`)
    }
    $('#arrayContactos').text(arrayTemporalContactos)

    //cargar tipo EDI 214
    $('#array214').text('')
      for (var i = 0; i < array214.length; i++) {
        arrayTemporal214.push(`<clsTipos214>
                                  <Clave>${array214[i].Clave}</Clave>
                                  <HoraEvento>${array214[i].HoraEvento}</HoraEvento>
                                </clsTipos214>`)
    }
    $('#array214').text(arrayTemporal214)

    //Cargar tipo EDI 210
    let seleccionados210 = []

    for (let i = 0; i < array210.length; i++) {
      if (array210[i].Seleccionado == 1) {
        seleccionados210.push(array210[i].Id)
      }
    }

    loadListSelection('#list210', 'tipos210', '#items210', array210, 'check', 421)
    $('#list210').dxList({selectedItemKeys: seleccionados210})

    generarGridEspecificaciones(arrayEspecificaciones)
    generarGridContactos(arrayContactos)
    generarGrid214(array214)
    generarGridDocumentos()

    const keyupSelector = document.querySelector('.dx-selection');
    keyupSelector.addEventListener('keyup', (e) => {
      const keycode = e.keyCode || e.wich;
      if (keycode == 13) {
        $('#add').modal('show');
      }
    });
    keyupSelector.addEventListener('dblclick', () => {
      $('#add').modal('show');
    });
    keyupSelector.addEventListener('touchstart', (e) => {
      e.preventDefault();
      $('#add').modal('show');
    });
  }

  function generarGrid() {
    if (perId == 1) {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>CT</Opcion></clsParametros>`, valToken, false);
    } else {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', `<clsParametros><Opcion>C</Opcion><Usuario>${userActive}</Usuario></clsParametros>`, valToken, false);
    }
    loadDataGrid('#gridSolicitudes', 850, 20, 'SolicitudesEDI', arrayColumnas, strConsulta.Table, false);
    $('#gridSolicitudes').dxDataGrid({
      //Sumatoria y contador
      summary: {
        totalItems: [{
          column: 'Folio',
          summaryType: 'count',
        },],
      },
      onSelectionChanged(e) {
        const data = e.selectedRowsData[0].Id;
        $('#rowID').text(data);
        $('#dataControl').html('');
        $('#btnUpdate').prop('disabled', false);
        cargarInformacion();
      },
      onRowPrepared(e) {
        if (e.rowType === 'data') {
          if (e.key.ClaveEstatus == 'FIN') {
            e.rowElement.removeClass('dx-row-alt'); 
            e.rowElement.addClass('table-success text-success'); 
          } 
        }
      },
    })
  }

  function generarGridEspecificaciones(strArreglo) {
    loadDataGrid('#gridEspecificaciones', 500, 20, 'Especificaciones', arrayColumnasEspecificaciones, strArreglo, true);
    $('#gridEspecificaciones').dxDataGrid({
      editing: {
        refreshMode: 'reshape',
        mode: 'form',
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true,
        useIcons: true
      },
      onSaved(e) {
        $('#arrayEspecificaciones').text('')
        let arrayTemporal = []
        for (var i = 0; i < strArreglo.length; i++) {
          arrayTemporal.push(`<clsEspecificaciones>
                                <TipoEDI>${strArreglo[i].TipoEDI_Id}</TipoEDI>
                                <Segmento>${strArreglo[i].Segmento_Id}</Segmento>
                                <Indice>${strArreglo[i].Indice}</Indice>
                                <Especificacion>${strArreglo[i].Especificacion}</Especificacion>
                                <TipoEDIText>${strArreglo[i].TipoEdiText}</TipoEDIText>
                              </clsEspecificaciones>`)
        }
        $('#arrayEspecificaciones').text(arrayTemporal)
      },
      onEditorPreparing(e) {
        if (e.parentType == "dataRow" && e.dataField == "Especificacion") {  
          e.editorName = "dxTextArea";
          e.editorOptions.height = 95;
        }
      },
    })
  }

  function generarGridContactos(strArreglo) {
    loadDataGrid('#gridContactos', 500, 20, 'Contactos', arrayColumnasContactos, strArreglo, true);
    $('#gridContactos').dxDataGrid({
      editing: {
        refreshMode: 'reshape',
        mode: 'form',
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true,
        useIcons: true
      },
      onSaved(e) {
        $('#arrayContactos').text('')
        let arrayTemporal = []
        for (var i = 0; i < strArreglo.length; i++) {
          if (strArreglo[i].Puesto == undefined) {
            strArreglo[i].Puesto = null
          }
          if (strArreglo[i].HorarioAtencion == undefined) {
            strArreglo[i].HorarioAtencion = null
          }
          arrayTemporal.push(`<clsContactos>
                                <Nombres>${strArreglo[i].Nombres}</Nombres>
                                <Telefono>${strArreglo[i].Telefono}</Telefono>
                                <Correo>${strArreglo[i].Correo}</Correo>
                                <Puesto>${strArreglo[i].Puesto}</Puesto>
                                <HorarioAtencion>${strArreglo[i].HorarioAtencion}</HorarioAtencion>
                              </clsContactos>`)
        }
        $('#arrayContactos').text(arrayTemporal)
      },
    })
  }

  function generarGrid214(strArreglo) {
    loadDataGrid('#grid214', 421, 20, '214', arrayColumnasTipos214, strArreglo, true);
    $('#grid214').dxDataGrid({
      onSaved(e) {
        if (e.changes[0].type == 'remove') {
          if (e.changes[0].key.Clave == 69189) {
            $('#numberBoxIntervaloX6').dxNumberBox({value: 0})
          } else if (e.changes[0].key.Clave == 69188) {
            $('#numberBoxIntervaloETA').dxNumberBox({value: 0})
          }
        } else {
          if (e.changes[0].key.Clave == 69189) {
            let clave = e.changes[0].key.HoraEvento
            let hrs = parseInt(clave.substr(0,2))
            let mnts = parseInt(clave.substr(2,2))
            let hrsAMinutos = hrs * 60
            let totalMinutos = hrsAMinutos + mnts
            $('#numberBoxIntervaloX6').dxNumberBox({value: totalMinutos})
          } else if (e.changes[0].key.Clave == 69188) {
            let clave = e.changes[0].key.HoraEvento
            let hrs = parseInt(clave.substr(0,2))
            let mnts = parseInt(clave.substr(2,2))
            let hrsAMinutos = hrs * 60
            let totalMinutos = hrsAMinutos + mnts
            $('#numberBoxIntervaloETA').dxNumberBox({value: totalMinutos})
          }
        }

        $('#array214').text('')
        let arrayTemporal = []
        for (var i = 0; i < strArreglo.length; i++) {
          if (strArreglo[i].HoraEvento == undefined) {
            strArreglo[i].HoraEvento = 0
          }
          arrayTemporal.push(`<clsTipos214>
                                <Clave>${strArreglo[i].Clave}</Clave>
                                <HoraEvento>${strArreglo[i].HoraEvento}</HoraEvento>
                              </clsTipos214>`)
        }
        $('#array214').text(arrayTemporal)
      },
      onInitNewRow(e) {  
        e.data.HoraEvento = '00:00';  
      },
    })
  }

  function generarGridDocumentos() {
    if (responseId == 0) {
      intIdentify = $('#rowID').text()
    } else {
      intIdentify = responseId
    }

    strData = `<clsParametros>
                  <Opcion>CD</Opcion>
                  <clsSolicitudes>
                    <Id>${intIdentify}</Id>
                  </clsSolicitudes>
                </clsParametros>`
    strRespuesta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', strData, valToken, false);

    loadDataGrid('#gridDocumentos', 500, 20, 'Documentos', arrayColumnasDocumentos, strRespuesta.Table, false);
    let dataGridDocumentos = $('#gridDocumentos').dxDataGrid({
      onSelectionChanged(e) {
        $('#btnDescargarDocto').prop('disabled', false)
        let idDocto = e.selectedRowsData[0].EJE_Id
        let extension = e.selectedRowsData[0].Extension
        let nombreOriginal = e.selectedRowsData[0].Nombre
        let nombreArchivo = idDocto + extension
        const data = {
          "Token": valToken,
          "PathNAS": "\\\\192.168.1.2\\docs_tmsystem\\EDI_SolicitudIntegracion\\" + nombreArchivo,
          "AccionNAS": "Read"
        }
        fetch(`${url}Files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((response) => response.json()).then((data) => {
          let b64 = data.dataResponse
          let link = document.createElement('a')
          link.innerHTML = `<a><i class="fas fa-download text-white text-decoration-none"></i></a>`
          link.download = nombreOriginal
          link.href = 'data:application/octet-stream;base64,' + b64;
          let divDownload = document.getElementById('btnDescargarDocto')
          divDownload.innerHTML = `<a href="${link.href}" download="${link.download}"><i class="fas fa-download text-white text-decoration-none"></i></a>`
        })
      },
    }).dxDataGrid('instance')
  }

  function guardar() {
    let protocoloProd, protocoloTest
    let id = $('#rowID').text()
    let ftpProd = $('#switch-FTP').children('input[type=hidden]').val()
    let sftpProd = $('#switch-SFTP').children('input[type=hidden]').val()
    let urlProd = $('#textBoxURLProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let puertoProd = $('#numberBoxPuertoProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let fromProd = $('#textBoxFromProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let toProd = $('#textBoxToProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let usuarioProd = $('#textBoxUsuarioProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let contrasenaProd = $('#textBoxContrasenaProductivo').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let ftpTest = $('#switch-TestFTP').children('input[type=hidden]').val()
    let sftpTest = $('#switch-TestSFTP').children('input[type=hidden]').val()
    let urlTest = $('#textBoxURLTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let puertoTest = $('#numberBoxPuertoTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let fromTest = $('#textBoxFromTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let toTest = $('#textBoxToTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let usuarioTest = $('#textBoxUsuarioTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let contrasenaTest = $('#textBoxContrasenaTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let t210 = $('#switch-210').children('input[type=hidden]').val()
    let t990 = $('#switch-990').children('input[type=hidden]').val()
    let t214 = $('#switch-214').children('input[type=hidden]').val()
    let r997 = $('#switch-997').children('input[type=hidden]').val()
    let r204 = $('#switch-204').children('input[type=hidden]').val()
    let tiempoOferta = $('#numberBoxTiempoOferta').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let intervaloX6 = $('#numberBoxIntervaloX6').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let intervaloETA = $('#numberBoxIntervaloETA').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let interChangeId = $('#textBoxInterChangeId').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let interCualifier = $('#textBoxInterCualifier').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let interChangeIdTest = $('#textBoxInterChangeIdTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let interCualifierTest = $('#textBoxInterCualifierTest').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();
    let listEspecificaciones = $('#arrayEspecificaciones').text()
    let listXMLEspecificaciones = listEspecificaciones.replace(/,/g, "")
    let listContactos = $('#arrayContactos').text()
    let listXMLContactos = listContactos.replace(/,/g, "")
    let list214 = $('#array214').text()
    let listXML214 = list214.replace(/,/g, "")

    let items210 = $('#items210').text()
    let convert = items210.split(',')
    let tipos210XML = []
    convert.forEach(function (idDocEntrada) {
      tipos210XML.push(`<clsTipos210>
                              <Clave>${idDocEntrada}</Clave>
                              <HoraEvento>0</HoraEvento>
                            </clsTipos210>`)
      $('#array210').text(tipos210XML)
    })
    let list210 = $('#array210').text()
    let listXML210 = list210.replace(/,/g, "")

    if (ftpProd == 'true') {
      protocoloProd = 'FTP'
    } else {
      if (sftpProd == 'true') {
        protocoloProd = 'SFTP'
      } else {
        protocoloProd = ''
      }
    }

    if (ftpTest == 'true') {
      protocoloTest = 'FTP'
    } else {
      if (sftpTest == 'true') {
        protocoloTest = 'SFTP'
      } else {
        protocoloTest = ''
      }
    }

    strData = `<clsParametros>
                  <Opcion>G</Opcion>
                  <Usuario>${userActive}</Usuario>
                  <clsSolicitudes>
                      <Id>${id}</Id>
                      <FTPUrl>${urlProd}</FTPUrl>
                      <FTPPort>${puertoProd}</FTPPort>
                      <FTPUrlFrom>${fromProd}</FTPUrlFrom>
                      <FTPUrlTo>${toProd}</FTPUrlTo>
                      <FTPProtocol>${protocoloProd}</FTPProtocol>
                      <FTPUsuario>${usuarioProd}</FTPUsuario>
                      <FTPContrasena>${contrasenaProd}</FTPContrasena>
                      <TestFTPUrl>${urlTest}</TestFTPUrl>
                      <TestFTPPort>${puertoTest}</TestFTPPort>
                      <TestFTPUrlFrom>${fromTest}</TestFTPUrlFrom>
                      <TestFTPUrlTo>${toTest}</TestFTPUrlTo>
                      <TestFTPProtocol>${protocoloTest}</TestFTPProtocol>
                      <TestFTPUsuario>${usuarioTest}</TestFTPUsuario>
                      <TestFTPContrasena>${contrasenaTest}</TestFTPContrasena>
                      <EDI204>${r204}</EDI204>
                      <EDI210>${t210}</EDI210>0
                      <EDI214>${t214}</EDI214>
                      <EDI990>${t990}</EDI990>
                      <EDI997>${r997}</EDI997>
                      <MinutosCaduca>${tiempoOferta}</MinutosCaduca>
                      <IntervaloX6>${intervaloX6}</IntervaloX6>
                      <IntervaloETA>${intervaloETA}</IntervaloETA>
                      <InterChangeId>${interChangeId}</InterChangeId>
                      <InterCualifier>${interCualifier}</InterCualifier>
                      <InterChangeIdTest>${interChangeIdTest}</InterChangeIdTest>
                      <InterCualifierTest>${interCualifierTest}</InterCualifierTest>
                      <Especificaciones>
                          ${listXMLEspecificaciones}
                      </Especificaciones>
                      <Contactos>
                          ${listXMLContactos}
                      </Contactos>
                      <Tipos214>
                          ${listXML214}
                      </Tipos214>
                      <Tipos210>
                          ${listXML210}
                      </Tipos210>
                  </clsSolicitudes>
              </clsParametros>`
    strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', strData, valToken, true);
    responseId = strConsulta.Table[0].Id
    $('#add').modal('hide')
    generarGrid()
  }

  function guardarDocumento(form) {
    if (responseId == 0) {
      intIdentify = $('#rowID').text()
    } else {
      intIdentify = responseId
    }
    let tipo = $('#lookUP_TipoDocumento').children('input[type=hidden]').val();
    let documento = $('#documento').val()

    if (tipo == "false" || tipo == '' || documento == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Debes ingresar los campos obligatorios',
        showConfirmButton: true,
        timer: 2500
      });
    } else {
      let nombre = $('#documento')[0].files[0].name;
      let ruta = 'docs_tmsystem\\EDI_SolicitudIntegracion\\'
      let ext = $('#documento').val().split('.').pop();
      let extension = '.' + ext;
      strData = `<clsParametros>
                  <Opcion>GD</Opcion>
                  <Usuario>${userActive}</Usuario>
                  <clsSolicitudes>
                    <Id>${intIdentify}</Id>
                    <Documentos>
                      <clsDocumentos>
                        <Nombre>${nombre}</Nombre>
                        <Ruta>${ruta}</Ruta>
                        <Extension>${extension}</Extension>
                        <Tipo>${tipo}</Tipo>
                      </clsDocumentos>
                    </Documentos>
                  </clsSolicitudes>
                </clsParametros>`;
      strRespuesta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTSolicitudesEDI', strData, valToken, false);
      let insertedID = strRespuesta.Table[0]
      $('#insertedID').val(insertedID.Id);
      if ($('#insertedID').val() != '' && $('#insertedID').val() !== undefined) {
        let peticion = new XMLHttpRequest();
        peticion.open('post', './view/includes/modules/clientes/solicitud-edi/subir-documento.php')
        peticion.send(new FormData(form))
        peticion.addEventListener('load', function(event) {
          if (peticion.status != 200) {
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error al guardar el documento, contacta al personal de sistemas',
              showConfirmButton: true,
              timer: 1500
            });
          } else {
            generarGridDocumentos()
            $('#btnDescargarDocto').prop('disabled', true)
            let divDownload = document.getElementById('btnDescargarDocto')
            divDownload.innerHTML = `<a><i class="fas fa-download text-white text-decoration-none"></i></a>`
            $('#addDocument').modal('hide')
            Swal.fire({
              icon: 'success',
              title: 'Información guardada correctamente',
              showConfirmButton: true,
              timer: 2000
            });
          }
        });
      }
    }
  }

  //Ejecución de funciones
  generarGrid()
});