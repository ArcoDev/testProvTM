<!--Modal Pendiente con ...-->
<div class='modal fade' id='add' tabindex='-1' aria-labelledby='modelTitleId' aria-hidden='True'>
    <div class='modal-dialog modal-fullscreen'  role='document'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='addLabel'></h5>
                <button type ='button' Class='close' data-bs-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            </div>
            <div class='modal-body body-fullscreen'>
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle col-md-auto col-12 mt-md-auto mt-2 mr-3 mb-md-auto mb-3" type="button" id="extras" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="far fa-compass mr-1"></i>
                            Extras
                        </button>
                        <div class="dropdown-menu ml-3" aria-labelledby="dropUpdateGrid"> 
                            <li style="cursor: pointer;"><a class="dropdown-item" id="btnSolicitar"><i class="fas fa-send fa-md mr-1"></i> Solicitar</a></li>
                            <li style="cursor: pointer;"><a class="dropdown-item" id="btnProcesar"><i class="fas fa-cog fa-md mr-1"></i> Procesar</a></li>
                            <li style="cursor: pointer;"><a class="dropdown-item" id="btnComplementar"><i class="fas fa-edit fa-md mr-1"></i> Complementar</a></li>
                            <li style="cursor: pointer;"><a class="dropdown-item" id="btnPruebas"><i class="fas fa-clipboard-check fa-md mr-1"></i> Pruebas</a></li>
                            <li style="cursor: pointer;"><a class="dropdown-item" id="btnFinalizar"><i class="fas fa-check fa-md mr-1"></i> Finalizar</a></li>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 text-right">
                    <p id="estatusSolicitud" class='head-title'>ESTATUS: BORRADOR</p>
                </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <fieldset class="rounded border pb-4 px-2 pt-0">
                            <legend class="float-none w-auto p-2">CREDENCIALES</legend>
                            <div class="row">
                                <div class="col-md-6">
                                    <fieldset class="rounded border pb-4 px-2 pt-0">
                                        <legend class="float-none w-auto p-2" style="font-size: 15px !important;">PRODUCTIVO</legend>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex justify-content-start align-items-center pt-1 mb-2">
                                                    <label for='switch-FTP' class="m-0">FTP</label>
                                                    <div id='switch-FTP' class="mx-2"></div>
                                                    <label for='switch-SFTP' class="m-0">SFTP</label>
                                                    <div id='switch-SFTP' class="mx-2"></div>
                                                    <label class="ml-2"><b class="text-danger">*</b></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="URLProductivo" class="mt-2">URL <b class="text-danger">*</b></label>
                                                <div id="textBoxURLProductivo"></div>
                                                <label for="From" class="mt-2">From <b class="text-danger">*</b></label>
                                                <div id="textBoxFromProductivo"></div>
                                                <label for="Usuario" class="mt-2">Usuario <b class="text-danger">*</b></label>
                                                <div id="textBoxUsuarioProductivo"></div>
                                                <label for="InterChangeId" class="mt-2">InterChangeId <b class="text-danger">*</b></label>
                                                <div id="textBoxInterChangeId"></div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="PuertoProductivo" class="mt-2">Puerto <b class="text-danger">*</b></label>
                                                <div id="numberBoxPuertoProductivo"></div>
                                                <label for="To" class="mt-2">To <b class="text-danger">*</b></label>
                                                <div id="textBoxToProductivo"></div>
                                                <label for="Contraseña" class="mt-2">Contraseña <b class="text-danger">*</b></label>
                                                <div id="textBoxContrasenaProductivo"></div>
                                                <label for="InterCualifier" class="mt-2">InterCualifier <b class="text-danger">*</b></label>
                                                <div id="textBoxInterCualifier"></div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-md-6">
                                    <fieldset class="rounded border pb-4 px-2 pt-0">
                                        <legend class="float-none w-auto p-2" style="font-size: 15px !important;">PRUEBA</legend>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex justify-content-start align-items-center pt-1 mb-2">
                                                    <label for='switch-FTP' class="m-0">FTP</label>
                                                    <div id='switch-TestFTP' class="mx-2"></div>
                                                    <label for='switch-SFTP' class="m-0">SFTP</label>
                                                    <div id='switch-TestSFTP' class="mx-2"></div>
                                                    <label class="ml-2"><b class="text-danger">*</b></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="URLTest" class="mt-2">URL <b class="text-danger">*</b></label>
                                                <div id="textBoxURLTest"></div>
                                                <label for="From" class="mt-2">From <b class="text-danger">*</b></label>
                                                <div id="textBoxFromTest"></div>
                                                <label for="Usuario" class="mt-2">Usuario <b class="text-danger">*</b></label>
                                                <div id="textBoxUsuarioTest"></div>
                                                <label for="InterChangeIdTest" class="mt-2">InterChangeId <b class="text-danger">*</b></label>
                                                <div id="textBoxInterChangeIdTest"></div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="PuertoTest" class="mt-2">Puerto <b class="text-danger">*</b></label>
                                                <div id="numberBoxPuertoTest"></div>
                                                <label for="To" class="mt-2">To <b class="text-danger">*</b></label>
                                                <div id="textBoxToTest"></div>
                                                <label for="Contraseña" class="mt-2">Contraseña <b class="text-danger">*</b></label>
                                                <div id="textBoxContrasenaTest"></div>
                                                <label for="InterCualifierTest" class="mt-2">InterCualifier <b class="text-danger">*</b></label>
                                                <div id="textBoxInterCualifierTest"></div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>  
                        </fieldset>
                        <fieldset class="rounded border pb-4 px-2 mt-2 pt-0">
                            <legend class="float-none w-auto p-2">DOCUMENTACIÓN</legend>
                            <div class="row">
                                <div class="col-md-3">
                                    <fieldset class="rounded border pb-4 px-3 pt-0 pl-2" style="height: 495px !important;">
                                        <legend class="float-none w-auto p-2" style="font-size: 15px !important;">OPCIONES</legend>
                                        <label for="Transmision" class="mt-2">Transmisión</label>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <label for='switch-210' class="m-0">210</label>
                                            <div id='switch-210' class="mx-2"></div>
                                            <label for='switch-990' class="m-0">990</label>
                                            <div id='switch-990' class="mx-2"></div>
                                            <label for='switch-214' class="m-0">214</label>
                                            <div id='switch-214' class="mx-2"></div>
                                        </div>
                                        <label for="Recepcion" class="mt-3">Recepción</label>
                                        <div class="d-flex justify-content-start align-items-center mb-2">
                                            <label for='switch-997' class="m-0">997</label>
                                            <div id='switch-997' class="mx-2"></div>
                                            <label for='switch-204' class="m-0">204</label>
                                            <div id='switch-204' class="mx-2"></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label for="TiempoOferta" class="mt-3">Tiempo aceptar oferta (minutos) <b class="text-danger">*</b></label>
                                                <div id="numberBoxTiempoOferta"></div>
                                                <label for="IntervaloX6" class="mt-2">Intervalo X6 (minutos)</label>
                                                <div id="numberBoxIntervaloX6"></div>
                                                <label for="IntervaloETA" class="mt-2">Intervalo ETA (minutos)</label>
                                                <div id="numberBoxIntervaloETA"></div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-md-6">
                                    <fieldset class="rounded border pb-4 px-2 pt-0">
                                        <legend class="float-none w-auto p-2" style="font-size: 15px !important;">TIPOS DE 214 <b class="text-danger d-none" id="mandatory214">*</b></legend>
                                        <div id="grid214" style="overflow-x: hidden;" class="mt-1"></div>
                                    </fieldset>
                                </div>
                                <div class="col-md-3">
                                    <fieldset class="rounded border pb-4 px-2 pt-0">
                                        <legend class="float-none w-auto p-2" style="font-size: 15px !important;">TIPOS DE 210 <b class="text-danger d-none" id="mandatory210">*</b></legend>
                                        <div id="list210" style="overflow-x: hidden;" class="mt-1"></div>
                                    </fieldset>
                                </div>
                            </div>
                        </fieldset>
                        <div class="row mb-5 mt-3">
                            <div class="col-md-12">
                                <ul class="nav nav-tabs mt-3">
                                    <li class="nav-item">
                                        <a id="btnEspecificaciones" class="nav-link active" role="tab" data-bs-toggle="tab" href="#tab_especificaciones"><i class="fas fa-edit mr-1"></i> Especificaciones</a>
                                    </li>
                                    <li class="nav-item">
                                        <a id="btnContactos" class="nav-link" role="tab" data-bs-toggle="tab" href="#tab_contactos"> <i class="fas fa-users mr-1"></i>Contactos <b class="text-danger">*</b></a>
                                    </li>
                                    <li class="nav-item">
                                        <a id="btnDocumentos" class="nav-link" role="tab" data-bs-toggle="tab" href="#tab_documentos"><i class="fas fa-file mr-1"></i> Documentos</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="tab_especificaciones" role="tabpanel" class="tab-pane active">
                                        <div class="row mt-3">
                                            <div class="col-sm-12">
                                                <div id="gridEspecificaciones" class="mt-3" style="overflow-x: hidden;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab_contactos" role="tabpanel" class="tab-pane">
                                        <div class="row mt-3">
                                            <div class="col-sm-12">
                                                <div id="gridContactos" class="mt-3" style="overflow-x: hidden;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab_documentos" role="tabpanel" class="tab-pane">
                                        <div class="row mt-3">
                                            <div class="col-sm-12">
                                                <div class="d-flex justify-content-start align-items-center mt-2">
                                                    <button id="btnAgregarDocto" class="btn btn-success" title="Agregar documento" disabled><i class="fas fa-plus"></i></button>
                                                    <button id="btnDescargarDocto" class="btn btn-primary ml-2" title="Descargar documento" disabled><i class="fas fa-download"></i></button>
                                                </div>
                                                <div id="gridDocumentos" class="mt-3" style="overflow-x: hidden;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer pb-0'>
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col order-2">
                            <div class="form-group d-flex gap-1 w-100 justify-content-end">
                                <button id="btnGuardar" class="btn btn-success mr-2">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                        <div class="col order-1">        
                            <div class="d-flex gap-1 w-100 justify-content-start">
                                <p class="mb-2"><b class="text-danger">*</b> <b>campos obligatorios</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class='modal fade' style="background-color: rgba(0, 0, 0, 0.5);" id='addDocument' tabindex='-1' aria-labelledby='modelTitleId' aria-hidden='True'>
    <div class='modal-dialog modal-dialog-centered'  role='document'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title'>Subir Documento</h5>
                <button type ='button' Class='close' data-bs-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            </div>
            <div class='modal-body'>
                <form method="post" id="formAddDocument" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-12">
                            <fieldset class="border pb-3 px-2 m-0">
                                <legend class="float-none w-auto p-2">General</legend>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <input type="hidden" name="insertedID" id="insertedID">
                                        <label for='TipoDocumento' class="mt-2">Tipo Documento <b class="text-danger">*</b></label>
                                        <div id="lookUP_TipoDocumento" class="w-100 m-0"></div>
                                        <label for='Archivo' class="mt-2">Documento <b class="text-danger">*</b></label>
                                        <input type="file" id="documento" name="documento" class="form-control">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div class="row justify-content-end mt-4">
                        <div class="col-md-12 text-right">
                            <button type="submit" class="btn btn-success">Guardar</button>
                            <button type="button" class="btn btn-secondary ml-1" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>