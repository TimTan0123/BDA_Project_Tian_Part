$(function(){


  function searchInformation() {
    var lat = 40.809336;
    var lng = -73.959855;
    var radius = 500;
    var data = {
       "lat": lat, 
       "lng": lng,
       "radius":radius
    };
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
	type: "POST",
	dataType: "json",
	data: data,
	url: "google_places.php"
	}).done(function(data) {
          setDataMap(data['results']);
	  
	}).fail(function(data) {
	}).always(function() {
    });
  }

  function setDataMap(data) {
    for (var i=0; i<data.length; i++) {
      //places.push([ data[i][3], parseFloat(data[i][8]), parseFloat(data[i][9]), i ]);
      //infoWindowContent.push([data[i][3], data[i][0]]);
      if ( isNaN(data[i][8]) || isNaN(data[i][9]) || data[i][8] == undefined || data[i][9] == undefined || data[i][8] == null || data[i][9] == null || data[i][8] == '' || data[i][9] == '') {
      } else {
        heatmapData.push(new google.maps.LatLng(parseFloat(data[i][8]), parseFloat(data[i][9])) );
      }
    }
    //places  0:title 1:lat 2:lng 3:index?
    //infoWindowContent 1:description
    setMarkers(map);
  }

  function setDataDanger(data) {
    var citymap = {
      chicago: {center: {lat: 41.878, lng: -87.629}, population: 2714856},
      newyork: {center: {lat: 40.714, lng: -74.005}, population: 8405837},
      losangeles: {center: {lat: 34.052, lng: -118.243}, population: 3857799},
      vancouver: {center: {lat: 49.25, lng: -123.1}, population: 603502}
    };
  }

});

// global value
var map;
var heatmap;
var heatmapData = [];

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var places = [];

// i do not know why, but I have to set as follows
var infoWindowContent = [];

function initMap() {
  var geocoder = new google.maps.Geocoder;
  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 40.809336, lng: -73.959855},
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');


  map.addListener('click', function(e) {
/*
    var latlng = {lat: parseFloat(e['latLng']['H']), lng: parseFloat(e['latLng']['L'])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
          if (results[0]['address_components'][8]['short_name'] == 10026 || results[0]['address_components'][8]['short_name'] == 10027 || results[0]['address_components'][8]['short_name'] == 10013 || results[0]['address_components'][8]['short_name'] == 11216 || results[0]['address_components'][8]['short_name'] == 11365 )
	    var data = {
	       "zipcode": results[0]['address_components'][8]['short_name']
               //"zipcode": 9999
	    };
	    data = $(this).serialize() + "&" + $.param(data);
	    $.ajax({
		type: "POST",
		dataType: "json",
		data: data,
		url: "azure_top5.php"
		}).done(function(data) {
		  console.log(data);
	          setTop5(data['Results']['output1']['value']['Values']);
		}).fail(function(data) {
	          console.log(data);
		}).always(function() {
	    });
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
   });
*/
  });

}

function setTop5(data) {
  $('#top1').text(data[0][0] + ' ' + data[0][1]);
  $('#top2').text(data[1][0] + ' ' + data[1][1]);
  $('#top3').text(data[2][0] + ' ' + data[2][1]);
  $('#top4').text(data[3][0] + ' ' + data[3][1]);
  $('#top5').text(data[4][0] + ' ' + data[4][1]);
}

function setMarkers(map) {
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  var pointArray = new google.maps.MVCArray(heatmapData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 50
  });
 
  // placing the heatmap on the map
  heatmap.setMap(map);
}

$(document).ready(function () {
    $(".mlink").click(function(){
        var target = this.getAttribute('data-target');
        $('html, body').animate({
           scrollTop: $(target).offset().top-80
        }, 800, 'easeOutCubic');
    });
});
