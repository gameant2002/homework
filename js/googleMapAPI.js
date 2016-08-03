var myCenter=new google.maps.LatLng(22.286832,114.152240);

function initialize()
{
var mapProp = {
  center:myCenter,
  zoom:19,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker=new google.maps.Marker({
  position:myCenter,
  });

marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
