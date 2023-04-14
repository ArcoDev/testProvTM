<?php
    date_default_timezone_set("America/Mexico_City");
    $modulo = $_POST['modulo'];
    $idArchivo = $_POST['nomDocto'];
    $añoActual = date('Y');
    $mesActual = date('m');
    $directorioServer = "\\\\192.168.1.2\\docs_tmsystem\\".$modulo.'\\'.$añoActual.'\\'.$mesActual.'\\';
    $file = $_FILES['filePod'];
    $data = $file['name'];
    $file = $_FILES['filePod'];
    $nomTemporal = $file['tmp_name'];
    $data = $file['name'] = $idArchivo.'.pdf';
    if($data == '') {
        echo json_encode(false);
    } else {
        if(!mkdir($directorioServer, 077, true)){
            move_uploaded_file($nomTemporal, $directorioServer.$data);
        }else {
            move_uploaded_file($nomTemporal, $directorioServer.$data);
        }
    }