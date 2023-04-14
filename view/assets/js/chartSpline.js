function loadSplineChart(strIdentificador, dataSource, strArgument){
    $(strIdentificador).dxChart({
        dataSource,
        commonSeriesSettings: {
            argumentField: strArgument,
        },
        commonAxisSettings: {
            grid: {
                visible: true,
            },
        },
        margin: {
            bottom: 20,
        },
        tooltip: {
            enabled: true,
        },
        loadPanel: {
            enabled: true,
        },
        legend: {
            verticalAlignment: 'top',
            horizontalAlignment: 'right',
        },
        export: {
            enabled: true,
        },
        argumentAxis: {
            label: {
                format: {
                    type: 'decimal',
                },
            },
            allowDecimals: false,
            axisDivisionFactor: 60,
        },
    }).dxChart('instance');
}