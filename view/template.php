<?php 
    include_once './view/routes/routes.php'; 
    include_once './view/scripts/globals.php';
    include_once './view/scripts/devExpress.php';
    if(isset($_GET['ruta'])) {
        Router::getScript($_GET['ruta']);
    }
?>
    <body class="hold-transition sidebar-mini dx-viewport layout-fixed" id="body">
        <!-- Site wrapper -->
        <div class="wrapper">
            <!-- Navbar -->
            <nav class="main-header navbar navbar-expand navbar-light fixed-top">
                <?php include_once './view/includes/navbar-top.php'; ?>
            </nav>
            <!-- /.navbar -->

            <!-- Main Sidebar Container -->
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <?php include_once './view/includes/navbar-left.php'; ?>
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper" style="padding-top: 3rem;">
                <!-- Main content -->
                <section class="content">
                    <span class="head-title"></span>
                    <?php
                        if(isset($_GET['ruta'])){
                            Router::getView($_GET['ruta']);
                        } else {
                            echo '<div id="bot" class="text-center"><img src="./view/assets/img/boti-light.gif" class="img-fluid" style="width: 650px"></div>';
                        }
                    ?>
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
<?php include_once './view/includes/footer.php'; ?>