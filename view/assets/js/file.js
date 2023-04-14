window.addEventListener('DOMContentLoaded', () => {
    let url = 'https://192.168.1.22'
    let valToken = $('#valToken').val()
    let userActive = $('#userActive').text()

    const request = $.ajax({
        url: `${url}/Core`,
        type: 'POST',
        async: false,
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        data: JSON.stringify({
            'Accion': 'COREDocumentosDEV',
            'Data': `<clsParametros>
                        <Usuario>${userActive}</Usuario>
                        <Opcion>CI</Opcion>
                        <Tabla>TTF_OrdenServicio</Tabla>
                        <Campo>ORS_Id</Campo>
                        <Valor>147506</Valor>
                        <clsDocumentos>
                            <Id>147506</Id>
                        </clsDocumentos>
                    </clsParametros>`,
            'Token': valToken
        })
    })
    request.done(function (response) {
        const res = JSON.parse(response.dataResponse)
        console.log("🚀 ~ file: file.js ~ line 28 ~ request.done ~ res", res)
        // const x = [{
        //     name: 'TM',
        //     isDirectory: true,
        //     items: [{
        //         name: res.Table[0].Id + '.' + res.Table[0].Extension,
        //         size: res.Table[0].Peso
        //     }]
        // }]
        const path = '/docs'
        $(() => {
            $('#file-uploader-images').dxFileUploader({
                multiple: true,
                uploadMode: 'useButtons',
                value: [],
                // uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
                uploadUrl: path,
                maxFileSize: 4000000,
            });
            // $('#file-manager').dxFileManager({
            //     name: 'fileManager',
            //     fileSystemProvider: x,
            //     currentPath: path,
            //     permissions: {
            //         create: true,
            //         copy: true,
            //         move: true,
            //         delete: true,
            //         rename: true,
            //         upload: true,
            //         download: true,
            //     },
            //     onSelectedFileOpened(e) {
            //         const popup = $('#photo-popup').dxPopup('instance')
            //         popup.option({
            //             title: e.file.name,
            //             contentTemplate: `<img src="${e.file.dataItem.url}" class="photo-popup-image" />`,
            //         })
            //         popup.show()
            //     },
            // })
            // $('#photo-popup').dxPopup({
            //     maxHeight: 600,
            //     hideOnOutsideClick: true,
            //     onContentReady(e) {
            //         const $contentElement = e.component.content()
            //         $contentElement.addClass('photo-popup-content')
            //     },
            // })
        })
    })
    request.fail(() => {
        Swal.fire({
            icon: 'error',
            title: 'Error en la petición del servidor, contacta a un personal de sistemas',
            showConfirmButton: false
        })
    })
})