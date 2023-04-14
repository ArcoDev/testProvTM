<div class="modal fade" id="loadFile" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header card-outline card-primary dragable_touch">
                <h5 class="modal-title">Agregar Documentos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formFile" enctype="multipart/form-data">
                <div class="modal-body">
                    <fieldset class="border py-3 px-2 rounded">
                        <legend class="float-none w-auto">Datos Generales</legend>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex align-items-center">
                                    <label class="m-0" for="lookupCatPod" style="flex: 0 0 4.3rem;">Tipo</label>
                                    <div id="lookupCatTipoPod" class="w-100 m-0" style="flex: 1;"></div>
                                </div>
                                <div class="d-flex align-items-center mt-2">
                                    <label class="m-0" for="textBoxNombre" style="flex: 0 0 4.3rem;">Nombre</label>
                                    <div id="textBoxNombre" class="w-100" style="flex: 1;"></div>
                                </div>
                                <div id="textAreaTexto" class="w-100 mt-2"></div>
                                <input type="hidden" name="modulo" id="modulo">
                                <input type="hidden" name="nomDocto" id="nomDocto">
                                <input type="hidden" name="extension" id="extension">
                                <div class="form-group mt-4 w-100">
                                    <label for="filePod">Archivo Adjunto</label>
                                    <input type="file" name="filePod" id="filePod" accept="application/pdf">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="saveFile" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>