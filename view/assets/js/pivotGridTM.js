function loadPivotGrid(strComponente, strFields, strStore, strExcel) {
  $(strComponente).dxPivotGrid({
    allowSortingBySummary: true,
    allowSorting: true,
    allowFiltering: true,
    allowExpandAll: true,
    showBorders: true,
    fieldChooser: {
      enabled: false,
    },
    export: {
      enabled: true,
    },
    dataSource: {
      fields: strFields,
      store: strStore,
    },
    onExporting(e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales');

      DevExpress.excelExporter.exportPivotGrid({
        component: e.component,
        worksheet,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], {
            type: 'application/octet-stream'
          }), `${strExcel}.xlsx`);
        });
      });
      e.cancel = true;
    },
  })
}