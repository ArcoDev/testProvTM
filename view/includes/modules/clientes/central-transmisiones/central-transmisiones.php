<p class='head-title py-0'>Transmisiones</p>
<div class='row p-3 mb-2'>
    <div class="col-lg-8">
        <form method="post" class="mt-3" id="consultarLlantas">
            <div class="row">
                <div class="col-lg-4">
                    <label for="FechaInicio" class="mt-md-auto mt-2">Fecha Inicio <b class="text-danger">*</b></label>
                    <div id="dateBoxFechaInicio" class="w-100 m-0"></div>
                </div>
                <div class="col-lg-4">
                    <label for="FechaFin" class="mt-md-auto mt-2">Fecha Fin <b class="text-danger">*</b></label>
                    <div id="dateBoxFechaFin" class="w-100 m-0"></div>
                </div>
                <div class="col-lg-4">
                    <label for="Referencia" class="mt-md-auto mt-2">Referencia <b class="text-danger">*</b></label>
                    <div id="textBoxReferencia"></div>
                </div>
            </div>
            <div id="consultar" class="col-sm-auto col-12 mt-3 mb-md-0 mb-4"></div>
        </form>
    </div>
    <div class="col-lg-4"></div>
</div>
<div class='row p-3'>
    <div class="col-lg-12">
        <div id="dataGridTransmisiones" style="overflow-x: hidden;"></div>
    </div>
</div>
<?php include_once './view/includes/modules/clientes/central-transmisiones/modal.php'; ?>