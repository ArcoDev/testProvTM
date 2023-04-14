<div class="row p-2 pt-0">
    <div class="col-12">
        <h3 class="text-bold text-uppercase">Licitación <span class="text-bold text-blue" id="numLicitacion">#</span>
        </h3>
        <div id="lookUpEditLicitaciones"></div>
    </div>
    <div class="col-12 w-100 d-flex justify-content-end mt-4">
        <div class="alert-success text-bold px-4 py-2 rounded shadow-sm d-flex animate__animated animate__pulse animate__infinite animate__slow d-none"
            style="gap: 0.5rem;" id="alert">
            <i class="fas fa-door-open"></i>
            <p class="mb-0" id="estatus"></p>
        </div>
    </div>
    <div class="col-12 row mt-3 pr-0">
        <div class="col-sm-12 col-md-6 col-xl-4 pr-0">
            <div class="form-group">
                <label for="dateBoxCierreLicitacion">Fecha Cierre:</label>
                <div class="m-0 w-100" id="dateBoxCierreLicitacion"></div>
            </div>
        </div>
        <!-- <div class="col-sm-12 col-md-6 col-xl-2 pr-0">
            <div class="form-group">
                <label for="numberBoxLitrosPedidos">Litros Totales:</label>
                <div class="w-100" id="numberBoxLitrosPedidos"></div>
            </div>
        </div> -->
        <div class="col-sm-12 col-md-6 col-xl-2 pr-0">
            <div class="form-group">
                <label for="numberBoxOfertadores">Proveedores Con Oferta:</label>
                <div class="w-100" id="numberBoxOfertadores"></div>
            </div>
        </div>
        <div class="col-sm-12 col-md-6 col-xl-2 pr-0">
            <div class="form-group">
                <label for="numberBoxOfertadoresPendientes">Ofertadores Pendientes:</label>
                <div class="w-100" id="numberBoxOfertadoresPendientes"></div>
            </div>
        </div>
        <input type="hidden" id="idLicitacion">
        <input type="hidden" id="idProveedor">
    </div>
    <div class="col-12">
        <div class="row mb-5">
            <div class="col-12 d-flex flex-column flex-md-row flex-lg-row justify-content-end mb-2"
                style="gap: 0.5rem;">
                <div id="btnLimpiar"></div>
                <div id="btnCalcularTotal"></div>
                <div id="btnEnviarPuja"></div>
            </div>
            <div class="col-12 d-flex justify-content-end mt-2">
                <div class="form-group">
                    <label for="numberBoxTotalLitros">Litros Totales:</label>
                    <div id="numberBoxTotalLitros" class="mb-2" style="font-size: 2rem;"></div>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-center align-items-center" style="height: 450px;"
                id="textAgencia">
                <label class="animate__animated animate__zoomInDown animated textAgencia">Agencias
                    <span class="text-bold">TM</span>
                </label>
            </div>
            <div class="col-sm-12 col-md-6 col-xl-6 d-none" id="cajaTrc">
                <fieldset class="rounded border pb-3 px-2 m-0">
                    <legend class="text-bold text-success float-none w-auto p-2">Torreón</legend>
                    <label for="">Litros Solicitados:</label>
                    <div id="numberBoxLtsTorreon"></div>
                    <input type="hidden" id="ltsTorreon">
                    <label for="tagListTrc" class="mt-2">Tipo de pago:</label>
                    <div class="w-100 m-0" id="tagListTrc"></div>
                    <div class="row mt-2">
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxContadoTrc" class="mt-2">Precio por litro (Contado):</label>
                            <div id="numberBoxContadoTrc"></div>
                            <!-- <div class="d-flex mt-2" style="gap: 0.5rem;">
                                <label for="numberBoxIVATrcContado" class="mt-2">IVA:</label>
                                <div id="numberBoxIVATrcContado" class="flex-grow-1"></div>
                            </div> -->
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxAmeTrc" class="mt-2">Precio por litro (America Express):</label>
                            <div id="numberBoxAmeTrc"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito4Trc" class="mt-2">Precio por litro (Credito 4 Días):</label>
                            <div id="numberBoxCredito4Trc"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito7Trc" class="mt-2">Precio por litro (Credito 7 Días):</label>
                            <div id="numberBoxCredito7Trc"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxPrepagoTrc" class="mt-2">Precio por litro (Prepago):</label>
                            <div id="numberBoxPrepagoTrc"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxIVATrc" class="mt-2">IVA:</label>
                            <div id="numberBoxIVATrc" class="flex-grow-1"></div>

                        </div>
                    </div>
                </fieldset>
            </div>
            <input type="hidden" id="idAgenciaTrc" value="0">
            <div class="d-none" id="xmlTrc"></div>
            <div class="col-sm-12 col-md-6 col-xl-6 d-none" id="cajaNvoLaredo">
                <fieldset class="rounded border pb-3 px-2 m-0">
                    <legend class="text-bold text-danger float-none w-auto p-2">Nuevo Laredo</legend>
                    <label for="">Litros Solicitados:</label>
                    <div id="numberBoxLtsNvoLaredo"></div>
                    <input type="hidden" id="ltsNvoLaredo">
                    <label for="tagListNvoLaredo" class="mt-2">Tipo de pago:</label>
                    <div id="tagListNvoLaredo" class="w-100 m-0"></div>
                    <div class="row mt-2">
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxContadoNvoLaredo" class="mt-2">Precio por litro (Contado):</label>
                            <div id="numberBoxContadoNvoLaredo"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxAmeNvoLaredo" class="mt-2">Precio por litro (America Express):</label>
                            <div id="numberBoxAmeNvoLaredo"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito4NvoLaredo" class="mt-2">Precio por litro (Credito 4
                                Días):</label>
                            <div id="numberBoxCredito4NvoLaredo"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito7NvoLaredo" class="mt-2">Precio por litro (Credito 7
                                Días):</label>
                            <div id="numberBoxCredito7NvoLaredo"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxPrepagoNvoLaredo" class="mt-2">Precio por litro (Prepago):</label>
                            <div id="numberBoxPrepagoNvoLaredo"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxIVANvoLaredo" class="mt-2">IVA:</label>
                            <div id="numberBoxIVANvoLaredo" class="flex-grow-1"></div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <input type="hidden" id="idAgenciaNvoLaredo" value="0">
            <div class="d-none" id="xmlNvoLaredo"></div>
            <div class="col-sm-12 col-md-6 col-xl-6 d-none" id="cajaQrt">
                <fieldset class="rounded border pb-3 px-2 m-0">
                    <legend class="text-bold text-indigo float-none w-auto p-2">Queretaro</legend>
                    <label for="">Litros Solicitados:</label>
                    <div id="numberBoxLtsQrt"></div>
                    <input type="hidden" id="ltsQrt">
                    <label for="tagListQrt" class="mt-2">Tipo de pago:</label>
                    <div id="tagListQrt" class="w-100 m-0"></div>
                    <div class="row mt-2">
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxContadoQrt" class="mt-2">Precio por litro (Contado):</label>
                            <div id="numberBoxContadoQrt"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxAmeQrt" class="mt-2">Precio por litro (America Express):</label>
                            <div id="numberBoxAmeQrt"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito4Qrt" class="mt-2">Precio por litro (Credito 4 Días):</label>
                            <div id="numberBoxCredito4Qrt"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito7Qrt" class="mt-2">Precio por litro (Credito 7 Días):</label>
                            <div id="numberBoxCredito7Qrt"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxPrepagoQrt" class="mt-2">Precio por litro (Prepago):</label>
                            <div id="numberBoxPrepagoQrt"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxIVAQrt" class="mt-2">IVA:</label>
                            <div id="numberBoxIVAQrt" class="flex-grow-1"></div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <input type="hidden" id="idAgenciaQrt" value="0">
            <div class="d-none" id="xmlQrt"></div>
            <div class="col-sm-12 col-md-6 col-xl-6 d-none" id="cajaManz">
                <fieldset class="rounded border pb-3 px-2 m-0 ">
                    <legend class="text-bold text-warning float-none w-auto p-2">Manzanillo</legend>
                    <label for="">Litros Solicitados:</label>
                    <div id="numberBoxLtsManz"></div>
                    <input type="hidden" id="ltsManz">
                    <label for="tagListManz" class="mt-2">Tipo de pago:</label>
                    <div id="tagListManz" class="w-100 m-0"></div>
                    <div class="row mt-2">
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxContadoManz" class="mt-2">Precio por litro (Contado):</label>
                            <div id="numberBoxContadoManz"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxAmeManz" class="mt-2">Precio por litro (America Express):</label>
                            <div id="numberBoxAmeManz"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito4Manz" class="mt-2">Precio por litro (Credito 4 Días):</label>
                            <div id="numberBoxCredito4Manz"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito7Manz" class="mt-2">Precio por litro (Credito 7 Días):</label>
                            <div id="numberBoxCredito7Manz"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxPrepagoManz" class="mt-2">Precio por litro (Prepago):</label>
                            <div id="numberBoxPrepagoManz"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxIVAManz" class="mt-2">IVA:</label>
                            <div id="numberBoxIVAManz" class="flex-grow-1"></div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <input type="hidden" id="idAgenciaManz" value="0">
            <div class="d-none" id="xmlManz"></div>
            <div class="col-sm-12 col-md-6 col-xl-6 d-none" id="cajaMty">
                <fieldset class="rounded border pb-3 px-2 m-0">
                    <legend class="text-bold text-info float-none w-auto p-2">Monterrey</legend>
                    <label for="">Litros Solicitados:</label>
                    <div id="numberBoxLtsMty"></div>
                    <input type="hidden" id="ltsMty">
                    <label for="tagListMty" class="mt-2">Tipo de pago:</label>
                    <div id="tagListMty" class="w-100 m-0"></div>
                    <div class="row mt-2">
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxContadoMty" class="mt-2">Precio por litro (Contado):</label>
                            <div id="numberBoxContadoMty"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxAmeMty" class="mt-2">Precio por litro (America Express):</label>
                            <div id="numberBoxAmeMty"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito4Mty" class="mt-2">Precio por litro (Credito 4 Días):</label>
                            <div id="numberBoxCredito4Mty"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxCredito7Mty" class="mt-2">Precio por litro (Credito 7 Días):</label>
                            <div id="numberBoxCredito7Mty"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxPrepagoMty" class="mt-2">Precio por litro (Prepago):</label>
                            <div id="numberBoxPrepagoMty"></div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 mt-1">
                            <label for="numberBoxIVAMty" class="mt-2">IVA:</label>
                            <div id="numberBoxIVAMty" class="flex-grow-1"></div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <input type="hidden" id="idAgenciaMty" value="0">
            <div class="d-none" id="xmlMty"></div>
        </div>
    </div>
</div>