function initialize() {
  var myLatLng = new google.maps.LatLng(40.72078, -74.001119)
    
    var mapOptions = {
      zoom: 15,
      center: myLatLng
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var centerMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "Hacker School"
    });
    
    var markers = [];
    var latLngBounds = new google.maps.LatLngBounds();
    latLng.forEach(function(item){
      var latLng = new google.maps.LatLng(item[0], item[1]);
      markers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        title: item[2]
      }));
      latLngBounds.extend(latLng);
    });
    map.setCenter(latLngBounds.getCenter());
    map.fitBounds(latLngBounds);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;