<?php 

$nombre_temporal = $_FILES['documento']['tmp_name'];
$nombre_inicial = $_FILES['documento']['name'];
$inserted_id = $_POST['insertedID'];
$empresa = $_POST['empresa'];
$extension = explode('.', $nombre_inicial);
$documento = $inserted_id . '.' . end($extension);
$año_actual = date('Y');
$mes_actual = date('m');

if ($empresa == 'TTF') {
	$directorio = "\\\\192.168.1.2\\docs_tmsystem\\TTF_Clientes\\".$documento;
} else if ($empresa == 'TMT') {
	// Aquí el directorio
} else if ($empresa == 'TMS') {
	// Aquí el directorio
} else if ($empresa == 'TML') {
	// Aquí el directorio
} else {
	echo 'Error al recibir la empresa';
}

if ($_FILES['documento']['name'] != '') {
	move_uploaded_file($nombre_temporal, $directorio);
}

?>