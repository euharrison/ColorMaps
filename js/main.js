

// lat = [+80,-80] // +80 = norte, -80 = sul
// lng = [-180,+180] // -180 = oeste, +180 = leste

$("#search").submit(function(){
  getColorFrom($("#coords").val());
  return false;
})

function getColorFrom(coords)
{
  // if you already did a first search by this coord, 
  // the image will be already saved 
  // and you don't need to look for it again
  var isImageAlreadySaved = true;

  if (isImageAlreadySaved) {
    loadImage("img/gmaps/"+coords+".png");
  } 
  else {
    $.ajax({
      url: "saveimage.php?coords="+coords,
    })
    .done(function() {
      loadImage("img/gmaps/"+coords+".png");
    });
  }
}

function loadImage(src) 
{
  var img = new Image;
  img.onload = onLoadImage;
  img.src = src;
}

function onLoadImage(e) 
{
  var img = e.target;
  var colorThief = new ColorThief();
  var colorList = colorThief.getPalette(img, 10);

  colorList.sort(sortColors);

  $("#image").html(img);

  var html = "";
  for (var i = 0, total = colorList.length; i < total; i++) {
    var hex = rgbToHex( colorList[i][0], colorList[i][1], colorList[i][2] );
    var hsl = rgbToHsl( colorList[i][0], colorList[i][1], colorList[i][2] );
    html += '<div class="color" style="background-color:'+hex+';">'+hex+'<br><br>'+hsl.join(' ')+'</div>';
  }
  $("#color").html(html);
}

function sortColors(a,b) 
{
  var hueA = rgbToHsl( a[0], a[1], a[2] )[1];
  var hueB = rgbToHsl( b[0], b[1], b[2] )[1];

  return hueA < hueB;
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

