// global value
var map;
var heatmap;
var heatmapData = [];
var places = [];
var infoWindowContent = [];
var server = 'http://104.198.177.69:7777/get/';
//var server = 'http://127.0.0.1:7777/get/';

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
    //var link = server + "predict/" + business_id;
    var link = server + "predict/0";
    $("#detail_predict").css( "display", "block");
    console.log(link);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: link,
    }).done(function(json_data) {
      console.log("done");
      var time_data = json_data[0];
      var end_date = new Date(parseInt(json_data[1][0]), parseInt(json_data[1][1]));
      var s_years = Object.keys(time_data).sort();
      var array_actual = [];
      var array_future = []; 
      for(var i = 0; i < s_years.length; i++) {
        if (s_years[i] in time_data) {
          var s_months = Object.keys(time_data[s_years[i]]).sort();
          for(var j = 0; j < s_months.length; j++) {
            if (s_months[j] in time_data[s_years[i]]) {
              tmp = {}
              tmp['x'] = new Date(parseInt(s_years[i]), parseInt(s_months[j]));
              tmp['y'] = parseFloat(time_data[s_years[i]][s_months[j]]);
              if (tmp['x'].getTime() <= end_date.getTime()) {
                array_actual.push(tmp);
              } else {
                array_future.push(tmp);
              } 
            }
          }
        }
      }
      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
          text: "Rate Prediction"
        },
        axisX:{
          title: "Month",
          gridThickness: 1
        },
        axisY: {
          title: "Rate"
        },
        data: [
          //{        
          //  type: "area",
          //  dataPoints: array_data
          //}
          {
            type: "line", 
            showInLegend: true,
            name: "Actual",
            dataPoints: array_actual
          },
          {        
            type: "line", 
            showInLegend: true,
            name: "Future",
            dataPoints: array_future
          } 
       ]
      });
      console.log(array_actual);
            console.log(array_future);
      chart.render();
    }).fail(function(data) {
      console.log("fail");
      console.log(data);
    }).always(function() {
    });
  });

  $("#popular_search").click(function(){
    detailClear();
    $("#detail_panel").hide();
    var lat = map.getCenter().lat();
    var lng = map.getCenter().lng();
    var link = server + "place/" + lat + "z" + lng
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

  $("#show_all").click(function(){
    detailClear();
    var link = server + 'all/all';
    console.log(link);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: link,
    }).done(function(data) {
      console.log("done");
      console.log(data);
      setDataMapAll(data);
    }).fail(function(data) {
      console.log("fail");
      console.log(data);
    }).always(function() {
    });
  });

  $("#show_bars").click(function(){
    detailClear();
    var link = server + 'all/bars';
    console.log(link);
    $.ajax({
      type: "GET",
      dataType: "json",
      url: link,
    }).done(function(data) {
      console.log("done");
      console.log(data);
      setDataMap2(data);
    }).fail(function(data) {
      console.log("fail");
      console.log(data);
    }).always(function() {
    });
  });

  $(".mlink").click(function(){
    var target = this.getAttribute('data-target');
      $('html, body').animate({
        scrollTop: $(target).offset().top-80
      }, 800, 'easeOutCubic');
  });

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
  $('#detail_predict').hide();
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
    places.push([ parseFloat(data[i]['latitude']), parseFloat(data[i]['longitude']), data[i]['name'], data[i]['stars'], data[i]['business_id'] ]);
    infoWindowContent.push([data[i]['name']]);
  }
  setMarkers(map);
}

function setDataMap2(data) {
  places = [];
  infoWindow = [];
  for (var i=0; i<data.length; i++) {
    places.push([ parseFloat(data[i]['latitude']), parseFloat(data[i]['longitude']), data[i]['name'], data[i]['stars'], data[i]['business_id'] ]);
    infoWindowContent.push([data[i]['name']]);
  }
  setMarkers(map);
}

function setDataMapAll(data) {
  places = [];
  infoWindow = [];
  for (var i=0; i<data.length; i++) {
    if (data[i]['stars'] < 5) {
      continue;
    }
    places.push([ parseFloat(data[i]['latitude']), parseFloat(data[i]['longitude']), data[i]['name'], data[i]['stars'], data[i]['business_id'] ]);
    infoWindowContent.push([data[i]['name']]);
  }
  setMarkers(map);
}



