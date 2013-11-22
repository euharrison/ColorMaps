

//lat = [+80,-80] // +80 = norte, -80 = sul
//lng = [-180,+180] // -180 = oeste, +180 = leste

$("#search").submit(function(){
  getColorFrom($("#coords").val());
  return false;
})

function getColorFrom(coords)
{
  //quick test for debug if you know that there is the image on the folder
  //loadImage("img/gmaps/"+coords+".png"); return;

  $.ajax({
    url: "saveimage.php?coords="+coords,
  })
  .done(function() {
    loadImage("img/gmaps/"+coords+".png");
  });
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

  $("#image").html(img);

  var colorString, html = "";
  for (var i = 0, total = colorList.length; i < total; i++) {
    colorString = rgbToHex( colorList[i][0], colorList[i][1], colorList[i][2] );
    html += '<div class="color" style="background-color:'+colorString+';">'+colorString+'</div>';
  }
  $("#color").html(html);
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