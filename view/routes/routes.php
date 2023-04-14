<?php 
    class Router {
        public static function getView($ruta) {
            switch($ruta){
                case 'Pujar-Licitacion':
                    require_once './view/includes/modules/pujar/pujar.php';
                    break;
                case 'Perfil':
                    require_once './view/includes/modules/perfil/perfil.php';
                    break;
                //Clientes
                case 'SolicitudEDI':
                    require_once './view/includes/modules/clientes/solicitud-edi/solicitud-edi.php';
                    break;
                case 'CentralOfertas':
                    require_once './view/includes/modules/clientes/central-ofertas/central-ofertas.php';
                    break;
                case 'CentralViajes':
                    require_once './view/includes/modules/clientes/central-viajes/central-viajes.php';
                    break;
                case 'CentralTransmisiones':
                    require_once './view/includes/modules/clientes/central-transmisiones/central-transmisiones.php';
                    break;
                default: 
                    require_once './view/includes/404.php';
                    break;
            }
        }
        public static function getScript($ruta) {
            switch($ruta) {
                case 'Pujar-Licitacion':
                    require_once './view/scripts/pujar/pujar.php';
                    break;
                case 'Perfil':
                    require_once './view/scripts/perfil/perfil.php';
                    break;
                //Clientes
                case 'SolicitudEDI':
                    require_once './view/scripts/clientes/solicitud-edi/solicitud-edi-ajax.php';
                    break;
                case 'CentralOfertas':
                    require_once './view/scripts/clientes/central-ofertas/central-ofertas-ajax.php';
                    break;
                case 'CentralViajes':
                    require_once './view/scripts/clientes/central-viajes/central-viajes-ajax.php';
                    break;
                case 'CentralTransmisiones':
                    require_once './view/scripts/clientes/central-transmisiones/central-transmisiones-ajax.php';
                    break;
            }
        }
    }