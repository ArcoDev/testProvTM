<?php 
    include_once './view/scripts/globals.php'; 
    include_once './view/scripts/login-ajax.php';
?>

<style>
    .bg-login {
        width: 100%;
        height: 100vh;
        background-image: url('./view/assets/img/bg-login.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>

<div class="container-fluid login-box d-flex align-items-center justify-content-center bg-login">
    <div class="row align-content-center justify-content-center card-form">
        <div class="col-xs-7 col-md-12 col-lg-7">
            <div class="card login-form py-5">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <h2 class="card-title">Bienvenido a</h2>
                        <h3>TM<span>System.</span></h3>
                    </div>
                    <hr>
                    <form method="POST">
                        <div class="form-group my-4">
                            <label class="text-white" for="user">Usuario</label>
                            <input type="text" name="user" id="user" class="form-control"
                                placeholder="Ingresa tu usuario">
                        </div>
                        <div class="form-group my-4">
                            <label class="text-white" for="password">Password</label>
                            <input type="password" name="pw" id="pw" class="form-control" autocomplete="off"
                                placeholder="Ingresa tu contraseña">
                        </div>
                        <input type="hidden" name="token" id="token">
                        <button id="send" class="btn btn-primary mt-3">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>