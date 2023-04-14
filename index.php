<?php
    error_reporting(E_ALL ^ E_NOTICE);
    require_once './controller/template.controller.php';
    include_once './view/includes/post.php';
    session_start();
    $nameUser = $_SESSION['tm']['user'];
    if(isset($nameUser)) {
        $template = new ControllerTemplate();
        $template->ctrTemplate();
    }else {
        include './view/includes/login.php';
    }