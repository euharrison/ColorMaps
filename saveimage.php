<?php

$coords = $_GET['coords'];
$url = 'http://maps.googleapis.com/maps/api/staticmap?center='.$coords.'&zoom=17&size=200x200&sensor=false&maptype=satellite';
$img = 'img/gmaps/'.$coords.'.png';

copy($url, $img);

?>