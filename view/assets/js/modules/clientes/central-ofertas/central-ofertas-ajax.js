window.addEventListener('DOMContentLoaded', () => {
	//Propiedades
	// const url = 'https://tmsystem.grupo-tm.mx/';
  // const url = 'https://192.168.1.22/';
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

  //Declaración de columnas para dataGrids
  let arrayColumnas = [
    {dataField: 'Folio', caption: 'Folio Viaje', dataType: 'string'},
    {dataField: 'Referencia', caption: 'Referencia', dataType: 'string'},
    {dataField: 'Empresa', caption: 'Empresa', dataType: 'string'},
    {dataField: 'FechaPublicacion', caption: 'Fecha Publicacion', dataType: 'datetime', format: 'dd/MMM/yyyy HH:mm:ss'},
    {dataField: 'FechaRespuesta', caption: 'Fecha Respuesta', dataType: 'datetime', format: 'dd/MMM/yyyy HH:mm:ss'},
    {dataField: 'FechaVencimiento', caption: 'Fecha Vencimiento', dataType: 'datetime', format: 'dd/MMM/yyyy HH:mm:ss'},
    {dataField: 'Ruta', caption: 'Ruta', dataType: 'string'},
    {dataField: 'MotivoRechazo', caption: 'Motivo Rechazo', dataType: 'string'},
    {dataField: 'Estatus', caption: 'Estatus', dataType: 'string'},
    {dataField: 'TiempoRespuesta', caption: 'Tiempo Respuesta (minutos)', dataType: 'number', alignment: "right", format: "#,##0.##"},
    {dataField: 'Respuesta', caption: 'Respuesta', dataType: 'boolean', visible: false},
  ]

  //Elementos
  loadSelect(`${url}IntegracionesGPO`, 'INTCentralReportes', '<clsParametros><Opcion>CC</Opcion></clsParametros>', '#lookUP_Cliente', true, 'lookUP_Cliente', false, valToken);
  loadBoton('#buscar', 'Buscar', 'default', false, true, false)
  loadBoton('#actualizar', 'Actualizar', 'success', false, true, false)

  //Eventos
  $('#buscar').click(function () {
    let CTE_Id = $('#lookUP_Cliente').children('input[type=hidden]').val();

    if (CTE_Id == 'false' || CTE_Id == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Debes seleccionar un Cliente',
        showConfirmButton: true,
        timer: 3000
      })
    } else {
      buscarInformacion(CTE_Id)
    }
  });

  $('#actualizar').click(function () {
    cargarInformacion()
  });

  //Funciones
  function cargarInformacion() {
    if (perId == 1) {
      $('#buscador').removeClass('d-none')
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CO</Opcion></clsParametros>`, valToken, false);
    } else {
      strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>CO</Opcion><Usuario>${userActive}</Usuario></clsParametros>`, valToken, false);
    }

    let arrayVencidas = strConsulta.Table
    let arrayAceptadas = strConsulta.Table1
    let arrayRechazadas = strConsulta.Table2
    let arrayOfertas = strConsulta.Table3

    loadDouneChart('#graficaAceptadas', arrayAceptadas, '')
    $('#graficaAceptadas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Aceptadas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Aceptadas') {  
           return {  
             color: "#33941D"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDouneChart('#graficaRechazadas', arrayRechazadas, '')
    $('#graficaRechazadas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Rechazadas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Rechazadas') {  
           return {  
             color: "#BE2525"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDouneChart('#graficaVencidas', arrayVencidas, '')
    $('#graficaVencidas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Vencidas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Vencidas') {  
           return {  
             color: "#D8D025"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDataGrid('#dataGridOfertas', 850, 20, 'Ofertas', arrayColumnas, arrayOfertas, false);
    $('#dataGridOfertas').dxDataGrid({
      //Sumatoria y contador
      summary: {
        totalItems: [{
          column: 'Folio',
          summaryType: 'count',
        },],
      },
    })
  }

  function buscarInformacion(intIdCliente) {
    strConsulta = loadfuncionAjax(`${url}IntegracionesGPO`, 'INTCentralReportes', `<clsParametros><Opcion>COC</Opcion><clsOfertas><CTE_Id>${intIdCliente}</CTE_Id></clsOfertas></clsParametros>`, valToken, false);

    let arrayVencidas = strConsulta.Table
    let arrayAceptadas = strConsulta.Table1
    let arrayRechazadas = strConsulta.Table2
    let arrayOfertas = strConsulta.Table3

    loadDouneChart('#graficaAceptadas', arrayAceptadas, '')
    $('#graficaAceptadas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Aceptadas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Aceptadas') {  
           return {  
             color: "#33941D"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDouneChart('#graficaRechazadas', arrayRechazadas, '')
    $('#graficaRechazadas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Rechazadas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Rechazadas') {  
           return {  
             color: "#BE2525"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDouneChart('#graficaVencidas', arrayVencidas, '')
    $('#graficaVencidas').dxPieChart({
      series: [
      {
        argumentField: 'Estatus',
        valueField: 'Total',
        label: {
          visible: true,
          connector: {
            visible: true,
            width: 1,
          },
        },
      },
      ],
      title: 'Vencidas',
      customizeLabel() {
        return {
          visible: true,
          customizeText() {
            return `${this.valueText}`;
          },
        };
        return null;
      },
      customizePoint: function(pointInfo) {
         if (pointInfo.data.Estatus == 'Vencidas') {  
           return {  
             color: "#D8D025"  
           }  
         } else {
          return {
            color: "#213a79" 
          }
        }
      },
    })

    loadDataGrid('#dataGridOfertas', 850, 20, 'Ofertas', arrayColumnas, arrayOfertas, false);
    $('#dataGridOfertas').dxDataGrid({
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