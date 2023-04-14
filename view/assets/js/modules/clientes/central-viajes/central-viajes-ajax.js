window.addEventListener('DOMContentLoaded', () => {
	//Propiedades
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
    {dataField: 'Folio', caption: 'Folio', dataType: 'string'},
    {dataField: 'Cliente', caption: 'Cliente', dataType: 'string', groupIndex: 1},
    {dataField: 'Origen', caption: 'Origen', dataType: 'string'},
    {dataField: 'Destino', caption: 'Destino', dataType: 'string'},
    {dataField: 'TipoServicio', caption: 'Tipo Servicio', dataType: 'string'},
    {dataField: 'Frecuencia', caption: 'Frecuencia', dataType: 'string'},
    {dataField: 'Observaciones', caption: 'Observaciones', dataType: 'string'},
    {dataField: 'Empresa', caption: 'Empresa', dataType: 'string', visible: false},
  ]

  //Funciones
  function cargarInformacion() {
    if (perId == 1) {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CV</Opcion></clsParametros>`, valToken, false);
    } else {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CV</Opcion><Usuario>${userActive}</Usuario></clsParametros>`, valToken, false);
    }
    
    let responseArray = strConsulta.Table

    loadDataGrid('#dataGridViajes', 850, 20, 'Transmisiones', arrayColumnas, responseArray, false);
    $('#dataGridViajes').dxDataGrid({
      //Sumatoria y contador
      summary: {
        totalItems: [{
          column: 'Folio',
          summaryType: 'count',
        },],
      },
    })
  }

  //Ejecución de funciones
  cargarInformacion()
});