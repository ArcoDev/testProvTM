window.addEventListener('DOMContentLoaded', () => {
	//Propiedades
	// const url = 'https://tmsystem.grupo-tm.mx/';
  // const url = 'https://192.168.1.22/';
  // const url = 'http://transmonteslerdo.fortidyndns.com:8045/';
  let url = 'https://201.151.59.194:449/'

  const valToken = $('#valToken').val();
  const userActive = $('#userActive').text();
  const perId = $('#perId').val();
  let strConsulta;
  let strRespuesta;
  let strData;
  let strParametros;
  let workbook;
  let worksheet;
  let intIdentify;

  //Declaración de columnas para dataGrids
  let arrayColumnas = [
    {dataField: 'Referencia', caption: 'Referencia', dataType: 'string'},
    {dataField: 'Cliente', caption: 'Cliente', dataType: 'string', groupIndex: 0},
    {dataField: 'Ruta', caption: 'Ruta', dataType: 'string'},
    {dataField: 'Empresa', caption: 'Empresa', dataType: 'string'},
    {dataField: 'EstatusViaje', caption: 'Estatus Viaje', dataType: 'string'},
    {dataField: 'Latitud', caption: 'Latitud', dataType: 'string'},
    {dataField: 'Longitud', caption: 'Longitud', dataType: 'string'},
    {dataField: 'RespuestaIntegracion', caption: 'Respuesta Integracion', dataType: 'string'},
    {dataField: 'TipoIntegracion', caption: 'Tipo Integracion', dataType: 'string'},
    {dataField: 'TiempoRespuesta', caption: 'Tiempo Respuesta', dataType: 'number', alignment: "right", format: "#,##0.##"},
    {dataField: 'IntervaloTransmision', caption: 'Intervalo Transmision', dataType: 'string'},
    {dataField: 'TipoDoc', caption: 'Tipo Documento', dataType: 'string'},
    {
      visible: true,
      caption: 'Opciones',
      type: "buttons",
      buttons: [{
        icon: "map",
        hint: "Ubicación",
        onClick: function (e) {
          if (e.row.data.Latitud == '' || e.row.data.Longitud == '') {
            Swal.fire({
              icon: 'warning',
              title: 'Las coordenadas son inválidas',
              showConfirmButton: true,
              timer: 3000
            })
          } else {
            let latitud = e.row.data.Latitud
            let longitud = e.row.data.Longitud
            let coordenadas = [latitud, longitud]
            $('#modalUbicacion').modal('show')
            let ubicacion = [{
              location: coordenadas,
              iconSrc: "./view/assets/img/embarqueTM.png",
            }]
            $('#map').dxMap({
              markers: ubicacion,
              height: 500
            })
          }
        }
      }]
    },
  ]

  //Cargar elementos
  loadMap('#map', '', 'update', 500, 'hybrid', [])
  loadDateBox('#dateBoxFechaInicio', true, false, false, 'dd/MMM/yyyy', 'date', '')
  loadDateBox('#dateBoxFechaFin', true, false, false, 'dd/MMM/yyyy', 'date', '')
  loadTextBox('#textBoxReferencia', true, '', false, false);
  loadBoton('#consultar', 'Consultar', 'default', false, true, false);

  //Eventos
  $('#consultar').click(function () {
    let fechaInicio = $('#dateBoxFechaInicio').children('.dx-dropdowneditor-input-wrapper').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type=text]').val();
    let fechaFin = $('#dateBoxFechaFin').children('.dx-dropdowneditor-input-wrapper').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type=text]').val();
    let referencia = $('#textBoxReferencia').children('.dx-texteditor-container').children('.dx-texteditor-input-container').children('input[type="text"]').val();

    if (fechaInicio == '' || fechaFin == '' || referencia == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Debes ingresar los campos obligatorios',
        showConfirmButton: true,
        timer: 3500
      });
    } else if (moment(fechaInicio).format('L') > moment(fechaFin).format('L')) {
      Swal.fire({
        icon: 'warning',
        title: 'La fecha inicio debe ser menor o igual a la fecha fin',
        showConfirmButton: true,
        timer: 3500
      });
    } else {
      cargarInformacion(fechaInicio, fechaFin, referencia)
    }
  });

  //Funciones
  function cargarInformacion(fechaInicio, fechaFin, referencia) {
    if (perId == 1) {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CT</Opcion><clsOfertas><FechaInicio>${fechaInicio}</FechaInicio><FechaFin>${fechaFin}</FechaFin><Referencia>${referencia}</Referencia></clsOfertas></clsParametros>`, valToken, false);
    } else {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CT</Opcion><Usuario>${userActive}</Usuario><clsOfertas><FechaInicio>${fechaInicio}</FechaInicio><FechaFin>${fechaFin}</FechaFin><Referencia>${referencia}</Referencia></clsOfertas></clsParametros>`, valToken, false);
    }
    
    let responseArray = strConsulta.Table

    if (responseArray.length > 0) {
      generarGrid(responseArray)
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No se encontraron coincidencias',
        showConfirmButton: true,
        timer: 3500
      });
      generarGrid(responseArray)
    }
  }

  function generarGrid(array) {
    loadDataGrid('#dataGridTransmisiones', 850, 20, 'Transmisiones', arrayColumnas, array, false);
    $('#dataGridTransmisiones').dxDataGrid({
      //Sumatoria y contador
      summary: {
        totalItems: [{
          column: 'Referencia',
          summaryType: 'count',
        },],
      },
    })
  }

  //Ejecución de funciones
  generarGrid('')
});