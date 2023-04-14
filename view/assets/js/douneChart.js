function loadDoune(strIdentificador, dataSource) {
    $(strIdentificador).dxPieChart({
        dataSource,
        type: 'doughnut',
        legend: {
            visible: true,
        },
        commonSeriesSettings: {
            label: {
                visible: false,
            },
            resolveLabelOverlapping: 'shift',
            sizeGroup: 'piesGroup',
        },
        tooltip: {
            enabled: true,
            format: 'currency',
            customizeTooltip() {
                return {
                    text: `${this.valueText}`
                }
            },
        },
        export: {
            enabled: true,
        },
    })
}

function loadDouneChart(strIdentificador, dataSource, strTooltip) {
    $(strIdentificador).dxPieChart({
        dataSource,
        type: 'doughnut',
        legend: {
            visible: true,
        },
        commonSeriesSettings: {
            label: {
                visible: false,
            },
            resolveLabelOverlapping: 'shift',
            sizeGroup: 'piesGroup',
        },
        tooltip: {
            enabled: true,
            customizeTooltip() {
                return {
                    text: strTooltip + this.valueText
                }
            },
        },
        export: {
            enabled: true,
        },
    })
}