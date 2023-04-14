function loadBarChart(strIdentificador, dataSource, strType, strArgument) {
    $(strIdentificador).dxChart({
        dataSource,
        commonSeriesSettings: {
            argumentField: strArgument,
            type: strType,
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
                border: {
                    width: '30px',
                    color: '#ffffff' 
                }
            },
        },
        loadPanel: {
            enabled: true,
        },
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select()
        },
        tooltip: {
            enabled: true,
            location: 'edge',
            customizeTooltip(arg) {
                return {
                    text: `${arg.seriesName}: ${arg.valueText}`,
                }
            },
        },
    })
}