<div class="actions d-flex mb-3 mt-3 bd-highlight w-100" style="gap: 0.6rem; margin-left: 0.3rem!important;">
    <span title="Agregar Nuevo">
        <button id="reset" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#add">
            <i class="fa fa-plus"></i>
        </button>
    </span>
    <span id="modalID" title="Editar Registro">
        <button id="btnUpdate" type="button" class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#add" disabled>
            <i class="fa fa-pencil"></i>
        </button>
    </span>
    <div class="dropdown ml-auto bd-highlight">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropUpdateGrid" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="fa-solid fa-arrows-rotate"></i>
            Actualizar
        </button>
        <div class="dropdown-menu" aria-labelledby="dropUpdateGrid">
            <li style="cursor: pointer;"><a class="dropdown-item" id="consulta">Consulta Activos</a></li>
            <li style="cursor: pointer;"><a class="dropdown-item" id="consultaTodo">Consulta Todos</a></li>
        </div>
    </div>
</div>