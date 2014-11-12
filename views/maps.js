function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
      console.log("Geolocation is not supported by this browser.");
  }
}
    
function showPosition(position) {
  var theLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
  document.getElementById('lat').setAttribute("value", position.coords.latitude);
  document.getElementById('lng').setAttribute("value", position.coords.longitude);

  var mapOptions = {
    zoom: 15,
    center: theLatLng
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var centerMarker = new google.maps.Marker({
    position: theLatLng,
    map: map,
    title: "Center",
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });

  var infoWindows = [];
  var markers = [];
  var latLngBounds = new google.maps.LatLngBounds();
  latLng.forEach(function(item){
    
    infoWindows.push(new google.maps.InfoWindow({
      content: "<div>" + item[2] + "</div>" + "<div>" + "Rating: " + item[3] + "</div>" +
        "<div>" + "Price Level: " + item[4] + "</div>"
    }));

    var latLng = new google.maps.LatLng(item[0], item[1]);
    
    markers.push(new google.maps.Marker({
      position: latLng,
      map: map,
      title: item[2],
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }));
    latLngBounds.extend(latLng);
  });

  map.setCenter(latLngBounds.getCenter());
  map.fitBounds(latLngBounds);

  //console.log(infoWindows)
  for (var i = 0; i < markers.length; i++) {
    google.maps.event.addListener(markers[i], 'click', function(innerKey) {
      var clicks = 0;
      return function() {
        // console.log(infoWindows[i]);
        clicks++;
        infoWindows[innerKey].open(map, markers[innerKey]);
      }
    }(i));
  }
}

// (function() { })()
// function() { }()

// obj.addListener(marker, 'click', partial(i))

// function partial(param) {
//   return function() { console.log(param) };
// }

// partial -> function partial(param) { return function() { console.log(param) }; }
// partial() -> function() { console.log() }
// var p = partial("test") -> function() { console.log("test") }
// p() -> console.log("test")

// function latlngURL(position) {
//   location.search = "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
//   console.log(location.search);
// }

//jump to specific div when the marker is clicked
// google.maps.event.addListener(markers, 'click', function() {
//   console.log("hello");
//   alert(markers.getPosition());
// });

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=getLocation';
  document.body.appendChild(script);
}

window.onload = loadScript;