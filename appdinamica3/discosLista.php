<?php

    header('Content-Type:application/json');
    header("Acces-Control-Allow-Origin: *");
    include "funcion.php";
    include "config.php";

    sleep(1);
    $default_limite=4;
    $limite=$_REQUEST["limite"] ?? $default_limite=4;;
    $offset=$_REQUEST["offset"] ?? 0;

    $conexion=conectarBD($dbhost,$dbuser,$dbpass);
    $conexion->select_db($dbname);

    $datos=[];

    $sentencia_total=$conexion->prepare("SELECT count(*) FROM $dbtable");
    $sentencia_total->execute();

    $total_filas=$sentencia_total->get_result()->fetch_row()[0];

    $info["total"]=$total_filas;

    $sentencia=$conexion->prepare("SELECT *FROM $dbtable LIMIT $offset, $limite");
    $sentencia->execute();
    $resultado=$sentencia->get_result();

    while($fila=$resultado->fetch_assoc()){
        $datos[]=$fila;
    }

    $info["datos"]=$datos;

    $patron_URL=explode("?",$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"])[0];

    $nuevo_offset=$offset+$limite;
    if($nuevo_offset<$total_filas){
        $sig_offset=$nuevo_offset;
        if($nuevo_offset+$limite>$total_filas){
            $sig_limite=$total_filas-$nuevo_offset;
        }else{
            $sig_limite=$limite;
        }
        $info["siguiente"]=$patron_URL."?offset=$sig_offset&limite=$sig_limite";
    }else{
        $info["siguiente"]="null";
    }

    $nuevo_offset=$offset-$limite;

    if($offset==0){
        $info["anterior"]="null";
    }else{
        if($nuevo_offset>0){
            $ant_limite=$default_limite;
            $nuevo_offset=$offset-$default_limite;
            $ant_offset=$nuevo_offset;
        }else{
            $ant_limite=$offset;
            $ant_offset=0;
        }
        $info["anterior"]=$patron_URL."?offset=$ant_offset&limite=$ant_limite";
    }

    echo json_encode($info);

?>