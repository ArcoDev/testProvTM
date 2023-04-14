<?php 
    include_once './view/scripts/globals.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $user = $_POST['user'];
        $password = $_POST['pw'];
        $token = $_POST['token'];
        $status = $_POST['stToken'];
        session_start();
        $_SESSION['tm'] = array();
        $userVer = $_SESSION['tm']['user'] = $user;
        $tokenVer = $_SESSION['tm']['token'] = $token;
        $statusUser = $_SESSION['tm']['stToken'] = $status;
    }