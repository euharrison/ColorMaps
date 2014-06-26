<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Color Maps</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
<body>

<?php
$coords = "-22.903331,-43.173923";
if (isset($_GET['coords'])) { 
  $coords = $_GET['coords'];
}
?>
<form action="" method="get">
  Coords: 
  <input type="text" name="coords" style="width:200px;" value="<?php echo $coords; ?>">
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
		echo '<br><img src="'.$url.'"><br><br>Image saved [ '.$coords.' ]';
    echo '<ul><li><h2>[ <span>'.$coords.'</span> ]</h2></li></ul>';
	} else {
		echo '<br><img src="'.$url.'"><br><br>Image error ['.$coords.']';
	}
}

?>


<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/color-thief.js"></script>
<script type="text/javascript" src="js/color-converter.js"></script>
<script type="text/javascript" src="js/main.js"></script>


  </body>
</html>