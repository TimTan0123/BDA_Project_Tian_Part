// global value
var map;
var heatmap;
var heatmapData = [];
var places = [];
var infoWindowContent = [];
var server = 'http://104.198.177.69:7777/get/';

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

  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 40.440624, lng: -79.995888},
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

$(document).ready(function () {
  $("#keyword_search").click(function(){
    detailClear();
    $("#detail_panel").hide();
    var keyword = $("#keyword").val();
    var link = server + "keyword/" + keyword
    $.ajax({
      type: "GET",
      dataType: "json",
      url: link,
    }).done(function(data) {
      console.log("done");
      setDataMap(data);
    }).fail(function(data) {
      console.log("fail");
      console.log(data);
    }).always(function() {
    });
  });

  $("#predict_rate").click(function(){
    var business_id = $("#detail_business_id").text();
    var link = server + "predict/" + business_id;
    console.log(link);
    var result = 3.6;
    $('#detail_predict').text("In 6 months, the rating will be " + result);
    /*
    $.ajax({
      type: "GET",
      dataType: "json",
      url: link,
    }).done(function(data) {
      console.log("done");
      setDataMap(data);
    }).fail(function(data) {
      console.log("fail");
      console.log(data);
    }).always(function() {
    });
    */
  });

  $(".mlink").click(function(){
    var target = this.getAttribute('data-target');
      $('html, body').animate({
        scrollTop: $(target).offset().top-80
      }, 800, 'easeOutCubic');
  });

  $("#detail_panel").hide();

});



function setMarkers(map) {
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  for (i = 0; i < places.length; i++) {
    let place = places[i];
    let marker = new google.maps.Marker({
      position: {lat: place[0], lng: place[1]},
      map: map,
      title: place[2]
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        console.log(place);
        infoWindow.setContent(infoWindowContent[i][0]);
	infoWindow.open(map, marker);
        setDetail(place);
      }
    })(marker, i));
  }
}


function detailClear() {
  $('#detail_name').text("");
  $('#detail_rate').text("");
  $('#detail_business_id').text("");
  $('#detail_predict').text("");
}

function setDetail(place) {
  detailClear();
  $("#detail_panel").show();
  $('#detail_name').text(place[2]);
  $('#detail_rate').text(place[3]);
  $('#detail_business_id').text(place[4]);
}

function setDataMap(data) {
  places = [];
  infoWindow = [];
  for (var i=0; i<data.length; i++) {
    places.push([ parseFloat(data[i]['lat']), parseFloat(data[i]['lng']), data[i]['name'], data[i]['rate'], data[i]['business_id'] ]);
    infoWindowContent.push([data[i]['name']]);
  }
  setMarkers(map);
}



