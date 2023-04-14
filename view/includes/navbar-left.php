<?php
    include_once './view/includes/post.php';
    $nameUser = $_SESSION['tm']['user'];
    $tokenUser = $_SESSION['tm']['token'];
?>
<!-- Brand Logo -->
<a class="brand-link text-center text-decoration-none">
    <!-- <img src="./view/assets/img/transmontes.jpg" alt="Logo TM System" class="brand-image img-circle elevation-3"
        style="opacity: .8"> -->
    <h2 class="brand-text font-weight-light title-tm text-uppercase"><span>PORTAL</span>TM.</h2>
</a>

<!-- Sidebar -->
<div class="sidebar">
    <div class="user-panel mt-3 pb-3 d-flex">
        <div class="image">
            <img src="./view/assets/img/user.png" class="elevation-2" alt="User Image brand-image img-circle" width="30"
                height="30">
        </div>
        <div class="info p-0">
            <div class="dropdown">
                <button onclick="this.blur()" class="btn dropdown-toggle d-flex align-items-center p-0 py-1"
                    type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <p id="userActive" class="m-0 mx-2" style="color: #ffffffcc"><?php echo $nameUser ?></p>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item d-flex align-items-center" href="?ruta=Perfil">
                        <i class="fa-solid fa-gear"></i>
                        <p class="m-0 mx-2">Mi Perfil</p>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="./destroySession.php">
                        <i class="fa-solid fa-door-closed"></i>
                        <p class="m-0 mx-2">Cerrar Sesion</p>
                    </a>
                </div>
            </div>
            <input type="hidden" id="valToken" name="delSession" value="<?php echo $tokenUser ?>">
            <input type="hidden" id="perId" name="perId">
        </div>
    </div>
    <!-- SidebarSearch Form -->
    <div class="form-inline my-3">
        <div class="input-group" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar" type="search" placeholder="Buscar" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-sidebar">
                    <i class="fas fa-search fa-fw"></i>
                </button>
            </div>
        </div>
    </div>
    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
            data-accordion="false" id="modules">
            <!-- Contenido cargado desde ajax -->
            <li class="nav-item mb-2">
                <a href="#" class="w-100 nav-link active">
                    <img width="30" height="30" src="./view/assets/img/2.svg" alt="Icon Modules">
                    <p>
                        Proveedores
                        <i class="right fas fa-angle-right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item mt-2">
                        <a href="#" class="w-100 nav-link">
                            <i class="fas fa-gas-pump nav-icon"></i>
                            <p>
                                Diesel
                                <i class="right fas fa-angle-right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="pl-3 nav-item">
                                <a href="?ruta=Pujar-Licitacion" class="w-100 nav-link">
                                    <i class="fas fa-folder-open nav-icon"></i>
                                    <p>Pujar Licitación</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--Fin Diesel -->
                </ul>
            </li>
            <!-- <li class="nav-item mb-2">
                <a href="#" class="w-100 nav-link active">
                    <img width="30" height="30" src="./view/assets/img/clientesTM.svg" alt="Icon Modules">
                    <p>
                        Clientes
                        <i class="right fas fa-angle-right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <a href="SolicitudEDI" class="w-100 nav-link">
                            <i class="fas fa-folder-open nav-icon"></i>
                            <p>Solicitud Integración EDI</p>
                        </a>
                    </li>
                    <li class="nav-item mt-2">
                        <a href="#" class="w-100 nav-link">
                            <img width="30" height="30" src="./view/assets/img/viajes.svg" alt="Icon Modules">
                            <p>
                                Viajes
                                <i class="right fas fa-angle-right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="pl-3 nav-item">
                                <a href="CentralOfertas" class="w-100 nav-link">
                                    <i class="fas fa-folder-open nav-icon"></i>
                                    <p>Ofertas</p>
                                </a>
                            </li>
                            <li class="pl-3 nav-item">
                                <a href="CentralViajes" class="w-100 nav-link">
                                    <i class="fas fa-folder-open nav-icon"></i>
                                    <p>Rutas</p>
                                </a>
                            </li>
                            <li class="pl-3 nav-item">
                                <a href="CentralTransmisiones" class="w-100 nav-link">
                                    <i class="fas fa-folder-open nav-icon"></i>
                                    <p>Transmisiones</p>
                                </a>
                            </li>
                        </ul>
                    </li> -->
                    <!--Fin Diesel -->
                </ul>
            </li>
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->

<script>
    let url = 'https://201.151.59.194:449/'
    let usuario = $('#userActive').text()
    let valToken = $('#valToken').val()

    let data = `<clsParametros>
                    <Usuario>${usuario}</Usuario>
                    <Opcion>CP</Opcion>
                </clsParametros>`
    let consultaPermiso = loadfuncionAjax(`${url}OperacionesWEB`, 'LoginProveedores', data, valToken, false)
    let perId = consultaPermiso.Table[0].PER_Id
    
    $('#perId').val(perId)
</script>   