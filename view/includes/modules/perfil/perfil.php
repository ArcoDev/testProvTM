<div class="row px-3">
    <div class="col-12">
        <h1 class="head-title py-0 pl-1 text-bold">Mi Perfil</h1>
    </div>
    <div class="col-12 mt-4">
        <fieldset class="col-12 border rounded p-2">
            <legend class="float-none w-auto text-bold text-uppercase">
                <i class="fas fa-key text-warning"></i>
                Datos de acceso
            </legend>
            <div class="row">
                <div class="col-sm-12 col-md-4 col-xl-3">
                    <div class="form-group flex-grow-1">
                        <label for="">Usuario:</label>
                        <div class="w-100" id="textBoxUsuario"></div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-3">
                    <div class="form-group flex-grow-1">
                        <label for="">Contraseña:</label>
                        <div class="w-100" id="textBoxPassword"></div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-3 pt-4 mt-1">
                    <div id="btnCambiarPassword"></div>
                </div>
                <div class="col-12 d-flex justify-content-end">
                    <div id="btnVerLicitaciones" class="animate__animated animate__pulse animate__infinite animate__slow mr-2 mb-2"></div>
                </div>
            </div>
        </fieldset>
        <fieldset id="seccionProveedor" class="col-12 border rounded p-2 mt-3">
            <form id="addProveedor">
                <legend class="float-none w-auto text-bold text-uppercase">
                    <i class="fa fa-book text-warning"></i>
                    Datos Generales
                </legend>
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Nombre Vendedor:</label>
                            <div class="w-100" id="textBoxNombreVendedor"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Proveedor:</label>
                            <div class="w-100" id="textBoxProveedor"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Teléfono:</label>
                            <div class="w-100" id="textBoxTelefono"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Correo Electronico:</label>
                            <div class="w-100" id="textBoxCorreo"></div>
                        </div>
                    </div>
                    <!-- <div class="col-sm-12 col-md-8 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Forma de pago:</label>
                            <div class="w-100 m-0" id="lookUpCatFormaPago"></div>
                        </div>
                    </div> -->
                    <div class="col-sm-12 col-md-12 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Forma De Pago:</label>
                            <div class="w-100 m-0" id="tagListPago"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-xl-3">
                        <div class="form-group flex-grow-1">
                            <label for="">Presencia en:</label>
                            <div class="w-100 m-0" id="tagListAgencia"></div>
                        </div>
                    </div>
                    <div id="xmlPago" class="d-none"></div>
                    <div id="xmlAgencia" class="d-none"></div>
                    <input type="hidden" id="Id" value="0">
                </div>
                <div class="col-12 d-flex justify-content-end my-3" style="gap: 0.5rem;">
                    <div id="btnLimpiar"></div>
                    <div id="btnSaveProv"></div>
                </div>
            </form>
        </fieldset>
    </div>
</div>