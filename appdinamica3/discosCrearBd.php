<?php
    include "funcion.php";
    include "config.php";

    $conexion=conectarBD($dbhost,$dbuser,$dbpass);

    $sentencia=$conexion->prepare("DROP DATABASE IF EXISTS $dbname");
    $sentencia->execute();
    echo "Base de datos anterior borrada<br>";

    $sentencia=$conexion->prepare("CREATE DATABASE IF NOT EXISTS $dbname");
    $sentencia->execute();
    echo "Nueva base de datos creada <br>";

    $conexion->select_db($dbname);

    $sentencia=$conexion->prepare("CREATE TABLE IF NOT EXISTS $dbtable(
                        id VARCHAR(20),
                        nombre VARCHAR(80),
                        fecha VARCHAR(10),
                        precio DECIMAL(5,2),
                        imagen VARCHAR(500),
                        categoria VARCHAR(50),
                        unidades NUMBER(3,0));");
    $sentencia->execute();
    echo "Tabla creada correctamente<br>";

    $sentencia=$conexion->prepare("INSERT INTO $dbtable VALUES
                                ('111111111',
                                'Britney Spears Blackout',
                                '2007/10/30',
                                16.98,
                                'https://m.media-amazon.com/images/I/81F5DUexi-L._SY355_.jpg',
                                'Internacional',
                                20),
                                ('2222222222',
                                'Britney Spears Circus',
                                '2008/12/02',
                                20.87,
                                'https://m.media-amazon.com/images/I/81OzzBM-lIL._SX425_.jpg',
                                'Internacional',
                                25),
                                ('3333333333',
                                'Selena Gomez A Year Without Rain',
                                '2010/09/17',
                                25.38,
                                'https://m.media-amazon.com/images/I/711A1M8jPoL._SL1400_.jpg',
                                'Internacional',
                                30),
                                ('444444444',
                                'Selena Gomez For You',
                                '2014/11/24',
                                23.85,
                                'https://m.media-amazon.com/images/I/61jKTEFYnoL._SY355_.jpg',
                                'Internacional',
                                5),
                                ('5555555555',
                                'Rosalia El Mal Querer',
                                '2018/11/02',
                                33.25,
                                'https://i.scdn.co/image/ab67616d0000b273f4d64a6a6b7e24b6bd9f009f',
                                'Nacional',
                                50),
                                ('6666666666',
                                'Rosalia Motomami',
                                '2022/03/18',
                                40.00,
                                'https://lechatmagazine.com/wp-content/uploads/2022/03/MOTOMAMI_-EL-NUEVO-ALBUM-DE-ROSALIA-QUE-TIENE-AL-MUNDO-DE-CABEZA.jpg',
                                'Nacional',
                                10),
                                ('7777777777',
                                'Lola Indigo Akelarre',
                                '2019/05/17',
                                20.00,
                                'https://www.lahiguera.net/musicalia/artistas/lola_indigo/disco/9771/lola_indigo_akelarre-portada.jpg',
                                'Nacional',
                                38),
                                ('888888888',
                                'Dua Lipa Future Nostalgia',
                                '2020/03/27',
                                15.89,
                                'https://m.media-amazon.com/images/I/71VQFsqlPJL._SL1425_.jpg',
                                'Internacional',
                                2),
                                ('9999999999',
                                'Loreen Heal',
                                '2012/10/24',
                                50.55,
                                'https://i1.sndcdn.com/artworks-000157267022-wmp2lp-t500x500.jpg',
                                'Europeo',
                                33),
                                ('1234567890',
                                'Lola Indigo La Niña',
                                '2021/07/02',
                                14.56,
                                'https://m.media-amazon.com/images/I/81RYeXivG7S._SL1500_.jpg',
                                'Nacional',
                                78);");

    $sentencia->execute();

    echo "Datos insertados con éxito<br>";

    //header("refresh:3;url=index.html");
?>