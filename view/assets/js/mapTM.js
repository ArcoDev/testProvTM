function loadMap(strIdentificador,strData, strOpcion, intHeight, strType, arrayMarkers) {
    if (strOpcion === 'insert') {
        $(strIdentificador).dxMap({
            zoom: 11,
            height: intHeight,
            width: '100%',
            provider: 'bing',
            controls: true,
            center: [25.474384456306677, -103.32396983282345],
            apiKey: {
                // Specify your API keys for each map provider:
                bing: "AgWPki9MnxQNE2j8ZNuEpXrTvzX8qqjbyfGzoCYAlXnlZfVJAj3sRhL__xO32UA0"
            },
            type: strType,
            markers: arrayMarkers,
        })
    } else if (strOpcion === 'update') {
        $(strIdentificador).dxMap({
            center: [25.474384456306677, -103.32396983282345],
            zoom: 11,
            height: 250,
            width: '175%',
            provider: 'bing',
            controls: true,
            apiKey: {
                // Specify your API keys for each map provider:
                bing: "AgWPki9MnxQNE2j8ZNuEpXrTvzX8qqjbyfGzoCYAlXnlZfVJAj3sRhL__xO32UA0"
            },
            markers: arrayMarkers,
            type: strType,
        })
    }
}