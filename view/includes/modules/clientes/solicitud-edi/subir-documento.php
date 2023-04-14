<?php 

$nombre_temporal = $_FILES['documento']['tmp_name'];
$nombre_inicial = $_FILES['documento']['name'];
$inserted_id = $_POST['insertedID'];
$extension = explode('.', $nombre_inicial);
$documento = $inserted_id . '.' . end($extension);
$directorio = "\\\\192.168.1.2\\docs_tmsystem\\EDI_SolicitudIntegracion\\".$documento;

if (move_uploaded_file($nombre_temporal, $directorio)) {
	echo 'archivo subido';
} else {
	echo 'archivo no subido';
}

?>