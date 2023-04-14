// window.addEventListener('DOMContentLoaded', () => {
//     const url = 'https://192.168.1.22'
//     const userActive = $('#userActive').text()
//     const valToken = $('#valToken').val()
//     const request = $.ajax({
//         url: `${url}/Core`,
//         type: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         dataType: 'json',
//         data: JSON.stringify({
//             "Accion": "COREMenu",
//             "Data": `<clsParametros><Opcion>CMW</Opcion><Usuario>${userActive}</Usuario></clsParametros>`,
//             "Token": valToken
//         })
//     })
//     request.done(function (response) {
//         const modules = JSON.parse(response.dataResponse)
//         for (let i = 0; i < modules.Table.length; i += 1) {
//             let moduleArray = modules.Table[i]
//             const mdl = `<li class="nav-item mb-2">
//                                     <a class="nav-link active ${moduleArray.Clave}" style="cursor: pointer;">
//                                         <img src="./view/assets/img/${moduleArray.Ruta}" alt="Icon Trafico" width="30" height="30">
//                                         <p>
//                                             ${moduleArray.Nombre}
//                                             <i class="right fas fa-angle-right"></i>
//                                         </p>
//                                         <input type="hidden" class="iDMdl" value="${moduleArray.Id}">
//                                     </a>
//                                     <ul id="${moduleArray.Clave}" class="nav nav-treeview"></ul>
//                                 </li>`
//             $('#modules').append(mdl)
//         }
//         function generaMDL() {
//             for (let i = 0; i < modules.Table.length; i += 1) {
//                 let moduleArray = modules.Table[i]
//                 const request = $.ajax({
//                     url: `${url}/Core`,
//                     type: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     dataType: 'json',
//                     data: JSON.stringify({
//                         "Accion": "CORELogIn",
//                         "Data": `<clsParametros>
//                                     <Opcion>APW</Opcion>
//                                     <Usuario>${userActive}</Usuario>
//                                     <IdModulo>${moduleArray.Id}</IdModulo>
//                                 </clsParametros>`,
//                         "Token": valToken
//                     })
//                 })
//                 request.done((response) => {
//                     const mdlCabezera = JSON.parse(response.dataResponse)
//                     for (let i = 0; i < mdlCabezera.Table.length; i += 1) {
//                         let padreArray = mdlCabezera.Table[i]
//                         if (padreArray.IdPadre == 0) {
//                             const padre = `<li class="nav-item">
//                                             <a class="nav-link ${padreArray.Id}">
//                                                 <i class="nav-icon fas fa-folder"></i>
//                                                 <p>
//                                                     ${padreArray.Nombre}
//                                                     <i class="right fas fa-angle-right"></i>
//                                                     <input type="hidden" id="${padreArray.Id}" value="${padreArray.Id}" />
//                                                 </p>
//                                             </a>`
//                             const childrenHTML = `<ul class="nav nav-treeview ${padreArray.Identificador}"></ul>`
//                             const li = '</li>'
//                             $(`#${moduleArray.Clave}`).append(padre + childrenHTML + li)
//                         }
//                         let idPadre = $(`#${padreArray.Id}`).val();
//                         generaChildren(idPadre)
//                         function generaChildren(id) {
//                             for (let i = 0; i < mdlCabezera.Table1.length; i += 1) {
//                                 if (id == mdlCabezera.Table1[i].IdPadre) {
//                                     let children = `<li class="nav-item" style="padding-left: 1rem;">
//                                                         <a href="${mdlCabezera.Table1[i].Programa}" class="nav-link">
//                                                             <i class="fas fa-folder-open nav-icon"></i>
//                                                             <p style="font-size: 12px">${mdlCabezera.Table1[i].Nombre}</p>
//                                                         </a>
//                                                     </li>`
//                                     $(`.${padreArray.Identificador}`).append(children);
//                                 }
//                             }
//                         }
//                     }
//                 })
//             }
//         }
//         generaMDL()
//         $('#updateAccess').click(() => {
//             // window.location.reload()
//         })
//     })
// })