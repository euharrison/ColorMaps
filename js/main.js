

// lat = [+80,-80] // +80 = norte, -80 = sul
// lng = [-180,+180] // -180 = oeste, +180 = leste


$("li").each(function() {

  var coord = $("span", this).text();

  var image = $('<img src="img/gmaps/'+coord+'.png">');
  image.load(onLoadImage);

  $(this).append(image);

})

function onLoadImage(e) 
{
  var img = e.target;
  var colorThief = new ColorThief();
  var colorList = colorThief.getPalette(img, 10);

  colorList.sort(sortColors);

  var html = "";
  for (var i = 0, total = colorList.length; i < total; i++) {
    var hex = rgbToHex( colorList[i][0], colorList[i][1], colorList[i][2] );
    var hsl = rgbToHsv( colorList[i][0], colorList[i][1], colorList[i][2] );
    html += '<div class="color" style="background-color:'+hex+';">'+hex+'<br><br>'+hsl.join('<br>')+'</div>';
  }

  $(img).parent().append(html);
}

function sortColors(a,b) 
{
  // sort by the colorfullness color https://en.wikipedia.org/wiki/Colorfulness
  // so, calculate the farther distance from the ugliest gray color
  // ignoring the hue we have hsv = [ any, 0, 0.55 ]
  // the distance can be squared to save processor
  // as saturation is more important, the value is multiplied by 2

  var hsvA = rgbToHsv( a[0], a[1], a[2] );
  var hsvB = rgbToHsv( b[0], b[1], b[2] );

  // value = (saturation_distance * 2)² + (brightness_distance)²
  var valueA = Math.pow( (hsvA[1]-0)*2 , 2 ) + Math.pow( hsvA[2]-0.55 , 2 );
  var valueB = Math.pow( (hsvB[1]-0)*2 , 2 ) + Math.pow( hsvB[2]-0.55 , 2 );

  return valueA < valueB;
}


//
// Utils
//

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

