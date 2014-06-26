<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <title>Color Maps</title>

    <style type="text/css">
    
    body {
      margin: 20px;
      font-family: Arial, sans-serif;
    }

    </style>

  </head>
<body>


<form action="saveimage.php" method="get">
  Coordenadas: <input type="text" name="coords" value="-22.903331,-43.173923">
  <input type="submit">
</form>


<?php

if (isset($_GET['coords'])) 
{
	$coords = $_GET['coords'];
	$url = 'http://maps.googleapis.com/maps/api/staticmap?center='.$coords.'&zoom=17&size=200x200&sensor=false&maptype=satellite';
	$img = 'img/gmaps/'.$coords.'.png';

	$success = copy($url, $img);

	if ($success) {
		echo '<br><img src="'.$url.'"><br><br>Imagem salva com sucesso. ['.$coords.']';
    echo '<ul><li><h2>[ <span>'.$coords.'</span> ]</h2></li></ul>';
	} else {
		echo '<br><img src="'.$url.'"><br><br>Erro ao salvar a imagem. ['.$coords.']';
	}
}

?>


<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/color-thief.js"></script>
<script type="text/javascript" src="js/color-converter.js"></script>
<script type="text/javascript" src="js/main.js"></script>


  </body>
</html>